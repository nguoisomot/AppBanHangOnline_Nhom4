// const express = require('express');
// const product = require('../controllers/product.controllers');

// const router = express.Router();

// router.get('/all',product.findAll);
// router.get('/find', product.findOne);
// router.post('/addShop',product.add);

// module.exports = router;


const express = require('express');
const imageRouter = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product.models');
const config = require('../config/db');

module.exports = (upload) => {
    const url = config.mongoURI;
    const connect = mongoose.createConnection(url, { useNewUrlParser: true, useUnifiedTopology: true });

    let gfs;

    connect.once('open', () => {
        // initialize stream
        gfs = new mongoose.mongo.GridFSBucket(connect.db, {
            bucketName: "uploads"
        });
    });

    /*
        POST: Upload a single image/file to Image collection
    */
    imageRouter.route('/')
        .post(upload.single('file'), (req, res, next) => {
            console.log(req.body);
            // check for existing images
            Product.findOne({ name_product: req.body.name_product })
                .then((image) => {
                    console.log(image);
                    if (image) {
                        return res.status(200).json({
                            success: false,
                            message: 'Image already exists',
                        });
                    }
                    const url = req.protocol + '://' + "192.168.0.109:3000" + '/image/' + req.file.filename;
                    let newImage = new Product({
                        name_product: req.body.name_product,
                        file_image: req.file.filename,
                        type_product:req.body.type_product,
                        description_product:req.body.description_product,
                        price_product:req.body.price_product,
                        amount_product:req.body.amount_product,
                    
                        urls: url
                    });

                    newImage.save()
                        .then((image) => {

                            res.status(200).json({
                                success: true,
                                image,
                            });
                        })
                        .catch(err => res.status(500).json(err));
                })
                .catch(err => res.status(500).json(err));
        })
        .get((req, res, next) => {
            Product.find({})
                .then(images => {
                    res.status(200).json({
                        success: true,
                        images,
                    });
                })
                .catch(err => res.status(500).json(err));
        });



    // post images multiple
    imageRouter.route('/adds').post(upload.array('files', 12), (req, res, next) => {
        console.log(req.body);

    });


    /*
        GET: Delete an image from the collection
    */
    imageRouter.route('/delete/:id')
        .get((req, res, next) => {
            Product.findOne({ _id: req.params.id })
                .then((image) => {
                    if (image) {
                        Product.deleteOne({ _id: req.params.id })
                            .then(() => {
                                return res.status(200).json({
                                    success: true,
                                    message: `File with ID: ${req.params.id} deleted`,
                                });
                            })
                            .catch(err => { return res.status(500).json(err) });
                    } else {
                        res.status(200).json({
                            success: false,
                            message: `File with ID: ${req.params.id} not found`,
                        });
                    }
                })
                .catch(err => res.status(500).json(err));
        });

    /*
        GET: Fetch most recently added record
    */
    imageRouter.route('/json')
        .get((req, res, next) => {
            Product.find().sort({name_product:-1})
                .then((all) => {
                    res.status(200).send(all)
                })
                .catch(err => res.status(500).json(err));
        });

    imageRouter.route('/jsons')
        .get((req, res, next) => {
            Product.find().sort({ name_product: 1 })
                .then((all) => {
                    res.status(200).send(all)
                })
                .catch(err => res.status(500).json(err));
        });

    /*
        POST: Upload multiple files upto 3
    */
    imageRouter.route('/multiple')
        .post(upload.array('file', 3), (req, res, next) => {

            res.status(200).json({
                success: true,
                message: `${req.files.length} files uploaded successfully`,
            });
        });

    /*
        GET: Fetches all the files in the uploads collection
    */
    imageRouter.route('/files')
        .get((req, res, next) => {
            gfs.find().toArray((err, files) => {
                if (!files || files.length === 0) {
                    return res.status(200).json({
                        success: false,
                        message: 'No files available'
                    });
                }

                files.map(file => {
                    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png' || file.contentType === 'image/svg') {
                        file.isImage = true;
                    } else {
                        file.isImage = false;
                    }
                });

                res.status(200).json({
                    success: true,
                    files,
                });
            });
        });

    /*
        GET: Fetches a particular file by filename
    */
    imageRouter.route('/file/:filename')
        .get((req, res, next) => {
            gfs.find({ filename: req.params.filename }).toArray((err, files) => {
                if (!files[0] || files.length === 0) {
                    return res.status(200).json({
                        success: false,
                        message: 'No files available',
                    });
                }

                res.status(200).json({
                    success: true,
                    file: files[0],
                });
            });
        });

    /* 
        GET: Fetches a particular image and render on browser
    */
    imageRouter.route('/image/:filename')
        .get((req, res, next) => {
            gfs.find({ filename: req.params.filename }).toArray((err, files) => {
                if (!files[0] || files.length === 0) {
                    return res.status(200).json({
                        success: false,
                        message: 'No files available',
                    });
                }

                if (files[0].contentType === 'image/jpeg' || files[0].contentType === 'image/png' || files[0].contentType === 'image/svg+xml') {
                    // render image to browser
                    gfs.openDownloadStreamByName(req.params.filename).pipe(res);
                } else {
                    res.status(404).json({
                        err: 'Not an image',
                    });
                }
            });
        });

    imageRouter.get('/read/:filename', (req, res) => {
        gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
            // Check if the input is a valid image or not
            if (!file || file.length === 0) {
                return res.status(404).json({
                    err: 'No file exists'
                });
            }

            // If the file exists then check whether it is an image
            if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
                // Read output to browser
                const readstream = gfs.createReadStream(file.filename);
                readstream.pipe(res);
            } else {
                res.status(404).json({
                    err: 'Not an image'
                });
            }
        });
    });
    /*
        DELETE: Delete a particular file by an ID
    */
    imageRouter.route('/file/del/:id')
        .post((req, res, next) => {
            console.log(req.params.id);
            gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
                if (err) {
                    return res.status(404).json({ err: err });
                }

                res.status(200).json({
                    success: true,
                    message: `File with ID ${req.params.id} is deleted`,
                });
            });
        });

    return imageRouter;
};