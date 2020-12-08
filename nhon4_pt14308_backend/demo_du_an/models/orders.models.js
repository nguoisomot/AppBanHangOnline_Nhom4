const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    id_order: {
        type: mongoose.Schema.Types.ObjectId,
    },
    email_order: {
        type: 'string',
        require: true,
    },
    price_product_order: {
        type: 'number',
        require: true,

    },
    name_order:{ 
        type: 'string',
        require: true,
    },
    address_order:{ 
        type: 'string',
        require: true,
    },
    phone_order:{
        type: 'string',
        require: true,
    },
    status_order: {
        type: 'boolean',
        require: true,
    },
    

    date: { type: Date, default: Date.now },

}, { timestamps: true });

module.exports = mongoose.model('order', orderSchema);