/**
 * Created by Cell on 20-Oct-15.
 */


var db=require('../../mongodb/lukeAdb');
var mongoose = require('mongoose');

var schema = mongoose.Schema(
    {
        id:{type: String, required: '{PATH} is required!'},
        title: {type: String, required: '{PATH} is required!'},
        reportGain: Number,
        upvoteGain: Number,
        downvoteGain: Number,
        active: Boolean
    }
);

var model = db.model('ExperiencePattern', schema);

module.exports =  model;
