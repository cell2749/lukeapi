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
    "username",
    "profileId",
    "votes.profileId",
    "votes.vote",
    "flagged",
    "approved"
]);
const MONGO_PROJECTION ={
    _id: 0,
    __v: 0
};
router.get('/reports',function(req,res){
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
    var flagged = {$ne:null};
    var submitterId = data.submitterId || {$ne:null};

    if(req.isAuthenticated()) {
        var appMetadata = req.user.profile._json.app_metadata || {};
        var roles = appMetadata.roles || [];
        if (roles.indexOf("admin") != -1 || roles.indexOf("advanced") != -1) {
            approved = data.approved || approved;
            flagged = data.flagged || flagged;
        }
    }
    ReportModel.find({approved:approved,submitterId:submitterId,flagged:flagged},MONGO_PROJECTION).sort({"date":-1}).limit(parseInt(limit)).exec(function(err, collection){
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
router.get('/create_report',requiresLogin,function(req,res,next) {
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
router.get('/update-report',requiresLogin,function(req,res){
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
router.get("/remove-report",requiresLogin,function(req,res){
    var data = req.query;
    var id = data.id;
    var appMetadata = req.user.profile._json.app_metadata || {};
    var adminRoles = appMetadata.roles || [];
    ReportModel.findOne({id:id},{"submitterId":1},function(err,doc) {
        if (doc.submitterId == req.user.profile.id || adminRoles.indexOf("admin")!=-1) {
            ReportModel.find({id: id}).remove(function (err, item) {
                if (err) throw err;

                if (item.result.n != 0) {
                    res.status(200).json({success:"Removed " + item.result.n + " items"});
                } else {
                    res.status(200).json({error:"No report with such id"});
                }
            });
        }else{
            res.status(200).json({error:"Restricted Access"});
        }
    });
});
router.get("/upvote-report",requiresLogin,function(req,res){
    var data= req.query;
    if(data.id) {
        ReportModel.findOne({id: data.id}, function (err, doc) {
            if (err)throw err;

            if (doc) {
                var exists = false;
                var vote = {
                    profileId:req.user.profile.id,
                    vote:true
                };
                for(var i=0;i<doc.votes.length;i++){
                    if(doc.votes[i].profileId==req.user.profile.id){
                        doc.votes[i]=vote;
                        exists=true;
                    }
                    if(i==doc.votes.length-1) {
                        if(!exists) {
                            doc.votes.push(vote);
                        }
                        doc.save(function(err,result){
                            if(err)throw err;
                            res.status(200).json({success:true});
                        });
                    }
                }
            } else {
                res.status(200).json({error: "No report with such id"});
            }
        });
    }else{
        res.status(200).json({error:"Missing report id"});
    }
});
router.get("/downvote-report",requiresLogin,function(req,res){
    var data= req.query;
    if(data.id) {
        ReportModel.findOne({id: data.id}, function (err, doc) {
            if (err)throw err;

            if (doc) {
                var exists = false;
                var vote = {
                    profileId:req.user.profile.id,
                    vote:false
                };
                for(var i=0;i<doc.votes.length;i++){
                    if(doc.votes[i].profileId==req.user.profile.id){
                        doc.votes[i]=vote;
                        exists=true;
                    }
                    if(i==doc.votes.length-1) {
                        if(!exists) {
                            doc.votes.push(vote);
                        }
                        doc.save(function(err,result){
                            if(err)throw err;
                            res.status(200).json({success:true});
                        });
                    }
                }
            } else {
                res.status(200).json({error: "No report with such id"});
            }
        });
    }else{
        res.status(200).json({error:"Missing report id"});
    }
});
router.get("/vote-report",requiresLogin,function(req,res){
    var data= req.query;
    if(data.id) {
        if(data.vote!=null) {
            ReportModel.findOne({id: data.id}, function (err, doc) {
                if (err)throw err;

                if (doc) {
                    var exists = false;
                    var vote = {
                        profileId: req.user.profile.id,
                        vote: data.vote
                    };
                    for (var i = 0; i < doc.votes.length; i++) {
                        if (doc.votes[i].profileId == req.user.profile.id) {
                            doc.votes[i] = vote;
                            exists = true;
                        }
                        if (i == doc.votes.length - 1) {
                            if (!exists) {
                                doc.votes.push(vote);
                            }
                            doc.save(function (err, result) {
                                if (err)throw err;
                                res.status(200).json({success: true});
                            });
                        }
                    }
                } else {
                    res.status(200).json({error: "No report with such id"});
                }
            });
        }else{
            res.status(200).json({error:"Missing vote: true or false"});
        }
    }else{
        res.status(200).json({error:"Missing report id"});
    }
});
router.get("/report-downvotes-count",function(req,res){
    var data = req.query;
    var count=0;
    if(data.id) {
        ReportModel.findOne({id: data.id}, function (err, doc) {
            if(err)throw err;
            if(doc){
                for(var i=0;i<doc.votes.length;i++){
                    if(!doc.votes[i].vote){
                        count++;
                    }
                    if(i==doc.votes.length-1){
                        res.status(200).json({count:count});
                    }
                }
            }else{
                res.status(200).json({error:"No report with such id"});
            }
        });
    }else{
        res.status(200).json({error:"Missing report id"});
    }
});
router.get("/report-upvotes-count",function(req,res){
    var data = req.query;
    var count=0;
    if(data.id) {
        ReportModel.findOne({id: data.id}, function (err, doc) {
            if(err)throw err;
            if(doc){
                for(var i=0;i<doc.votes.length;i++){
                    if(doc.votes[i].vote){
                        count++;
                    }
                    if(i==doc.votes.length-1){
                        res.status(200).json({count:count});
                    }
                }
            }else{
                res.status(200).json({error:"No report with such id"});
            }
        });
    }else{
        res.status(200).json({error:"Missing report id"});
    }
});
router.get("/approve-report",requiresLogin,requiresRole("admin"),function(req,res) {
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
router.get("/disapprove-report",requiresLogin,requiresRole("admin"),function(req,res){
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
router.get("/flag-report",requiresLogin,restrictBanned,function(req,res){
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
router.get("/unflag-report",requiresLogin,requiresRole("admin"),function(req,res){
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