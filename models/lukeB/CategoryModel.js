/**
 * Created by nikitak on 27.10.2016.
 */
var db=require('../../mongodb/lukeAdb');
var mongoose = require('mongoose');

var schema = mongoose.Schema(
    {
        id:{type: String, required: '{PATH} is required!'},
        title:{type: String, required: '{PATH} is required!'},
        description:String,
        image_url:String
    }
);

var model = db.model('Category', schema);

module.exports =  model;

