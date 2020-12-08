const mongoose = require('mongoose');

const shopUser = require('../models/shop.models');
const shopModels = require('../models/shop.models');

exports.addShop = function (req, res) {
    const shop = new shopUser({
        id_user: req.body.user,
        name_shop: req.body.name,
        email_shop: req.body.email,
        phone_shop: req.body.phone,
        address_shop: req.body.address,
    })
    return shop.save()
        .then((result) => {
            return res.status(201).json({
                success: true,
                message: 'New cause created successfully',
                Course: result,
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
    shopModels.find().then((user) => {
        res.status(200).send(user);
    }).catch((error) => {
        res.status(500).send({
            message: err.message || "Error Occured",
        });
    })
};


exports.updateShop = function (req, res) {
    if (!req.body) {
        res.status(400).send({
            message: err.message || "Data to update can not be empty"
        })
    };
    const id = req.query.id;
    shopModels.findByIdAndUpdate(id, req.body).then((result) => {
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
exports.deleteShop = function (req, res) {
    const id = req.query.id;
    shopModels.findByIdAndRemove(id)
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