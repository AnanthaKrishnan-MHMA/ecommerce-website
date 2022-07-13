const Product = require('../models/product.model');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const ApiFeatures = require('../utils/apiFeatures');

// show all products
exports.createProduct = catchAsyncError(async (req, res) => {
    
    req.body.user = req.user._id;
     
    let newProduct = await Product.create(req.body);
    res.status(200).json({
        success: true,
        newProduct
    });
});

// create new product
exports.showAllProducts = catchAsyncError(async (req, res) => {

    let resultPerPage = 5;
    let productsCount = await Product.countDocuments();
    let apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
    let products = await apiFeatures.query;

    res.status(200).json({
        success: true,
        productsCount,
        products,
    });
});

// product details
exports.showProduct = catchAsyncError(async (req, res, next) => {

    let product = await Product.findById(req.params.id);
    // checking for existance of product
    if (!product) {
        return next(new ErrorHandler("product not found", 404));
    }

    res.status(200).json({
        success: true,
        product
    });
});
// update product 
exports.updateProduct = catchAsyncError(async (req, res, next) => {

    let product = await Product.findById(req.params.id);
    // checking for existance of product
    if (!product) {
        return next(new ErrorHandler("product not found", 404));
    }

    let updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({
        success: true,
        updatedProduct
    });

});
// delete product 
exports.deleteProduct = catchAsyncError(async (req, res, next) => {

    let product = await Product.findById(req.params.id);
    // checking for existance of product
    if (!product) {
        return next(new ErrorHandler("product not found", 404));
    }

    await product.remove();
    res.status(200).json({
        success: true,
        message: "product deleted successfully"
    });

});