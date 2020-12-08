const mongoose = require('mongoose');

var imageProduct = new mongoose.Schema({
    _id_image: mongoose.Schema.Types.ObjectId,
    filename: {
        type: 'string',
        required: true,
    },
    type: {
        type: 'string',
        required: true,
    }
}, { timestamps: true })

module.exports = mongoose.model("image",imageProduct);