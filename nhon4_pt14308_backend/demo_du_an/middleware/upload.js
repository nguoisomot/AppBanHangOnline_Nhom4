const util = require("util");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");




var storage = new GridFsStorage({
    url: "mongodb+srv://duong:duong2007@cluster0.86cge.mongodb.net/du_an?retryWrites=true&w=majority",
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = file.originalname;
            return filename;
        }

        return {
            bucketName: "photos",
            filename: file.originalname
        };
    }
});

var uploadFile = multer({ storage: storage }).single("file");
var uploadFilesMiddleware = util.promisify(uploadFile);
module.exports =  uploadFilesMiddleware;
    

