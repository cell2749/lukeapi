/**
 * Created by nikitak on 1.11.2016.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var mongodb = require('../mongodb/lukeBdb');
/* SECURITY */
var requiresLogin = require('../security/requiresLogin');
var requiresRole = require('../security/requiresRole');
var requiresRoles = require('../security/requiresRoles');
var restrictBanned = require('../security/restrictBanned');
/* MODELS */
var UserModel = require("../models/lukeB/UserModel");
var ReportModel = require("../models/lukeB/ReportModel");
var PlaceModel = require("../models/lukeB/PlaceModel");
var CommentModel = require("../models/lukeB/CommentModel");
var CategoryModel = require("../models/lukeB/CategoryModel");

const MONGO_PROJECTION ={
    _id: 0,
    __v: 0
};
function allowKey(key) {
    var omit = [
        "id",
        "_id",
        "__v",
        "username",
        "profileId",
        "rating",
        "rating2",
        "votes.profileId",
        "votes.vote",
        "flagged",
        "approved"
    ];
    for (var i = 0; i < omit.length; i++) {
        if (omit[i] == key) {
            return false;
        }
    }
    return true;
}
function deg2rad(deg) {
    return deg * Math.PI / 180;
}
function remove(Model,id) {
    Model.find({id: id}).remove(function (err, item) {
        if (err) throw err;

        if (item.result.n != 0) {
            res.status(200).json({success:"Removed " + item.result.n + " items"});
        } else {
            res.status(200).json({error:"No such id"});
        }
    });
}
function update(Model,data) {
    Model.findOne({id: data.id}, function (err, doc) {
        if (doc) {
            var pattern = new Model();
            for (var key in pattern.schema.paths) {
                if (allowKey(key)) {
                    doc[key] = data[key] || doc[key];
                }
            }
            res.status(200).json({success:true});
        } else {
            res.status(200).json({error:"No such id"});
        }
    });
}
module.export = router;