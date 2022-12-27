const express = require('express');
const router = express.Router();
const { verifyTokenAndAdmin, verifyToken } = require('../middleware/verifyToken');
const MediaController = require('../controllers/MediaController');
const upload = require('../config/multer');

router.post('/', verifyToken, upload.array('files'), MediaController.uploadFiles);

module.exports = router;
