const express = require('express');

const { postComment, getComments, editComment, deleteComment } = require('../controllers/commentController');
const router = express.Router();

router.post('/postComment', postComment);
router.post('/getComments', getComments);
router.post('/editComment', editComment);
router.post('/deleteComment', deleteComment);

module.exports = router;