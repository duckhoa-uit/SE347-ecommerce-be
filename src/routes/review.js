const express = require('express');
const { verifyToken, verifyTokenAndAdmin } = require('../middleware/verifyToken');
const verifyObjectId = require('../middleware/verifyObjectId');
const router = express.Router();
const ReviewController = require('../controllers/ReviewController');

//CREATE REVIEW - OK
router.post('/', verifyToken, ReviewController.create);

//UPDATE REVIEW  - OK
router.put('/:id', verifyToken, ReviewController.update);

//DELETE REVIEW
router.delete('/:id', verifyObjectId, verifyTokenAndAdmin, ReviewController.delete);

//GET ALL REVIEW
router.get('/', verifyTokenAndAdmin, ReviewController.readAll);

module.exports = router;
