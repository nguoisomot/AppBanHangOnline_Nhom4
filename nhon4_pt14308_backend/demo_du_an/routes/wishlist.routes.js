const express = require('express');
const createUser = require('../controllers/wishlist.controller');

const router = express.Router();
router.get('/all', createUser.findAll)

router.post('/add', createUser.createCourse);


module.exports = router;