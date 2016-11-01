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
router.get("/get-all",requiresLogin,requiresRole("admin"),function(req,res){
    ExperienceModel.find({},MONGO_PROJECTION,function(err,result){
        if(err) throw err;

        res.status(200).json(result);
    });
});
router.get("/create",requiresLogin,requiresRole("superadmin"),function(req,res) {
    var data = req.query;
    var experiencePattern = new ExperienceModel();
    if(data.title!=null) {
        for (var key in experiencePattern.schema.paths) {
            if (Utility.allowKey(key)) {
                experiencePattern[key] = data[key] || experiencePattern[key];
            }
        }
        var id = mongoose.Types.ObjectId();
        experiencePattern.id = id;
        experiencePattern._id = id;
        experiencePattern.save(function (err, result) {
            if (err) throw err;
            console.log("Result /");
            console.log(result);
            res.status(200).json({success: true});
        });
    }else{
        res.status(200).json({error:"Title missing"});
    }
});
router.get("/update",requiresLogin,requiresRole("superadmin"),function(req,res){
    var data = req.query;
    ExperienceModel.findOne({id:data.id},function(err, doc){
        if(err) throw err;
        if(doc) {
            var experiencePattern = new ExperienceModel();
            for(var key in experiencePattern.schema.paths){
                if(Utility.allowKey(key)){
                    doc[key]= data[key] || doc[key];
                }
            }
            doc.save(function(err,result){
                if(err) throw err;
                var returnV={}, pattern = new ExperienceModel();
                for(var key in pattern.schema.paths){
                    returnV[key]=result[key];
                }
                res.status(200).json(returnV);
            });

        }else{
            res.status(200).json({error:"No pattern was found"});
        }
    });
});
router.get("/remove",requiresLogin,requiresRole("superadmin"),function(req,res) {
    var data = req.query;
    ExperienceModel.find({id: data.id}).remove(function (err, item) {
        if (err) throw err;
        if (item.result.n != 0) {
            res.status(200).json({success:"Removed " + item.result.n + "items"});
        } else {
            res.status(200).json({error:"No item with such id"});
        }
    });
});
router.get("/activate",requiresLogin,requiresRole("superadmin"),function(req,res) {
    var data = req.query;
    if(data.id) {
        ExperienceModel.update({id: data.id}, {$set: {active: true}}, function (err, doc) {
            if (err) throw err;
            if(doc.n!=0) {
                ExperienceModel.update({
                    id: {$ne: data.id},
                    active: true
                }, {$set: {active: false}}, function (err, result) {


                    if (err) throw err;
                    res.status(200).json({success: true});
                });
            }else{
                res.status(200).json({error:"No experience model with such id"});
            }
        });
    }else{
        res.status(200).json({error:"Missing id for experience model"})
    }
});
// Dangerous!!
router.get("/nullify-everyone",requiresLogin,requiresRole("superadmin"),function(req,res){
    UserModel.update({}, {$set: {score: 0, rankingId:null}}, function (err, result) {
        if(err) throw err;
        res.status(200).json({success:true});
    });
});
router.get("/nullify",requiresLogin,requiresRole("superadmin"),function(req,res){
    var usrId = req.query.id;
    UserModel.update({id:usrId}, {$set: {score: 0, rankingId:null}}, function (err, result) {
        if(err) throw err;
        res.status(200).json({success:true});
    });
});
module.exports = router;
