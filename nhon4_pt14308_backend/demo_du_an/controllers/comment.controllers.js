const commentModel = require('../models/comment.models');
const mongoose = require('mongoose');
const productShop = require('../models/product.models');






exports.addComment = function(req, res) {
    
    const com = new commentModel({
        id_product:req.body.id_product,
        user:req.body.user,
        comments:req.body.comments,
    }
    );
    const id_product = req.body.id_product;

    return com.save() && productShop.findByIdAndUpdate(
        id_product,{
            $push:{
                comment:com._id
            }
    }, { new: true, useFindAndModify: false }
    )
        .then((newCourse) => {
            return res.status(201).json({
                success: true,
                message: 'New cause created successfully',
                Course: newCourse,
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: error.message,
            });
        });
}

exports.findAll = function(req, res) {
    commentModel.find().then((comment) => {
        res.status(200).send({comment});
    }).catch((error) => {
        res.status(500).send({error});
    })
}
exports.findProduct = function(req, res) {
    const _id_product = req.query._id_product;

    commentModel.find({_id_product: _id_product}).then((comment) => {
        res.status(200).send({ comment });
    }).catch((error) => {
        res.status(500).send({ error });
    })
}

exports.updateComment = function(req, res) {
    if (!req.body) {
        res.status(400).send({
            message: err.message || "Data to update can not be empty"
        })
    };
    const id = req.query.id;
    
    
    commentModel.findByIdAndUpdate(id, req.body).then((result) => {
        if (!result) {
            
            res.status(404).send({
                message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
            });
        } else res.send({ message: "Tutorial was updated successfully." })
    }).catch(err => {
        res.status(500).send({
            message: "Error updating Tutorial with id=" + id
        });
    })
}

exports.deleteComment = function(req, res) {
    
    const id = req.query.id;
    commentModel.findOneAndRemove(id)
    .then(result => {
        if (!result) {
            res.status(404).send({
                message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
            });
        } else {
            res.send({
                message: "Tutorial was deleted successfully!"
            });
        }
    })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });
}
