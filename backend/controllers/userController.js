const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/user.model");
const ErrorHandler = require("../utils/errorHandler");
const { sendToken } = require("../utils/jwtToken");
// register user
exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password, avatar } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar
    });

    sendToken(user, 201, res);
});
// login user
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("please enter email and password", 401));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("please enter valid email or password", 400));
    }
    const isPasswordRight = await user.comparePassword(password);

    if (!isPasswordRight) {
        return next(new ErrorHandler("invalid email or password", 400));
    }
    sendToken(user, 200, res);
});
// logout user
exports.logoutUser = catchAsyncError(async (req, res, next) => {

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    });

    res.status(200).json({
        success:true,
        message:"successfully logged out"
    });
})
