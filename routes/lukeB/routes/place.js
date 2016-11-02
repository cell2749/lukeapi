/**
 * Created by nikitak on 1.11.2016.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var mongodb = require('../../../mongodb/lukeBdb');
/* SECURITY */
var requiresLogin = require('../../../security/requiresLogin');
var requiresRole = require('../../../security/requiresRole');
var requiresRoles = require('../../../security/requiresRoles');
var restrictBanned = require('../../../security/restrictBanned');
var requiresOneOfRoles = require('../../../security/requiresOneOfRoles');
/* MODELS */
var UserModel = require("../../../models/lukeB/UserModel");
var ReportModel = require("../../../models/lukeB/ReportModel");
var PlaceModel = require("../../../models/lukeB/PlaceModel");
var CommentModel = require("../../../models/lukeB/CommentModel");
var CategoryModel = require("../../../models/lukeB/CategoryModel");
/*Utility*/
var UtModule = require("../../utility");
var Utility = new UtModule([
    "id",
    "_id",
    "__v",
    "rating",
    "profileId",
    "nearReports",
    "visitLog",
    "visitLog.id",
    "visitLog.date",
    "visitLog.report",
    "weatherData",
    "weatherData.nearestWeatherStation", //??
    "weatherData.temperature",
    "weatherData.seaTemperature",
    "weatherData.wind"
]);
const MONGO_PROJECTION ={
    _id: 0,
    __v: 0
};
router.get("/create",requiresOneOfRoles(["admin","advanced","researcher"]),function(req,res) {
    var data = req.query;
    if (data.title) {
        var place = new PlaceModel();

        for (var key in place.schema.paths) {
            if (Utility.allowKey(key)) {
                place[key] = data[key];
            }
        }
        var id = mongoose.Types.ObjectId();
        place.id = id;
        place._id = id;
        place.save(function (err, result) {
            if (err)throw err;
            res.status(200).json({success: true});
        });
    } else {
        res.status(200).json({error: "Missing title"});
    }
});
router.get("/update",requiresOneOfRoles(["admin","advanced","researcher"]),function(req,res) {
    Utility.update(PlaceModel, req.query,res);
});
router.get("/remove",requiresOneOfRoles(["admin","advanced","researcher"]),function(req,res) {
    Utility.remove(PlaceModel, req.query.id,res);
});
router.get("/upvote",requiresLogin,restrictBanned,function(req,res){
    Utility.vote(PlaceModel,req,res,true);
});
router.get("/downvote",requiresLogin,restrictBanned,function(req,res){
    Utility.vote(PlaceModel,req,res,false);
});
router.get("/vote",requiresLogin,restrictBanned,function(req,res){
    Utility.vote(PlaceModel,req,res,req.query.vote);
});
router.get("/downvote-count",function(req,res){
    Utility.voteCount(PlaceModel,req.query.id,res,false);
});
router.get("/upvote-count",function(req,res){
    Utility.voteCount(PlaceModel,req.query.id,res,true);
});

module.exports = router;