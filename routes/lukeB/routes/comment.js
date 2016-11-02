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
/* MODELS */
var UserModel = require("../../../models/lukeB/UserModel");
var ReportModel = require("../../../models/lukeB/ReportModel");
var PlaceModel = require("../../../models/lukeB/PlaceModel");
var CommentModel = require("../../../models/lukeB/CommentModel");
var CategoryModel = require("../../../models/lukeB/CategoryModel");
/*Utility*/
var UtModule = require("../../utility");
var Utility = new UtModule([
    "__v",
    "_id",
    "id",
    "profileId",
    "reportId",
    "votes",
    "date",
    "votes.profileId",
    "votes.date",
    "votes.vote",
    "flagged"
]);
const MONGO_PROJECTION ={
    _id: 0,
    __v: 0
};
router.get("/get-all",function(req,res){
    CommentModel.find({}, MONGO_PROJECTION, function (err, result) {
        if (err) throw err;

        var response = result || [];
        res.status(200).json(response);
    });
});
router.get("/create",requiresLogin,function(req,res) {
    var data = req.query;
    if (data.reportId != null) {
        ReportModel.findOne({id: data.reportId}, function (err, doc) {
            if (err) throw err;
            if (doc) {
                var comment = new CommentModel();
                for (var key in comment.schema.paths) {
                    if (Utility.allowKey(key)) {
                        comment[key] = data[key] || comment[key];
                    }
                }
                var id = mongoose.Types.ObjectId();
                comment._id = id;
                comment.id = id;
                comment.profileId = req.user.profileId;
                comment.save(function (err, item) {
                    if (err)throw err;
                    res.status(200).json({success: true});
                });
            } else {
                res.status(200).json({error: "No report with such Id"});
            }
        });
    } else {
        res.status(200).json({error: "Missing report Id"});
    }
});
router.get("/update",requiresLogin,function(req,res){
    Utility.update(CommentModel,req.query,res);
});
router.get("/remove",requiresLogin,function(req,res){
    Utility.remove(CommentModel,req.query.id,res);
});
router.get("/vote",requiresLogin,function(req,res){
    Utility.vote(CommentModel,req,res,req.query.vote);
});
router.get("/upvote",requiresLogin,function(req,res){
    Utility.vote(CommentModel,req,res,true);
});
router.get("/downvote",requiresLogin,function(req,res){
    Utility.vote(CommentModel,req,res,false);
});
router.get("/downvote-count",function(req,res){
    Utility.voteCount(CommentModel,req.query.id,res,false);
});
router.get("/upvote-count",function(req,res){
    Utility.voteCount(CommentModel,req.query.id,res,true);
});

module.exports = router;