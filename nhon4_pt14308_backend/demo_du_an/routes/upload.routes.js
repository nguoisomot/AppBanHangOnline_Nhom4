const express = require('express');
const upload = require('../controllers/upload.controllers');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const router = express.Router();

let url = 'mongodb+srv://duong:duong2007@cluster0.86cge.mongodb.net/du_an?retryWrites=true&w=majority';

const connect = mongoose.createConnection(url, { useNewUrlParser: true, useUnifiedTopology: true });

let gfs;

connect.once('open', () => {
    // initialize stream
    gfs = new mongoose.mongo.GridFSBucket(connect.db, {
        bucketName: "photos"
    });
});
// let gfs; connect.once("open", () => { gfs = Grid(connect.db, mongoose.mongo); gfs.collection("photos"); console.log("Connection Successful"); });

router.get('/read/:filename',(req, res) => {
    gfs.files.find().toArray((err, files) => {
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
router.post('/add',upload.addImage);



module.exports = router;