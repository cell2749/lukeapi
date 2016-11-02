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
    "image_url"
]);
const MONGO_PROJECTION ={
    _id: 0,
    __v: 0
};
router.get("/get-all",function(req,res){
    CategoryModel.find({}, MONGO_PROJECTION, function (err, result) {
        if (err) throw err;

        var response = result || [];
        res.status(200).json(response);
    });
});
router.get("/create",function(req,res){
    var data = req.query;
    res.status(200).send("OK");
});
module.exports = router;