const upload = require("../middleware/upload");
const mongoose = require('mongoose');
const GridFsStorage = require("multer-gridfs-storage");
const image = require("../models/image.models")






exports.readImage = function(req, res, next) {
    
    let url = 'mongodb+srv://duong:duong2007@cluster0.86cge.mongodb.net/du_an?retryWrites=true&w=majority';

    const connect = mongoose.createConnection(url, { useNewUrlParser: true, useUnifiedTopology: true });

    let gfs;

    connect.once('open', () => {
        // initialize stream
        gfs = new mongoose.mongo.GridFSBucket(connect.db, {
            bucketName: "images"
        });
    });
    gfs.find({filename:req.params.filename}).toArray((err, files) => {
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

}

exports.addImage = async(req, res) => {
    try {
        await upload(req, res);
        // let newImage = new image({
        //     _id_image: req.file.id,
        //     filename: req.file.filename,
        //     type: req.file.contentType
        // });
        // newImage.save()
        //     .then((image) => {

        //         res.status(200).json({
        //             success: true,
        //             image,
        //         });
        //     })
        //     .catch(err => res.status(500).json(err));
        console.log(req.file);
        if (req.file == undefined) {
            return res.send(`You must select a file.`);
        }

        return res.send(`File has been uploaded.`);
    } catch (error) {
        console.log(error);
        return res.send(`Error when trying upload image: ${error}`);
    }
}
