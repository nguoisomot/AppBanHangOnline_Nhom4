const express = require('express');
const createOrder = require('../controllers/orders.controller');

const router = express.Router();
router.post('/add', createOrder.createCourse);
router.get('/all', createOrder.findAll);

module.exports = router;