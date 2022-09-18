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

    let resultPerPage = 6;
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

//add user review
exports.addUserReview = catchAsyncError(async (req, res, next) => {
    const { comment, rating } = req.body;
    const { _id, name } = req.user;
    const review = {
        user: _id,
        name,
        comment,
        rating: Number(rating)
    }
    if (!req.user) {
        return next(new ErrorHandler("login and try again", 404));
    }
    let product = await Product.findById(req.query.id);
    // checking for existance of product
    if (!product) {
        return next(new ErrorHandler("product not found", 404));
    }
    // checking if review already existance 
    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString());
    if (isReviewed) {
        product.reviews.forEach(rev => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = rating;
                rev.comment = comment;
            }
        })
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }
    // calculating total ratings given by each user
    let totalRatings = 0;
    // calculating average rating given by users
    product.reviews.forEach(rev => {
        totalRatings += rev.rating;
    });
    product.ratings = totalRatings / product.reviews.length;
    await product.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
        product
    });
});
// show all review of a product
exports.showProductReviews = catchAsyncError(async (req, res, next) => {

    let product = await Product.findById(req.query.id);
    // checking for existance of product
    if (!product) {
        return next(new ErrorHandler("product not found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    });

});
// delete review of a product
exports.deleteProductReview = catchAsyncError(async (req, res, next) => {

    let product = await Product.findById(req.query.id);
    // checking for existance of product
    if (!product) {
        return next(new ErrorHandler("product not found", 404));
    }
    // filtering review to be deleted from the array
    const filtredReviews = product.reviews.filter(rev => rev.user.toString() !== req.user._id.toString());
    const numOfReviews = filtredReviews.length;
    let totalRatings = 0;
    filtredReviews.forEach(rev => {
        totalRatings += rev.rating;
    });
    const ratings = totalRatings / numOfReviews;
    product = await Product.findByIdAndUpdate(req.query.id,{
        reviews : filtredReviews,
        ratings,
        numOfReviews
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success: true,
        message:"review deleted successfully",
        product

    });

});