const express = require('express');
const comment = require('../controllers/comment.controllers');

const router = express.Router();

router.get('/all',comment.findAll);
router.get('/comment_product',comment.findProduct);
router.post('/add',comment.addComment);
router.put('/update',comment.updateComment);
router.delete('/remove', comment.deleteComment);


module.exports = router;