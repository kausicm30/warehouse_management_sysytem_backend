const mongoose = require('mongoose');


const employeeSchema = new mongoose.Schema(
    {
        employeeId:{type:String, required:true, index:true},
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


const employee = mongoose.model('employee', employeeSchema, 'employeeDetails');

module.exports = employee;