const mongoose = require('mongoose');

var shopSchema = new mongoose.Schema({
    
    id_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
    },
    name_shop:{
        type: 'string',
        require: true,
    },
    email_shop:{
        type: 'string',
        require: true,
    },
    phone_shop:{
        type: 'string',
        require: true,
    },
    address_shop:{
        type: 'string',
        require: true,
    },
    product:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    }]
});

module.exports = mongoose.model('shop',shopSchema);