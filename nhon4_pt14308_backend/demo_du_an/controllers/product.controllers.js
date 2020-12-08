const mongoose = require('mongoose');

const productModel = require('../models/product.models');
const shopModels = require('../models/shop.models');


// exports.addProduct = function (req, res) {

//     const product = new productModel({

//         name_product: req.body.name_product,
//         type_product: req.body.type_product,
//         description_product: req.body.description_product,
//         price_product: req.body.price_product,
//         amount_product: req.body.amount,
//         trade_mark: req.body.trade_mark,
//         size_product: req.body.size,
//         weight: req.body.weight,
//         id_shop: req.body.id_shop,
//         comment: req.body.comment,
//         images: req.body.images,

//     })

//     return product.save()
//         .then((result) => {
//             return res.status(201).json({
//                 success: true,
//                 message: 'New cause created successfully',
//                 Course: result,
//             });
//         })
//         .catch((error) => {
//             console.log(error);
//             res.status(500).json({
//                 success: false,
//                 message: 'Server error. Please try again.',
//                 error: error.message,
//             });
//         });
// }

exports.add = function (req, res) {
    const products = new productModel({

        name_product: req.body.name_product,
        type_product: req.body.type_product,
        description_product: req.body.description_product,
        price_product: req.body.price_product,
        amount_product: req.body.amount,
        images: req.body.images,

    })
    const id_shop = req.body.id_shop;
    return products.save() && shopModels.findByIdAndUpdate(
        id_shop, {
        $push: {

            product: products.id_shop

        }
    },
        { new: true, useFindAndModify: false }).then((result) => {
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
    productModel.find().then((result) => {
        res.status(200).send({ result });
    })
        .catch((error) => {
            res.status(500).send({ error: error.message });
        })
}

exports.findOne = function (req, res) {
    const id = req.params.id;
    productModel.findOne({ _id: id}).then((result) => {
        res.status(200).send({ result });
    })
        .catch((error) => {
            res.status(500).send({ error: error.message });
        })
    mongoose.disconnect;
}

exports.updateProduct = function (req, res) {
    const id = req.query.id;
    productModel.findByIdAndUpdate(id, req.body).then((result) => {
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
exports.deleteProduct = function (req, res) {
    const id = req.params.id;
    productModel.findByIdAndRemove(id).then((result) => {
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
        .catch((error) => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        })
}