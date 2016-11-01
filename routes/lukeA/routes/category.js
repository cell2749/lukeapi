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
router.get('/all',requiresLogin,function(req,res){
    ReportCategoryModel.find({},MONGO_PROJECTION,function(err,result){
        if(err) throw err;
        res.status(200).json(result);
    });
});
router.get('/create',requiresLogin,requiresRole('admin'),function(req,res){
    var data = req.query;
    var id = mongoose.Types.ObjectId();
    if(data.title) {
        ReportCategoryModel.findOne({title: data.title}, function (err, doc) {
            if (doc) {
                res.status(200).json({error: "Report Category with such name already exists!"});
            } else {
                var reportCategory = new ReportCategoryModel();
                for (var key in reportCategory.schema.paths) {
                    if (Utility.allowKey(key)) {
                        reportCategory[key] = data[key] || reportCategory[key];
                    }
                }
                reportCategory.id = id;
                reportCategory._id = id;

                reportCategory.save(function (err, result) {
                    if (err)throw err;
                    var returnV = {};
                    for (var key in result) {
                        if (key != "_id" || key != "__v") {
                            returnV[key] = result[key];
                        }
                    }
                    res.status(200).json(returnV);
                });
            }
        });
    }else{
        res.status(200).json({error:"Category title required"})
    }
});
router.get("/update",requiresLogin,requiresRole("admin"),function(req,res){
    var data = req.query;
    if(data.id){
        ReportCategoryModel.findOne({id: data.id}, function (err, doc) {
            if (doc) {
                var reportCategory = new ReportCategoryModel();
                for (var key in reportCategory.schema.paths){
                    if(Utility.allowKey(key)) {
                        doc[key] = data[key] || doc[key];
                    }
                }
                doc.save(function(err,result){
                    if(err) throw err;
                    var returnV={}, pattern = new ReportCategoryModel();
                    for(var key in pattern.schema.paths){
                        returnV[key]=result[key];
                    }
                    res.status(200).json(returnV);
                });
            } else {
                res.status(200).json({error: "Report Category with such id doesn't exists!"});

            }
        });
    }else {
        ReportCategoryModel.findOne({name: data.name}, function (err, doc) {
            if (doc) {
                var reportCategory = new ReportCategoryModel();
                for (var key in reportCategory.schema.paths){
                    if(Utility.allowKey(key)) {
                        doc[key] = data[key] || doc[key];
                    }
                }
                doc.save(function(err,result){
                    if(err) throw err;
                    var returnV={}, pattern = new ReportCategoryModel();
                    for(var key in pattern.schema.paths){
                        returnV[key]=result[key];
                    }
                    res.status(200).json(returnV);
                });
            } else {
                res.status(200).json({error: "Report Category with such name doesn't exists!"});
            }
        });
    }
});
router.get("/remove",requiresLogin,requiresRole("admin"),function(req,res){
    var data = req.query;
    var id = data.id;
    ReportCategoryModel.find({id:id}).remove(function(err,item) {
        if (err) throw err;

        if (item.result.n != 0) {
            res.status(200).json({success:"Removed " + item.result.n + " items"});
        } else {
            res.status(200).json({error:"No category with such id"});
        }
    });
});
module.exports = router;