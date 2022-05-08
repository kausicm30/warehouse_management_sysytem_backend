const mongoose = require('mongoose');


const containerSchema = new mongoose.Schema(
    {
        containerNumber:{type:String, required:true},
        orderIds:{type:Array},
        rfidTags : {type:Array},
        driverName:{type:String},
        warehousename:{type:String},
        mobilenumber:{type:String},
        startingPoint:{type:String},
        BoardingPoints:[{
            place:{type:String},
            status:{type:String,default:"in-transit"}
        }]
    },
    {timestamps:true},
);


const container = mongoose.model('container', containerSchema, 'containerDetails');

module.exports = container;