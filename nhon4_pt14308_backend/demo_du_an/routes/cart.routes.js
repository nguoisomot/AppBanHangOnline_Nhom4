const express = require('express');
const createCart = require('../controllers/cart.controllers');

const router = express.Router();
router.post('/add', createCart.createCourse);
router.get('/all', createCart.findAll);

module.exports = router;