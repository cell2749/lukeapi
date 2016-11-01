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
router.get("/add",requiresLogin,function(req,res) {
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
router.get("/edit",requiresLogin,function(req,res){
    var data = req.query;
    if(data.id) {
        CommentModel.findOne({id: data.id}, function (err, doc) {
            if (err) throw err;
            if (doc) {
                if (req.user.profile.id == doc.profileId) {
                    doc.text = data.text||doc.text;
                    doc.save(function (err, item) {
                        if (err) throw err;
                        res.status(200).json({success: true});
                    });
                } else {
                    res.status(200).json({error: "Cannot modify another users comment"});
                }
            } else {
                res.status(200).json({error: "No comment with such id"});
            }
        });
    }else{
        res.status(200).json({error: "Missing comment id"});
    }
});
router.get("/remove",requiresLogin,function(req,res){
    var data = req.query;
    if(data.id) {
        Utility.remove(CommentModel,data.id);
    }else{
        res.status(200).json({error: "Missing id"});
    }
});
router.get("/vote",requiresLogin,function(req,res){
    var data= req.query;
    if(data.id) {
        if(data.vote!=null) {
            CommentModel.findOne({id: data.id}, function (err, doc) {
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
                    res.status(200).json({error: "No comment with such id"});
                }
            });
        }else{
            res.status(200).json({error:"Missing vote: true or false"});
        }
    }else{
        res.status(200).json({error:"Missing comment id"});
    }
});
router.get("/upvote",requiresLogin,function(req,res){
    var data= req.query;
    if(data.id) {
        CommentModel.findOne({id: data.id}, function (err, doc) {
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
                res.status(200).json({error: "No comment with such id"});
            }
        });
    }else{
        res.status(200).json({error:"Missing comment id"});
    }
});
router.get("/downvote",requiresLogin,function(req,res){
    var data= req.query;
    if(data.id) {
        CommentModel.findOne({id: data.id}, function (err, doc) {
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
                res.status(200).json({error: "No comment with such id"});
            }
        });
    }else{
        res.status(200).json({error:"Missing comment id"});
    }
});

module.exports = router;