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
        title:String,
        description:String,
        date:String,
        categoryId:String,
        rating:Number,
        submitterRating: Number,
        submitterId: String,
        approved:Boolean
    }
);

var model = db.model('Report', schema);

module.exports =  model;
