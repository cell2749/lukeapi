/**
 * Created by nikitak on 13.12.2016.
 */

var db=require('../../mongodb/lukeAdb');
var mongoose = require('mongoose');

var schema = mongoose.Schema(
    {
        id:{type: String, required: '{PATH} is required!'},
        link: {type: String, required: '{PATH} is required!'},
        description: String,
        title: String,
        active: Boolean,
        done: [String]
    }
);

var model = db.model('Link', schema);

module.exports =  model;
