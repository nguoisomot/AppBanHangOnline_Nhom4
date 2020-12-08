const mongoose = require('mongoose');
const { Double } = require('mongodb');


var productSchema = new mongoose.Schema({
    
    name_product:{
       type: 'string',
       require: true,
    },
    type_product: {
        type: 'string',
        require: true,
    },
    description_product: {
        type: 'string',
        require: true,
    },
    price_product: {
        type: 'number',
        require: true,

    },
    amount_product: {
        type: 'number',
        require: true,
    },
    file_image:{
        type: String,
        required: true,
    },
    urls: {
        type: String,
        required: true,
    },
    createdAt: {
        default: Date.now(),
        type: Date,
    },
   
    
    
}, { timestamps: true})

module.exports = mongoose.model("product",productSchema);