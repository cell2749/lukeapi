/**
 * Created by nikitak on 1.11.2016.
 */
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
    "id",
    "_id",
    "__v",
    "profileId",
    "image_url",
    "votes",
    "votes.profileId",
    "votes.vote",
    "votes.date",
    "flagged",
    "approved"
],5);
const MONGO_PROJECTION ={
    _id: 0,
    __v: 0
};
router.get('/get-all',function(req,res){
    var data = req.query;
    var returnResult=[];
    var limit = data.limit || 0;
    var rating = data.rating;

    //deg2rad might not be necessary
    var location = {
        long : deg2rad(data.long),
        lat : deg2rad(data.lat)
    };
    var distance = data.distance || 5000;

    // Set up "Constants"
    const m1 = 111132.92;		// latitude calculation term 1
    const m2 = -559.82;		// latitude calculation term 2
    const m3 = 1.175;			// latitude calculation term 3
    const m4 = -0.0023;		// latitude calculation term 4
    const p1 = 111412.84;		// longitude calculation term 1
    const p2 = -93.5;			// longitude calculation term 2
    const p3 = 0.118;			// longitude calculation term 3

    var latlen = m1 + (m2 * Math.cos(2 * location.lat)) + (m3 * Math.cos(4 * location.lat)) +
        (m4 * Math.cos(6 * location.lat));
    var longlen = (p1 * Math.cos(location.lat)) + (p2 * Math.cos(3 * location.lat)) +
        (p3 * Math.cos(5 * location.lat));

    var approved = true; //{$ne:null};
    var flagged = false; //{$ne:null};
    var submitterId = data.submitterId || {$ne:null};
    var showVotes = 0;
    if(data.votes=="false"||data.votes==0){
        showVotes = 0;
    }else if(data.votes=="true"||data.votes==1){
        showVotes = 1;
    }
    var newProjection = MONGO_PROJECTION;
    newProjection[votes]=showVotes;

    if(req.isAuthenticated()) {
        var appMetadata = req.user.profile._json.app_metadata || {};
        var roles = appMetadata.roles || [];
        if (roles.indexOf("admin") != -1 || roles.indexOf("advanced") != -1) {
            approved = data.approved || approved;
            flagged = data.flagged || flagged;
        }
    }
    ReportModel.find({approved:approved,submitterId:submitterId,flagged:flagged},newProjection).sort({"date":-1}).limit(parseInt(limit)).exec(function(err, collection){
        if(err) throw err;
        var result = [];
        if(rating!=null) {
            for (i = 0; i < collection.length; i++) {
                if (collection[i].rating != null && rating < collection[i].rating) {
                    result.push(collection[i]);
                }
            }
        }else{
            result=collection;
        }

        if(distance&&location.long&&location.lat) {
            for (var i = 0; i < result.length; i++) {

                if(result[i].location.lat!=null&&result[i].location.long!=null) {
                    if (((location.long - result[i].location.long) * longlen) ^ 2 + ((location.lat - result[i].location.lat) * latlen) ^ 2 <= distance ^ 2) {
                        returnResult.push(result);
                    }
                }
                if(i==result.length-1){
                    res.status(200).json(returnResult);
                }
                //might require improvement right here
            }
        }else {
            res.status(200).json(result);
        }
    });
});
router.get('/create',requiresLogin,function(req,res,next) {
    var data = req.query;
    var id = mongoose.Types.ObjectId();

    UserModel.findOne({id: req.user.profile.id}, function (err, doc) {
        doc.score = doc.score + REPORT_SCORE_VALUE;
        var report = new ReportModel();
        //var vote = new VoteModel();

        for (var key in report) {
            if (Utility.allowKey(key)) {
                report[key] = data[key] || report[key];
            }
        }
        if (report.date == null) {
            report.date = new Date().toISOString();
        }
        //vote.report.id = id;
        report._id = id;
        report.approved = false;
        report.rating = 0;
        report.rating2 = 0;
        report.save(function (err, report) {
            if (err)throw err;
            var returnV = {};
            for (var key in report) {
                if (key != "_id" || key != "__v") {
                    returnV[key] = report[key];
                }
            }
            res.status(200).json(returnV);
        });
    });

});
router.get('/update',requiresLogin,function(req,res){
    var data = req.query;

    var allowedKeyes = [
        "title",
        "description",
        "categoryId"
    ];
    var appMetadata = req.user.profile._json.app_metadata || {};
    var roles = appMetadata.roles || [];

    ReportModel.findOne({id:data.id},function(err,doc) {
        if (doc.profileId != req.user.profile.id && roles.indexOf("admin")==-1) {
            res.status(200).json({error:"Restricted Access"});
        } else {
            if (doc) {
                var pattern = new ReportModel();
                for (var key in pattern.schema.paths) {
                    if (allowedKeyes.indexOf(key) != -1) {
                        doc[key] = data[key] || doc[key];
                    }
                }
                doc.save(function(err,result){
                    var returnV={}, reportPattern = new ReportModel();
                    for(var key in reportPattern.schema.paths){
                        returnV[key]=result[key];
                    }
                    res.status(200).json(returnV);
                });

            } else {
                res.status(200).json({error:"No such id"});
            }
        }
    });
});
router.get("/remove",requiresLogin,function(req,res){
    Utility.remove(ReportModel, req.query.id,res);
});
router.get("/upvote",requiresLogin,function(req,res){
    Utility.vote(ReportModel,req,res,true);
});
router.get("/downvote",requiresLogin,function(req,res){
    Utility.vote(ReportModel,req,res,false);
});
router.get("/vote",requiresLogin,function(req,res){
    Utility.vote(ReportModel,req,res,req.query.vote);
});
router.get("/downvote-count",function(req,res){
    Utility.voteCount(ReportModel,req.query.id,res,false);
});
router.get("/upvote-count",function(req,res){
    Utility.voteCount(ReportModel,req.query.id,res,true);
});
router.get("/approve",requiresLogin,requiresRole("admin"),function(req,res) {
    var data = req.query;
    var id = data.id;
    ReportModel.findOne({id: id}, function (err, doc) {
        if (err) throw err;
        if(doc) {
            doc.approved = true;
            doc.save(function(err,result){
                if(err) throw err;
                res.status(200).json({success:true});
            });
        }else{
            res.status(200).json({error:"No report with such id"});
        }
    });
});
router.get("/disapprove",requiresLogin,requiresRole("admin"),function(req,res){
    var data = req.query;
    var id = data.id;
    ReportModel.findOne({id:id},function(err,doc){
        if(err) throw err;
        if(doc) {
            doc.approved = false;
            doc.save(function(err,result){
                if(err) throw err;
                res.status(200).json({success:true});
            });
        }else{
            res.status(200).json({error:"No report with such id"});
        }
    });
});
router.get("/flag",requiresLogin,restrictBanned,function(req,res){
    var data = req.query;
    var id = data.id;
    ReportModel.findOne({id:id},function(err,doc){
        if(err) throw err;
        if(doc) {
            doc.flagged = true;
            doc.save(function(err,result){
                if(err) throw err;
                res.status(200).json({success:true});
            });
        }else{
            res.status(200).json({error:"No report with such id"});
        }
    });
});
router.get("/unflag",requiresLogin,requiresRole("admin"),function(req,res){
    var data = req.query;
    var id = data.id;
    ReportModel.findOne({id:id},function(err,doc){
        if(err) throw err;
        if(doc) {
            doc.flagged = false;
            doc.save(function(err,result){
                if(err) throw err;
                res.status(200).json({success:true});
            });
        }else{
            res.status(200).json({error:"No report with such id"});
        }
    });
});
module.exports = router;