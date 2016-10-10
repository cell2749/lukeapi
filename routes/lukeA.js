var express = require('express');
var router = express.Router();
var jwtCheck = require('./jwtCheck');
//var async = require('async');
/* MODELS */
var UserModel = require("../models/lukeA/UserModel");
var ReportModel = require("../models/lukeA/ReportModel");
var RankModel = require("../models/lukeA/RankModel");
var ReportCategoryModel = require("../models/lukeA/ReportCategoryModel");
var VoteModel = require("../models/lukeA/VoteModel");

/* AUTHENTICATION SETUP */
/* GET READ REQUESTS NON AUTH */
/**
 * */
router.get('/users', function(req, res, next) {
    var projection = {
      _id: 0,
      __v: 0
    };
    UserModel.find({},projection, function (err, result) {
      if(err) throw err;

      if(result[0]!=null){
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(result));
      }else{
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end("[]");
      }
    });
});
/**
 * */
router.get('/user', function(req, res, next) {
  var id=req.query.id;
  var projection = {
    _id: 0,
    __v: 0
  };
  UserModel.findOne({id:id},projection, function (err, result) {
    if(err) throw err;

    if(result!=null){
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(result));
    }else{
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end("{}");
    }
  });
});
/**
 * */

/* GET READ REQUESTS AUTH */
router.get('/achievements',function(req,res,next){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end("OK");
});

router.get('/triggertitle',function(req,res,next){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end("OK");
});
/* POST WRITE REQUESTS AUTH*/
router.post('/create_rank',function(req,res,next){
  var data = req.body.data;
  console.log(data);
  var id = data.id;
  var title = data.title;
  var description = data.description;
  var image_url = data.image_url;
  var score = data.score;
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end("OK");
});

router.post('/create_report',function(req,res,next){
  var data = req.body;
  console.log('DATA /');
  console.log(data);
  var id  = data.id;
  var longitude = data.longitude;
  var latitude = data.latitude;
  var altitude = data.altitude;
  var image_url = data.image_url;//!
  var submitterRating = data.submitterRating;
  var submitterId = data.submitterId;
  var title = data.title;
  var description = data.description;
  var date = data.date;
  var categoryId = data.categoryId;
  if(id==null){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end("ID");
  }else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end("OK");
  }
});
/* GET AUTH TESTS */
router.get('/test/public',function(req,res,next){

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end("public OK");
});
router.get('/test/registered',jwtCheck,function(req,res,next){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end("registered OK");
});
router.get('/test/admin',function(req,res,next){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end("admin OK");
});
module.exports = router;
