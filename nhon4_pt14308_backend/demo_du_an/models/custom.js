const mongoose = require('mongoose');

const customSchema = new mongoose.Schema({
    id_custom: {
        type: mongoose.Schema.Types.ObjectId,
    },
    name: {
        type: 'string',
        required: true,

    },
    address: {
        type: 'string',
        required: true,

    },
    phone: {
        type: 'string',
        required: true,
    },
    date: { type: Date, default: Date.now },

}, { timestamps: true });

module.exports = mongoose.model('custom', customSchema);