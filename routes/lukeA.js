var express = require('express');
var router = express.Router();
var passport = require('passport');
/* SECURITY */
var requiresLogin = require('../security/requiresLogin');
var requiresRole = require('../security/requiresRole');
var requiresRoles = require('../security/requiresRoles');
/* MODELS */
var UserModel = require("../models/lukeA/UserModel");
var ReportModel = require("../models/lukeA/ReportModel");
var RankModel = require("../models/lukeA/RankModel");
var ReportCategoryModel = require("../models/lukeA/ReportCategoryModel");
var VoteModel = require("../models/lukeA/VoteModel");

/* AUTHENTICATION SETUP */
router.get("/authzero",function(req,res,next){
  var env = {
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL_DEVELOPMENT_A
  };
  res.status(200).json(env);
});
router.get('/callback',passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }), function(req, res) {
  var route = req.query.route;

  if (!req.user) {
    throw new Error('user null');
  }else{
    var userData = req.user.profile;
    console.log(userData);
    var projection = {
      _id:0,
      __v:0
    };
    UserModel.findOne({id:userData.id},projection, function (err, result) {
      if(err) throw err;
        console.log("User model find");
      if(result!=null){
        console.log("exists");
      }else {
        console.log("creating new");
        var user = new UserModel({
          id: userData.id,
          username: userData.nickname,
          email: "",
          image_url: "",
          score: 0,
          rankingId: "0"
        });

        console.log(user);

        user.save(function(err,result){
          if(err) throw err;

          console.log(result);
        });
      }
    });
  }
  console.log(req.url);

  if(route==null){
    res.status(200).send('OK');
  }else{
    res.redirect(route);
  }
});
/* GET READ REQUESTS NON AUTH */
/**
 * GET /users
 * */
router.get('/users', requiresLogin, requiresRole('admin'), function(req, res, next) {
    var projection = {
      _id: 0,
      __v: 0
    };
    UserModel.find({},projection, function (err, result) {
      if(err) throw err;

      if(result[0]!=null){
        res.status(200).json(result);
      }else{
        res.status(200).json([]);
      }
    });
});
/**
 * */
router.get('/user',requiresLogin, function(req, res, next) {
  console.log(req.user);

  var id=req.user.profile.id;
  var projection = {
    _id: 0,
    __v: 0
  };
  UserModel.findOne({id:id},projection, function (err, result) {
    if(err) throw err;

    if(result!=null){
      res.status(200).json(result);
    }else{
      res.status(200).json({});
    }
  });
});
/**
 * UserModel methods??
 * Delete
 * Ban
 * Update
 *
 * */
router.get('/updateUser',requiresLogin,function(req,res){
  var id = req.query.id || req.user.profile.id;

  var appMetadata = req.user.profile._json.app_metadata || {};
  var allow=false;


  if(id == req.user.profile.id){
    allow=true;
  }else if(appMetadata.roles.indexOf('admin')!=-1){
    allow = true;
  }
  if(allow){
    UserModel.findOne({id:id},function(err,doc){
      //!!!!!
      for(var key in doc){
        doc[key]=req.query[key]||doc[key];
      }
      doc.save();
      res.status(200).send('OK');
    })
  }else{
    res.status(200).json({reqAuth:true});
  }


});
/* GET READ REQUESTS AUTH */
router.get('/achievements', requiresLogin,function(req,res,next){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end("OK");
});

router.get('/triggertitle', requiresLogin,function(req,res,next){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end("OK");
});
/* POST WRITE REQUESTS AUTH*/
router.post('/create_rank', requiresLogin,requiresRole('admin'),function(req,res,next){
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

router.post('/create_report',requiresLogin,function(req,res,next){
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
router.get('/test/registered',requiresLogin,function(req,res,next){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end("registered OK");
});
router.get('/test/admin',requiresLogin,requiresRole('adminS'),function(req,res,next){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end("admin OK");
});
module.exports = router;
