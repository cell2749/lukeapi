var express = require('express');
var router = express.Router();
var async = require('async');
/* MODELS */
var UserModel = require("../models/lukeA/UserModel");
var ReportModel = require("../models/lukeA/ReportModel");
var RankModel = require("../models/lukeA/RankModel");
var ReportCategoryModel = require("../models/lukeA/ReportCategoryModel");
var VoteModel = require("../models/lukeA/VoteModel");

/* GET READ REQUESTS. */
router.get('/user', function(req, res, next) {

  async.parallel([function(callback) {
    var projection = {
      _id: 0,
      __v: 0
    };
    UserModel.find({},projection, function (err, result) {
      if(err) throw err;

      if(result[0]!=null){

      }else{

      }
    });
  }],function(err){
    if(err) throw err;

  })

});


module.exports = router;
