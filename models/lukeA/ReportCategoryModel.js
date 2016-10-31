/**
 * Created by nikitak on 6.10.2016.
 */

var db=require('../../mongodb/lukeAdb');
var mongoose = require('mongoose');

var schema = mongoose.Schema(
    {
        id:{type: String, required: '{PATH} is required!'},
        title:{type: String, required: '{PATH} is required!'},
        description:String,
        image_url:String,
        positive:Boolean

    }
);

var model = db.model('ReportCategory', schema);

module.exports =  model;
