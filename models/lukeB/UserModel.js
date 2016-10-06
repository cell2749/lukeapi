/**
 * Created by nikitak on 6.10.2016.
 */

var db=require('../../mongodb/lukeAdb');
var mongoose = require('mongoose');

var schema = mongoose.Schema(
    {
        id:{type: String, required: '{PATH} is required!'},
        username:String,
        email:String,
        image_url:String,
        bio:String,
        location:String,
        gender:String,
        hobby:String,
        favourite_places:[{
            id:String,
            favourite_time:String
        }],
        profile:{},//??
        visitedPlaces:[{
            id:String,
            report:String
        }],
        lastOnline:String,
        logTimes:{
            locationId:String,
            timeLogIn:String,
            timeLogOut:String,
            numberOfComments:Number,
            numberOfRatings:Number,
            numberOfReports:Number
        },
        advancedUser:Boolean,
        adminUser:Boolean
    }
);

var model = db.model('User', schema);

module.exports =  model;
