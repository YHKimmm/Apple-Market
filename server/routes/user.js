const express = require('express');

const { userRegister, updateUserProfileImage } = require('../controllers/userController');

const router = express.Router();

router.post('/register', userRegister);
router.post('/image/save', updateUserProfileImage);


module.exports = router;