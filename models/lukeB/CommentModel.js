/**
 * Created by nikitak on 1.11.2016.
 */

var db=require('../../mongodb/lukeBdb');
var mongoose = require('mongoose');

var schema = mongoose.Schema(
    {
        id:{type: String, required: '{PATH} is required!'},
        profileId: {type: String, required: '{PATH} is required!'},
        reportId:{type: String, required: '{PATH} is required!'},
        text:String,
        date:String,
        votes:[{
            profileId: String,
            date: String,
            vote: Boolean
        }],
        location: {
            long: Number,
            lat: Number
        },
        flagged: Boolean
    }
);

var model = db.model('Comment', schema);

module.exports =  model;

