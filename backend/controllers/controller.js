const Product = require('../models/product.model');

// show all products
exports.createProduct = async (req, res) => {

    let newProduct = await Product.create(req.body);
    res.status(200).json({
        success: true,
        newProduct
    });
}

// create new product
exports.showAllProducts = async (req, res) => {
    let allProducts = await Product.find();
    res.status(200).json({
        success: true,
        allProducts
    });
}

// product details
exports.showProduct = async (req, res) => {

    let product = await Product.findById(req.params.id);
    // checking for existance of product
    if (!product) {
        return res.status(500).json({
            success: false,
            message: "product doesn't exist"
        })
    }

    res.status(200).json({
        success: true,
        product
    });
}
// update product 
exports.updateProduct = async (req, res) => {

    let product = await Product.findById(req.params.id);
    // checking for existance of product
    if (!product) {
        return res.status(500).json({
            success: false,
            message: "product doesn't exist"
        })
    }

    let updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.status(200).json({
        success: true,
        updatedProduct
    });

}
// delete product 
exports.deleteProduct = async (req, res) => {

    let product = await Product.findById(req.params.id);
    // checking for existance of product
    if (!product) {
        return res.status(500).json({
            success: false,
            message: "product doesn't exist"
        })
    }

    await product.remove();
    res.status(200).json({
        success: true,
        message: "product deleted successfully"
    });

}