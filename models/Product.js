
const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    product_name:{
        type:String,
        required:true
    },
    product_price:{
        type:Number,
        required:true
    },
    category_id:{
        type:mongoose.Schema.ObjectId,
        ref:'Category',
        required:true
    },
    seller_id:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },


})
module.exports = mongoose.model("Product",productSchema)