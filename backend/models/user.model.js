const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "please enter your name"],
        maxLength: [30, "name must not exceede 30 characters"],
        minLength: [4, "name must not be less than 4 characters"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "please provide an email address"],
        validate: [validator.isEmail, "please enter a valid email address"],
    },
    password: {
        type: String,
        required: [true, "please enter your password"],
        minLength: [8, "name must not exceede 8 characters"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date

});
// Hashing password if user created or password modified
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});
userSchema.methods.getJWTToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_TOKEN_SECRET,{
        expiresIn:process.env.JWT_TOKEN_EXPIRES
    }) 
}
userSchema.methods.comparePassword = function (enteredPassword){
    return bcrypt.compare(enteredPassword,this.password);
}
module.exports = mongoose.model("User", userSchema);
