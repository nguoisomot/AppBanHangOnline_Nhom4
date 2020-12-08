const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    id_product:{
        type: mongoose.Schema.Types.ObjectId,
    },
    user: {
        type: 'string',
        
    },
    comments: { 
        type: 'string',
       
    },
    date: { type: Date, default: Date.now },
    
},{ timestamps: true });

module.exports = mongoose.model('comment',commentSchema);