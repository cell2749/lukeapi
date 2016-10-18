/**
 * Created by nikitak on 6.10.2016.
 */

var db=require('../../mongodb/lukeAdb');
var mongoose = require('mongoose');

var schema = mongoose.Schema(
    {
        id:{type: String, required: '{PATH} is required!'},
        name:{type: String, required: '{PATH} is required!'},
        description:String,
        image_url:String

    }
);

var model = db.model('ReportCategory', schema);

module.exports =  model;
