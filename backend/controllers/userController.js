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
        });

       const token = user.getJWTToken(user.id,process.env.JWT_TOKEN_SECRET)
        res.status(200).json({
            success:true,
            token,
            user,
        })
    }
) 
