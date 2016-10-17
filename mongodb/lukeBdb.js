/**
 * Created by nikitak on 6.10.2016.
 */
//var db=require('./lukeAdb');
//var db2=db.useDb('lukeB');
    var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost:27017/lukeB');

module.exports = db;