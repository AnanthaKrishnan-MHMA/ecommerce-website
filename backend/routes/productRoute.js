const express = require('express');
const router = express.Router();

// controller functions 
const {
    createProduct,
    showAllProducts,
    showProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/controller');

router.route('/products')
    .get(showAllProducts);
router.route('/product/new')
    .post(createProduct);
router.route('/product/:id')
    .get(showProduct)
    .put(updateProduct)
    .delete(deleteProduct);

module.exports = router;