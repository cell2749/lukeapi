/**
 * Created by nikitak on 6.10.2016.
 */

var db=require('../../mongodb/lukeAdb');
var mongoose = require('mongoose');

var schema = mongoose.Schema(
    {
        id:{type: String, required: '{PATH} is required!'},
        POIdensity:String
    }
);

var model = db.model('User', schema);

module.exports =  model;
