const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/user.model");
const ErrorHandler = require("../utils/errorHandler");
const { sendToken } = require("../utils/jwtToken");
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

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

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: "successfully logged out"
    });
});
// reset password user 
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return next(new ErrorHandler(`${email} is not an existing user`));
    }
    const resetToken = user.getResetPasswordToken();

    user.save({ validateBeforeSave: false });
    // confirmation link 
    const resetPassLink = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;
    // email subject
    const subject = 'Password Reset';
    // email message
    const message = `Hello ${user.name},\n click the following link for reseting your password:\n\n${resetPassLink}
    \n\n WARNING \n If you did not request for a password reset, please gnore this message.`
    console.log(message);

    try {
        await sendEmail({
            email,
            subject,
            message,
        });
        res.status(200).json({
            success: true,
            message: `confirmation link was send to ${user.email}`
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(`${error.message} ${error.stack} Please try again`, 500))
    }
});

// set new password
exports.setNewPassword = catchAsyncError(async (req, res, next) => {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken: tokenHash,
        resetPasswordExpire: {
            $gt: Date.now()
        }
    });
    if (!user) {
        return next(new ErrorHandler('token invalid or expired,try again', 400));
    }
    if (password !== confirmPassword) {
        return next(new ErrorHandler("password does not match, try again", 400));
    }
    user.password = password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save();

    sendToken(user, 200, res);
});

// all user details 
exports.getAllUser = catchAsyncError(async (req, res, next) => {
    const users = await User.find({});
    if (!users) {
        return next(new ErrorHandler("resource not found", 404));
    }
    res.status(200).json({
        success: true,
        users
    });
});
// single user details
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler("user does not exist", 404));
    }
    res.status(200).json({
        success: true,
        user
    });
});
// details of user that is logged in
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user) {
        return next(new ErrorHandler("resource not found, login and try again", 404));
    }
    res.status(200).json({
        success: true,
        user
    });
});
// reset user password 
exports.changeUserPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
    if (!user) {
        return next(new ErrorHandler("resource not found, login and try again", 404));
    }
    const { currentPassword, newPassword, confirmPassword } = req.body;
    if (newPassword !== confirmPassword) {
        return next(new ErrorHandler("password did not match", 404));
    }
    const verifyPassword = await user.comparePassword(currentPassword);
    if (!verifyPassword) {
        return next(new ErrorHandler("invalid password", 404));
    }
    user.password = newPassword;
    await user.save();

    sendToken(user, 200, res);
});
// update user
exports.updateUser = catchAsyncError(async (req, res, next) => {
    const { email, name, password } = req.body;

    let user = await User.findById(req.user.id).select("+password");

    const verifyPassword = await user.comparePassword(password);
    if (!verifyPassword) {
        return next(new ErrorHandler("invalid password", 404));
    }
    const updateUserData = {
        email,
        name
    }
    // we will add cloudinary later
    user = await User.findByIdAndUpdate(req.user.id, updateUserData, { runValidators: true, new: true, useFindAndModify: false });

    res.status(200).json({
        success: true,
        user
    })
});
// update user role --ADMIN
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
    const { email, name, role} = req.body;

    let user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler("user does not exist", 404));
    }
    const updateUserData = {
        email,
        name,
        role
    }
    user = await User.findByIdAndUpdate(req.params.id, updateUserData, { runValidators: true, new: true, useFindAndModify: false });

    res.status(200).json({
        success: true,
        user
    })
});
// delete user --ADMIN
exports.deleteUser = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler("user does not exist", 404));
    }
    await user.remove();

    res.status(200).json({
        success: true,
        message: "user deleted successfully"
    })
});

