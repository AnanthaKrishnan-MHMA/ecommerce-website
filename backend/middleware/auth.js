const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken');
const User = require("../models/user.model");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("please login in", 404));
    }
    // decoding jwt token
    const decodedData = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

    req.user = await User.findById(decodedData.id);
    next();
}); 