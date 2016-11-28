/**
 * Created by nikitak on 28.11.2016.
 */
var db = require('../../mongodb/lukeAdb');
var mongoose = require('mongoose');

var schema = mongoose.Schema(
    {
        id: {type: String, required: '{PATH} is required!'},
        longitude: Number,
        latitude: Number,
        title: String,
        description: String,
        date: String,
        owner: String
    }
);

var model = db.model('AdminMarker', schema);

module.exports = model;

