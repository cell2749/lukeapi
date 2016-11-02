/**
 * Created by nikitak on 6.10.2016.
 */

var db=require('../../mongodb/lukeBdb');
var mongoose = require('mongoose');

var schema = mongoose.Schema(
    {
        id: {type: String, required: '{PATH} is required!'},
        title: String,
        location: {
            long: Number,
            lat: Number
        },
        categoryId: [String],
        image_url: String,
        description: String,
        profileId: String,
        votes:[{
            profileId:String,
            date:String,
            vote:Boolean
        }],
        approved: Boolean,
        flagged: Boolean

    }
);

var model = db.model('Report', schema);

module.exports =  model;

