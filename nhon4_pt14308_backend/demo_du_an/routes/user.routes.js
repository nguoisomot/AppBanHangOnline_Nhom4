const express = require('express');
const createUser = require('../controllers/user.controllers');

const router = express.Router();
router.get('/all',createUser.findAll)
router.get('/login', createUser.findUser)
router.post('/add', createUser.createCourse);
router.put('/update', createUser.updateUser)

module.exports = router;