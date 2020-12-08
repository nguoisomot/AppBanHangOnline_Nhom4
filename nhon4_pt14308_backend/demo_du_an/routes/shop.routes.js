const express = require('express');
const createShop = require('../controllers/shop.controllers');

const router = express.Router();

router.get('/all',createShop.findAll);
router.post('/add',createShop.addShop);
router.put('/update',createShop.updateShop);

module.exports = router;