const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
    message = err.message || "Internal server error";
    statusCode = err.statusCode || 500;

    if(err.name === 'CastError'){
        const message = `Resource not found, Invalid : ${err.path}`
        err = new ErrorHandler(message,404);
    }
    res.status(statusCode).json({
        success:false,
        message: err.message
    });
}