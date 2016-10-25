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
        category:Number,
        image_url:String,
        description:String,
        profileId: String,
        rating:Number,
        rating2:Number,
        comments:[{
            rating:Number,
            profileId:String,
            comment:String
        }],
        approved:Boolean

    }
);

var model = db.model('Report', schema);

module.exports =  model;

