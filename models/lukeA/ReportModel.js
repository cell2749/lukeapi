/**
 * Created by nikitak on 6.10.2016.
 */

var db = require('../../mongodb/lukeAdb');
var mongoose = require('mongoose');

var schema = mongoose.Schema(
    {
        id: {type: String, required: '{PATH} is required!'},
        longitude: Number,
        latitude: Number,
        altitude: Number,
        image_url: String,
        thumbnail_url: String,
        title: String,
        description: String,
        date: String,
        categoryId: [
            String
        ],
        rating: Number,
        submitterId: String,
        approved: Boolean,
        flagged: Boolean,
        flags: [
            String
        ],
        votes: [
            {
                userId: String,
                vote: Boolean
            }
        ],
        positive: Boolean
    }
);

var model = db.model('Report', schema);

module.exports = model;
