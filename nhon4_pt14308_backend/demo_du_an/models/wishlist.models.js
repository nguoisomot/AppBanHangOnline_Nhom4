const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    id_wishlist: {
        type: mongoose.Schema.Types.ObjectId,
    },
    email: {
        type: 'string',
        require: true,
    },
    name_product: {
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
    rating_product: {
        type: 'number',
        require: true,
    }
    ,
    giam_gia: {
        type: 'string',
        require: true,
    },
    image_product: {
        type: 'string',
        require: true,
    },

    date: { type: Date, default: Date.now },

}, { timestamps: true });

module.exports = mongoose.model('wishlist', wishlistSchema);