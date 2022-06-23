const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "please enter product name"]
    },
    description: {
        type: String,
        required: [true, "please enter product description"]
    },
    price: {
        type: Number,
        required: [true, "please enter product price"],
        maxLength: [8, "price cannot exceed 8 characters"]
    },
    category: {
        type: String,
        required: [true, "please enter product category"]
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    stock:{
        type:Number,
        required:[true,"please enter product stock"],
        maxLength:[4,"product stock cannot exceed 4 characters"],
        default:1
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    created_at:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("Products",productSchema);