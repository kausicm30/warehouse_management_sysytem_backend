const mongoose = require('mongoose');


const adminSchema = new mongoose.Schema(
    {
        adminId:{type:String, required:true, index:true},
        name:{type:String},
        warehousename:{type:String},
        password:{type:String},
        mobilenumber:{type:String},
        emailId:{type:String},
        dob:{type:String}
    },
    {timestamps:true},
    {versionKey:false},
);


const admin = mongoose.model('admin', adminSchema, 'adminDetails');

module.exports = admin;