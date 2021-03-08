const express = require('express');

const router = express.Router();
const ProductController = require('../controllers/product.controller');

router.get('/products', ProductController.getProducts);
router.get('/products/:sku', ProductController.getProduct);
router.post('/products', ProductController.newProduct);
router.delete('/products', ProductController.deleteProducts);
router.delete('/products/:sku', ProductController.deleteProduct);
router.put('/products/:sku', ProductController.replace);
router.patch('/products/:sku', ProductController.update);

module.exports = router;
