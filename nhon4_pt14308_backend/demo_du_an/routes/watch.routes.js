const express = require('express');
const createUser = require('../controllers/watched.controller');

const router = express.Router();
router.get('/all', createUser.findAll)

router.post('/add', createUser.createCourse);


module.exports = router;