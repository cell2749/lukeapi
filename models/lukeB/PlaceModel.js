/**
 * Created by nikitak on 6.10.2016.
 */

var db=require('../../mongodb/lukeBdb');
var mongoose = require('mongoose');

var schema = mongoose.Schema(
    {
        id:{type: String, required: '{PATH} is required!'},
        title:String,
        location:{
            long:{type: Number, required: '{PATH} is required!'},
            lat:{type: Number, required: '{PATH} is required!'}
        },
        type:String,
        votes:[{
            profileId:String,
            date:String,
            vote:Boolean
        }],
        description:String,
        nearReports:[{
            reportId:String
        }],
        visitLog:[{
            profileId:String,
            date:String,
            report:Boolean
        }],
        weatherData:{
            temperature:Number,
            seaTemperature:Number,
            wind:Number
        },
        radius: {type: Number, required: '{PATH} is required!'}

    }
);

var model = db.model('Place', schema);

module.exports =  model;

