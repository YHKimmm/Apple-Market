const express = require('express');

const { getItems, uploadItems, detailItem, editItem, deleteItem } = require('../controllers/postController');
const { getImage, imageUpload } = require('../controllers/imageUploadHelperController');

const router = express.Router();

router.get('/items', getItems);
router.post('/upload', uploadItems);
router.get('/image', getImage);
router.post('/image/upload', imageUpload);

router.get('/items/:postNum', detailItem);

router.patch('/items/:postNum/edit', editItem);
router.delete('/items/:postNum/delete', deleteItem);

module.exports = router;