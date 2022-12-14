const express = require('express');
const { verifyTokenAndAdmin } = require('../middleware/verifyToken');
const verifyObjectId = require('../middleware/verifyObjectId');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const upload = require('../config/multer');

//CREATE - OK
router.post('/', verifyTokenAndAdmin, upload.array('images', 6), ProductController.createProduct);

//UPDATE PRODUCT - OK
router.put('/:id', verifyTokenAndAdmin, ProductController.updateProduct);

//RESTORE PRODUCT - OK
router.patch('/:id', verifyTokenAndAdmin, ProductController.restoreProduct);

//DELETE PRODUCT
router.delete('/:id', verifyTokenAndAdmin, ProductController.deleteProduct);

//DESTROY PRODUCT
router.delete('/destroy/:id', verifyTokenAndAdmin, ProductController.destroyProduct);

//GET PRODUCT
router.get('/:id', verifyObjectId, ProductController.readProduct);

//GET ALL PRODUCT CATEGORY
router.get('/', ProductController.readAllProductCategory);

//GET ALL PRODUCTS
router.get('/products', ProductController.readAllProduct);

module.exports = router;
