/**
 * Created by nikitak on 1.11.2016.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var mongodb = require('../../../mongodb/lukeAdb');
/* SECURITY */
var requiresLogin = require('../../../security/requiresLogin');
var requiresRole = require('../../../security/requiresRole');
var requiresRoles = require('../../../security/requiresRoles');
var restrictBanned = require('../../../security/restrictBanned');

/* MODELS */
var UserModel = require("../../../models/lukeA/UserModel");
var ReportModel = require("../../../models/lukeA/ReportModel");
var RankModel = require("../../../models/lukeA/RankModel");
var ReportCategoryModel = require("../../../models/lukeA/ReportCategoryModel");
var VoteModel = require("../../../models/lukeA/VoteModel");
var ExperienceModel = require("../../../models/lukeA/ExperienceModel");
/* UTILITY */
var UtModule = require("../../utility");
var Utility = new UtModule([
    //Omit Keyes to be updated by user
    "id",
    "_id",
    "__v",
    "username",
    "score",
    "rankingId",
    "submitterId",
    "submitterRating"
]);
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
        long : Utility.deg2rad(data.long),
        lat : Utility.deg2rad(data.lat)
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

    var approved = {$ne:null};
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

                if(result[i].latitude!=null&&result[i].longitude!=null) {
                    if (((location.long - result[i].longitude) * longlen) ^ 2 + ((location.lat - result[i].latitude) * latlen) ^ 2 <= distance ^ 2) {
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
router.get('/create',requiresLogin,restrictBanned,function(req,res,next){
    var data = req.query;
    var id = mongoose.Types.ObjectId();

    if(data.title != null) {
        ExperienceModel.findOne({active:true},function(err,exp) {
            if (err) throw err;
            if (exp) {
                UserModel.findOne({id: req.user.profile.id}, function (err, doc) {
                    doc.score = doc.score + exp.reportGain;
                    var report = new ReportModel();
                    //var vote = new VoteModel();

                    for (var key in report.schema.paths) {
                        if (Utility.allowKey(key)) {
                            report[key] = data[key] || report[key];
                        }
                    }
                    if (report.date == null) {
                        report.date = new Date().toISOString();
                    }
                    //vote.report.id = id;
                    report._id = id;
                    if (report.id == null) {
                        report.id = id;
                    }
                    report.votes = {};
                    report.approved = true;
                    report.flagged = false;
                    report.submitterId = req.user.profile.id;
                    doc.save();
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
            } else {
                res.status(200).json({error:"No experience Model active"});
            }
        });
    }else{
        res.status(200).json({error:"Missing title"});
    }
});
//image update should be separated/specified
router.get("/update",requiresLogin,restrictBanned,function(req,res){
    var omitKeyes = [
        "_id",
        "__v",
        "id",
        "longitude",
        "latitude",
        "altitude",
        "date",
        "rating",
        "submitterRating",
        "submitterId",
        "approved",
        "votes"
    ];
    var data = req.query;
    ReportModel.findOne({id:data.id},function(err,doc) {
        if (doc.submitterId != req.user.profile.id) {
            res.status(200).json({error:"Restricted Access"});
        } else {
            if (doc) {
                var pattern = new ReportModel();
                for (var key in pattern.schema.paths) {
                    if (omitKeyes.indexOf(key) == -1) {
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
router.get("/approve",requiresLogin,requiresRole("admin"),function(req,res){
    var data = req.query;
    var id = data.id;
    ReportModel.findOne({id:id},function(err,doc){
        if(err) throw err;
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
router.get("/upvote",requiresLogin,restrictBanned,function(req,res) {
    var userId = req.user.profile.id;
    var reportId = req.query.id;
    if (reportId != null) {
        ExperienceModel.findOne({active: true}, function (err, exp) {
            if (err) throw err;
            if (exp) {
                ReportModel.findOne({id: reportId}, function (err, doc) {
                    if (err) throw err;
                    if (doc) {
                        UserModel.findOne({id: doc.submitterId}, function (err, usr) {
                            if (err) throw err;
                            if (usr) {
                                usr.score = usr.score + exp.upvoteGain;
                                var exists = false;
                                for (var i = 0; i < doc.votes.length; i++) {
                                    if (doc.votes[i].userId == userId) {
                                        exists = true;
                                        if (!doc.votes[i].vote) {
                                            doc.votes[i].vote = true;
                                            if (doc.rating != null) {
                                                doc.rating++;
                                            } else {
                                                doc.rating = 1;
                                            }
                                        }
                                    }
                                }
                                if (!exists) {
                                    doc.votes.push({userId: userId, vote: true});
                                    if (doc.rating != null) {
                                        doc.rating++;
                                    } else {
                                        doc.rating = 1;
                                    }
                                }
                                doc.save();
                                res.status(200).json({success: true});
                            } else {
                                res.status(200).json({error: "Report does not have a submitter"});
                            }
                        });
                    } else {
                        res.status(200).json({error: "No report with such id"});

                    }
                });
            } else {
                res.status(200).json({error: "No experience patterns"});
            }
        });
    } else {
        res.status(200).json({error: "No report id was provided"});
    }
});
router.get("/downvote",requiresLogin,restrictBanned,function(req,res) {
    var userId = req.user.profile.id;
    var reportId = req.query.id;
    if (reportId != null) {
        ExperienceModel.findOne({active: true}, function (err, exp) {
            if (err) throw err;
            if (exp) {
                ReportModel.findOne({id: reportId}, function (err, doc) {
                    if (err) throw err;
                    if (doc) {
                        UserModel.findOne({id: doc.submitterId}, function (err, usr) {
                            if (err) throw err;
                            if (usr) {
                                usr.score = usr.score + exp.downvoteGain;

                                var exists = false;
                                for (var i = 0; i < doc.votes.length; i++) {
                                    if (doc.votes[i].userId == userId) {
                                        exists = true;
                                        if (doc.votes[i].vote) {
                                            doc.votes[i].vote = false;
                                            if (doc.rating != null) {
                                                doc.rating--;
                                            } else {
                                                doc.rating = -1;
                                            }
                                        }
                                    }
                                }
                                if (!exists) {
                                    doc.votes.push({userId: userId, vote: false});
                                    if (doc.rating != null) {
                                        doc.rating--;
                                    } else {
                                        doc.rating = -1;
                                    }
                                }
                                doc.save();
                                res.status(200).json({success: true});
                            } else {
                                res.status(200).json({error: "Report does not have a submitter"});
                            }
                        });
                    } else {
                        res.status(200).json({error: "No report with such id"});
                    }
                });
            } else {
                res.status(200).json({error: "No experience patterns"});
            }
        });
    } else {
        res.status(200).json({error: "No report id was provided"});
    }
});
router.get("/vote",requiresLogin,restrictBanned,function(req,res) {
    var data = req.query;
    var userId = req.user.profile.id;
    var reportId = data.id;
    var vote = data.vote;
    if (reportId != null && vote != null) {
        ExperienceModel.findOne({active: true}, function (err, exp) {
            if (err) throw err;

            if (exp) {
                ReportModel.findOne({id: reportId}, function (err, doc) {
                    if (err) throw err;
                    if (doc) {
                        UserModel.findOne({id: doc.submitterId}, function (err, usr) {
                            if (err) throw err;

                            if (usr) {
                                if (vote == "true" || vote == 1) {
                                    var exists = false;
                                    for (var i = 0; i < doc.votes.length; i++) {
                                        if (doc.votes[i].userId == userId) {
                                            exists = true;
                                            if (!doc.votes[i].vote) {
                                                doc.votes[i].vote = true;
                                                usr.score = usr.score + exp.upvoteGain;
                                                if (doc.rating != null) {
                                                    doc.rating++;
                                                } else {
                                                    doc.rating = 1;
                                                }
                                            }
                                        }
                                    }
                                    if (!exists) {
                                        doc.votes.push({userId: userId, vote: true});
                                        usr.score = usr.score + exp.upvoteGain;
                                        if (doc.rating != null) {
                                            doc.rating++;
                                        } else {
                                            doc.rating = 1;
                                        }
                                    }
                                } else {
                                    var exists = false;
                                    for (var i = 0; i < doc.votes.length; i++) {
                                        if (doc.votes[i].userId == userId) {
                                            exists = true;
                                            if (doc.votes[i].vote) {
                                                doc.votes[i].vote = false;
                                                usr.score = usr.score + exp.downvoteGain;
                                                if (doc.rating != null) {
                                                    doc.rating--;
                                                } else {
                                                    doc.rating = -1;
                                                }
                                            }
                                        }
                                    }
                                    if (!exists) {
                                        doc.votes.push({userId: userId, vote: false});
                                        usr.score = usr.score + exp.downvoteGain;
                                        if (doc.rating != null) {
                                            doc.rating--;
                                        } else {
                                            doc.rating = -1;
                                        }
                                    }
                                }
                                doc.save();
                                res.status(200).json({success: true});
                            } else {
                                res.status(200).json({error: "Report does not have a submitter"});
                            }
                        });
                    } else {
                        res.status(200).json({error: "No report with such id"});
                    }
                });
            } else {
                res.status(200).json({error: "No experience patterns"});
            }
        });
    } else {
        res.status(200).json({error: "Report id or vote was not specified"});
    }
});
router.get("/downvote-count",function(req,res){
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
router.get("/upvote-count",function(req,res){
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
module.exports = router;