const customer = require('../models/custom');
const mongoose = require('mongoose');

exports.createCourse = function (req, res) {
    const {
        name,
        address,
        phone,
       

    } = req.body;
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    const course = new customer({
        _id: mongoose.Types.ObjectId(),
        name,
        address,
        phone,
       
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
    customer.find().then((user) => {
        res.status(200).send(user);
    }).catch((error) => {
        res.status(500).send({
            message: err.message || "Error Occured",
        });
    })
};
