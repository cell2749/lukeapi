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

const MONGO_PROJECTION ={
    _id: 0,
    __v: 0
};
/* UTILITY FUNCTIONS*/
function allowKey(key) {
    var omit = [
        "id",
        "_id",
        "__v",
        "username",
        "score",
        "rankingId",
        "submitterId",
        "submitterRating"
    ];

    if (omit.indexOf(key) != -1){
        return false;
    }

    return true;
}

router.get('/create', requiresLogin,requiresRole('admin'),function(req,res,next){
    var data = req.query;
    var id = mongoose.Types.ObjectId();

    if(data.title != null) {
        var rank = new RankModel();
        for (var key in rank.schema.paths) {
            if (allowKey(key)) {
                rank[key] = data[key] || rank[key];
            }
        }
        rank.id = id;
        rank._id = id;
        rank.save(function (err, rank) {
            if (err) throw err;
            var returnV = {};
            for (var key in rank) {
                if (key != "_id" || key != "__v") {
                    returnV[key] = rank[key];
                }
            }
            res.status(200).json(returnV);
        });
    }else{
        res.status(200).json({error:"Missing title"});
    }
});
router.get("/update",requiresLogin,requiresRole("admin"),function(req,res){
    var data = req.query;
    if(data.id){
        RankModel.findOne({id: data.id}, function (err, doc) {
            if (doc) {
                var rank = new RankModel();
                for (var key in rank.schema.paths){
                    if(allowKey(key)) {
                        doc[key] = data[key] || doc[key];
                    }
                }
                doc.save(function(err,result){
                    if(err) throw err;
                    var returnV={}, pattern = new RankModel();
                    for(var key in pattern.schema.paths){
                        returnV[key]=result[key];
                    }
                    res.status(200).json(returnV);
                });
            } else {
                res.status(200).json({error:"Rank with such id doesn't exists!"});
            }
        });
    }else {
        RankModel.findOne({title: data.title}, function (err, doc) {
            if (doc) {
                var rank = new RankModel();
                for (var key in rank.schema.paths){
                    if(allowKey(key)) {
                        doc[key] = data[key] || doc[key];
                    }
                }
                doc.save(function(err,result){
                    if(err) throw err;
                    var returnV={}, pattern = new RankModel();
                    for(var key in pattern.schema.paths){
                        returnV[key]=result[key];
                    }
                    res.status(200).json(returnV);
                });
            } else {
                res.status(200).json({error:"Rank with such title doesn't exists"});
            }
        });
    }
});
router.get("/remove",requiresLogin,requiresRole("admin"),function(req,res){
    var data = req.query;
    var id = data.id;
    RankModel.find({id:id}).remove(function(err,item) {
        if (err) throw err;

        if (item.result.n != 0) {
            res.status(200).json({success:"Removed " + item.result.n + " items"});
        } else {
            res.status(200).json({error:"No Rank with such id"});
        }
    });
});
module.exports = router;