/**
 * Created by nikitak on 6.10.2016.
 */
var db=require('./lukeAdb');
var db2=db.useDb('lukeB');

module.exports = db2;