/**
 * Created by nikitak on 6.10.2016.
 */

var db=require('../../mongodb/lukeAdb');
var mongoose = require('mongoose');

var schema = mongoose.Schema(
    {
        userId:{type: String, required: '{PATH} is required!'},
        reportId:String,
        rating:Number

    }
);

var model = db.model('Vote', schema);

module.exports =  model;
