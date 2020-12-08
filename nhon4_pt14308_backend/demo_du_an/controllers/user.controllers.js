const userModel = require('../models/models.user');
const mongoose = require('mongoose');
const md5 = require('md5');
exports.createCourse = function (req, res) {
    const {
        name,
        phone,
        email,
        password,
      
    } = req.body;
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
   
    const course = new userModel({
        _id: mongoose.Types.ObjectId(),
        name,
        phone,
        email,
        password
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
    userModel.find().sort({ email: -1 }).then((user) => {
        res.status(200).send(user);
    }).catch((error) => {
        res.status(500).send({
            message: err.message || "Error Occured",
        });
    })
};
exports.findUser = function (req, res) {
    const email = req.query.email;
    const password = req.query.password;
    userModel.find({ email: email,password: password }).then((user) => {
            res.status(200).send(user);
    }).catch((error) => {
        res.status(500).send({
            message: error.message || "Error Not Found User",
        });
    })
}

exports.updateUser = function (req, res) {
    if (!req.body) {
        res.status(400).send({
            message: err.message || "Data to update can not be empty"
        })
    };
    const id = req.query.id;
    userModel.findByIdAndUpdate(id, req.body).then((result) => {
        if (!result) {
            res.status(404).send({
                message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
            });
        } else res.send({ message: "Tutorial was updated successfully." });
    })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id
            });
        })
}
exports.deleteUser = function (req, res) {
    const id = req.query.id;
    userModel.findByIdAndRemove(id)
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