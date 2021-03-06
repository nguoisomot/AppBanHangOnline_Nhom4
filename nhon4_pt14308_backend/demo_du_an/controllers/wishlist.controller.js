const wishlist = require('../models/wishlist.models');
const mongoose = require('mongoose');

exports.createCourse = function (req, res) {
    const {
        email,
        name_product,
        price_product,
        amount_product,
        rating_product,
        giam_gia,
        image_product,

    } = req.body;
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    const course = new wishlist({
        _id: mongoose.Types.ObjectId(),
        email,
        name_product,
        price_product,
        amount_product,
        rating_product,
        giam_gia,
        image_product
    });

    return course
        .save()
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
exports.findAll = function (req, res) {
    wishlist.find().then((user) => {
        res.status(200).send(user);
    }).catch((error) => {
        res.status(500).send({
            message: err.message || "Error Occured",
        });
    })
};