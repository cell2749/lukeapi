var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var mongodb = require('../../mongodb/lukeAdb');
/* SECURITY */
var requiresLogin = require('../../security/requiresLogin');
var requiresRole = require('../../security/requiresRole');
var requiresRoles = require('../../security/requiresRoles');
var restrictBanned = require('../../security/restrictBanned');

/* MODELS */
var UserModel = require("../../models/lukeA/UserModel");
var ReportModel = require("../../models/lukeA/ReportModel");
var RankModel = require("../../models/lukeA/RankModel");
var ReportCategoryModel = require("../../models/lukeA/ReportCategoryModel");
var VoteModel = require("../../models/lukeA/VoteModel");
var ExperienceModel = require("../../models/lukeA/ExperienceModel");
/* ROUTES */
var user = require('./routes/user');
var report = require('./routes/report');
var rank = require('./routes/rank');
var category = require('./routes/category');
var experience = require('./routes/experience');

const MONGO_PROJECTION ={
    _id: 0,
    __v: 0
};
/* DATABASE HTTP REQUESTS*/
router.use('/user',user);
router.use('/rank',rank);
router.use("/category",category);
router.use("/report",report);
router.use('/experience-pattern', experience);

/* AUTHENTICATION SETUP */
router.get("/authzero",function(req,res,next){
  var lockSetup = {
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL_DEVELOPMENT_A
  };
  res.status(200).json(lockSetup);
});
router.get('/callback',passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }), function(req, res) {
  var route = req.query.route;

  if (!req.user) {
    throw new Error('user null');
  }else{
    var userData = req.user.profile;
    //console.log(userData);

    UserModel.findOne({id:userData.id},MONGO_PROJECTION, function (err, result) {
      if(err) throw err;
        //console.log("User model find");
      if(result!=null){
        //console.log("exists");
      }else {
        //console.log("creating new");
        var user = new UserModel({
          id: userData.id,
          score: 0,
          rankingId: "0"
        });

        //console.log(user);

        user.save(function(err,result){
          if(err) throw err;

          console.log(result);
        });
      }
    });
  }
  //console.log(req.url);

  if(route==null){
    res.status(200).send("OK");
  }else{
    res.redirect(route);
  }
});
router.get("/login",passport.authenticate('auth0',{failureRedirect:'/url-if-something-fails'}), function(req,res){
    if (!req.user) {
        throw new Error('user null');
    }else{
        var userData = req.user.profile;
        //console.log(userData);

        UserModel.findOne({id:userData.id},MONGO_PROJECTION, function (err, result) {
            if(err) throw err;
            if(result==null){
                var user = new UserModel({
                    id: userData.id,
                    score: 0,
                    rankingId: "0"
                });
                user.save(function(err,result){
                    if(err) throw err;
                    console.log(result);
                });
            }
        });
    }
    res.status(200).send("OK");
});
router.get('/logout',requiresLogin,function(req,res){
    req.logout();
    res.status(200).json({success:true});
});

/* SECURITY TESTS */
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
