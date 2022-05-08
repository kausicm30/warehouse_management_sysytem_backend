const mongoose = require('mongoose');


const livetrackingSchema = new mongoose.Schema(
    {
        containerNumber:{type:String},
        locationDetails:[
            {
                latitude:{type:String},
                longiitude :{type:String},
                createdTime : {type:Date, default:Date.now()}
            }
        ]
    }
);


const liveTracking = mongoose.model('liveTracking', livetrackingSchema, 'livetrackingDetails');

module.exports = liveTracking;
