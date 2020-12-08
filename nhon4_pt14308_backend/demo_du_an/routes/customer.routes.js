const express = require('express');
const custom = require('../controllers/custom.controllers');

const router = express.Router();

router.get('/all', custom.findAll);

router.post('/add', custom.createCourse);



module.exports = router;