const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema(
    {
        orderId:{type:String, required:true, index:true},
        purchasedate:{type:String},
        orderamount:{type:String},
        paymentmethod:{type:String},
        productid:{type:String},
        quantity:{type:Number},
        rfid:{type:String},
        status:{type:String},   
        receiverdetails:{
            emailid:{type:String},
            name:{type:String},
            address:{type:String},
            city:{type:String},
            state:{type:String},
            mobilenumber:{type:String},
        }
    },
    {timestamps:true},
    {versionKey:false},
);


const order = mongoose.model('order', orderSchema, 'orderDetails');

module.exports = order;