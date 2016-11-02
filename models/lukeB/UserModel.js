/**
 * Created by nikitak on 6.10.2016.
 */

var db=require('../../mongodb/lukeBdb');
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
        visitedPlaces:[{
            id:String,
            report:String
        }],
        profile: {
            image_url: String,
            provider: String,
            link: String
        },
        lastOnline:String,
        logTimes:{
            locationId:String,
            timeLogIn:String,
            timeLogOut:String,
            numberOfComments:Number,
            numberOfRatings:Number,
            numberOfReports:Number
        }
    }
);

var model = db.model('User', schema);

module.exports =  model;
