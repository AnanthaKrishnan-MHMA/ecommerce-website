const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/user.model");

exports.createUser = catchAsyncError(
    async(req,res,next)=>{
        const {name,email,password,avatar}= req.body;
        const user = await User.create({
            name,
            email,
            password,
            avatar
        })
        res.status(200).json({
            success:true,
            user,
        })
    }
) 
exports.createProduct = catchAsyncError(async (req, res) => {

    let newProduct = await Product.create(req.body);
    res.status(200).json({
        success: true,
        newProduct
    });
});