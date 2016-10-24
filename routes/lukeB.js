var express = require('express');
var router = express.Router();
var passport = require('passport');
/* SECURITY*/
var requiresLogin = require('../security/requiresLogin');
var requiresRole = require('../security/requiresRole');
var requiresRoles = require('../security/requiresRoles');
/* MODELS */
var UserModel = require("../models/lukeB/UserModel");
var ReportModel = require("../models/lukeB/ReportModel");
var PlaceModel = require("../models/lukeB/PlaceModel");

const MONGO_PROJECTION ={
  _id: 0,
  __v: 0
};
/* AUTHENTICATION SETUP */
router.get("/authzero",function(req,res,next){
  var env = {
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL_DEVELOPMENT_B
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

    UserModel.findOne({id:userData.id},MONGO_PROJECTION, function (err, result) {
      if(err) throw err;
      console.log("User model find");
      if(result!=null){
        console.log("exists");
      }else {
        console.log("creating new");
        var user = new UserModel({
          id: userData.id
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
/* USER MODEL PRIVATE*/
/**
 * GET /users
 * */
router.get('/users', requiresLogin, requiresRole('admin'), function(req, res, next) {
  UserModel.find({},MONGO_PROJECTION, function (err, result) {
    if(err) throw err;

    var response = result || [];
    res.status(200).json(response);
  });
});
/**
 * */
router.get('/user',requiresLogin, function(req, res, next) {
  var id=req.query.id || req.user.profile.id;
  var appMetadata = req.user.profile._json.app_metadata || {roles:[]};

  if(id == req.user.profile.id || appMetadata.roles.indexOf("admin")!=-1) {
    UserModel.findOne({id: id}, MONGO_PROJECTION, function (err, result) {
      if (err) throw err;

      var response = result || {};
      res.status(200).json(response);
    });
  }else{
    res.status(200).json({reqAuth:true});
  }
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
  var appMetadata = req.user.profile._json.app_metadata || {roles:[]};

  if(id == req.user.profile.id || appMetadata.roles.indexOf('admin')!=-1){
    UserModel.findOne({id:id},function(err,doc){
      if(doc!=null) {
        for (var key in doc) {
          if (key != 'id' || key != '_id' || key != '__v') {
            doc[key] = req.query[key] || doc[key];
          }
        }
        doc.save();
        res.status(200).json(doc);
      }else{
        res.status(200).json({error:'No user with such id'});
      }
    });
  }else{
    res.status(200).json({reqAuth:true});
  }
});

/**
 * *//*
router.get("",function(req,res){

});*/

router.get("/username",function(req,res){
  var username = req.query.name|| "";
  UserModel.findOne({username:username},function(err,result){
    if(result){
      res.status(200).json({taken:true});
    }else{
      res.status(200).json({taken:false});
    }
  });
});
/* ACHIEVEMENTS ?? */
router.get('/achievements', requiresLogin,function(req,res,next){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end("OK");
});

/* POST WRITE REQUESTS AUTH*/
router.get('/create_report',requiresLogin,function(req,res,next){
  var data = req.query;
  var id = mongoose.Types.ObjectId();

  if(data.title != null) {
    UserModel.findOne({id: req.user.profile.id}, function (err, doc) {
      doc.score = doc.score + REPORT_SCORE_VALUE;
      var report = new ReportModel();
      //var vote = new VoteModel();

      for (var key in report) {
        if (allowKey(key)) {
          report[key] = data[key] || report[key];
        }
      }
      if (report.date == null) {
        report.date = new Date().toISOString();
      }
      //vote.report.id = id;
      report._id = id;
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
  }else{
    res.status(200).json({error:"Missing title"});
  }
});
router.get("/remove_report",requiresLogin,requiresRole("admin"),function(req,res){
  var data = req.query;
  var id = data.id;
  ReportModel.find({id:id}).remove(function(err){
    if(err) throw err;

    res.status(200).send("OK");
  });
});
router.get("/allow_report",requiresLogin,requiresRole("admin"),function(req,res){
res.status(200).send("Hehehe. Not yet implemented.")
});


module.exports = router;
