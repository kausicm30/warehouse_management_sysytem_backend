const mongoose = require('mongoose');


const productSchema = new mongoose.Schema(
    {
        productId:{type:String, required:true, index:true},
        title:{type:String, required:true, index:true},
        description:{type:String, required:true},
        category:{type:String, required:true, index:true},
        color:{type:String, required:true},
        pricing:{
            unitprice:{type:Number, required:true},
        },
        quantity:{type:Number, required:true}
    },
    {timestamps:true},
    {versionKey:false},
);


const product = mongoose.model('Product', productSchema, 'productDetails');

module.exports = product;