const express = require('express');
const router = express.Router();

// controller functions 
const {
    createProduct,
    showAllProducts,
    showProduct,
    updateProduct,
    deleteProduct,
    addUserReview
} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router.route('/products')
    .get(showAllProducts);

router.route('/admin/product/new')
    .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

router.route('/admin/product/:id')
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route('/product/:id')
    .get(showProduct)
    .post(isAuthenticatedUser,addUserReview);


module.exports = router;