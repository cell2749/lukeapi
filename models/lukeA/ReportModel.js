/**
 * Created by nikitak on 6.10.2016.
 */

var db=require('../../mongodb/lukeAdb');
var mongoose = require('mongoose');

var schema = mongoose.Schema(
    {
        id:{type: String, required: '{PATH} is required!'},
        longitude: Number,
        latitude: Number,
        altitude: Number,
        image_url: String,
        submitterRating: Number,//????
        submitterId: String,
        title:String,
        description:String,
        date:String,
        categoryId:String

    }
);

var model = db.model('User', schema);

module.exports =  model;
