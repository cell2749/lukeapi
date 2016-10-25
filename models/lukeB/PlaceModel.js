/**
 * Created by nikitak on 6.10.2016.
 */

var db=require('../../mongodb/lukeBdb');
var mongoose = require('mongoose');

var schema = mongoose.Schema(
    {
        id:{type: String, required: '{PATH} is required!'},
        location:{
            long:Number,
            lat:Number
        },
        type:String,
        rating:Number,
        description:String,
        nearReports:[{
            id:String
        }],
        visitLog:[{
            id:String,
            date:String,
            report:Boolean
        }],
        weatherData:{
            nearestWeatherStation:String, //???? lat, long?
            temperature:Number,
            seaTemperature:Number,
            wind:Number
        }

    }
);

var model = db.model('Place', schema);

module.exports =  model;

