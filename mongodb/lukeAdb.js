/**
 * Created by nikitak on 6.10.2016.
 */
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017/lukeA');


db.connection.on('error', console.error.bind(console, 'connection error...'));
db.connection.once('open', function callback(){
    console.log('Luke db opened'); //On successful connection log to console
});

module.exports = db;