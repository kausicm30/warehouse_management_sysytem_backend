const mongoose = require('mongoose');


const ipAddressSchema = new mongoose.Schema(
    {
        ipAddress:{type:String, default:"192.168.3.4"},
        kitname :{type:String, index:true},
        statusValue:{type:String}
    },
    {timestamps:true},
    {versionKey:false},
);


const ipAddress = mongoose.model('ipAddress', ipAddressSchema, 'KitIpAddress');

module.exports = ipAddress;