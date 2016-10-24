var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var mongodb = require('../mongodb/lukeAdb');
var http = require("http");
/* SECURITY */
var requiresLogin = require('../security/requiresLogin');
var requiresRole = require('../security/requiresRole');
var requiresRoles = require('../security/requiresRoles');
var ManagementClient = require('auth0').ManagementClient;
var management = new ManagementClient({
    token: process.env.AUTH0_API_TOKEN,
    domain: process.env.AUTH0_DOMAIN
});
/* MODELS */
var UserModel = require("../models/lukeA/UserModel");
var ReportModel = require("../models/lukeA/ReportModel");
var RankModel = require("../models/lukeA/RankModel");
var ReportCategoryModel = require("../models/lukeA/ReportCategoryModel");
var VoteModel = require("../models/lukeA/VoteModel");

const REPORT_SCORE_VALUE = 100;
const MONGO_PROJECTION ={
    _id: 0,
    __v: 0
};

/* UTILITY FUNCTION*/
function allowKey(key){
    var omit= [
        "id",
        "_id",
        "__v",
        "username",
        "score",
        "rankingId",
        "submitterId",
        "submitterRating"
    ];
    for(var i = 0;i<omit.length;i++){
        if(omit[i]==key){
            return false;
        }
    }
    return true;
}
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
    console.log(userData);

    UserModel.findOne({id:userData.id},MONGO_PROJECTION, function (err, result) {
      if(err) throw err;
        console.log("User model find");
      if(result!=null){
        console.log("exists");
      }else {
        console.log("creating new");
        var user = new UserModel({
          id: userData.id,
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
  //console.log(req.url);

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
          if (allowKey(key)) {
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
router.get('/available',requiresLogin,function(req,res){
    var username = req.query.username;
    UserModel.findOne({username:username},function(err,doc){
        if(err) throw err;

        if(doc) {
            res.status(200).json({exists: true})
        }else {
            res.status(200).json({exists: false});
        }
    });
});
router.get('/set_username',requiresLogin,function(req,res){
    var username = req.query.username;
    UserModel.findOne({id:req.user.profile.id},function(err,doc){
        if(err) throw err;
        if(doc.username){
            res.status(200).send("Cannot modify existing value.");
        }else{
            doc.username = username;
            doc.save();
            res.status(200).send("OK");
        }
    });


});
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
  res.status(200).send("Achievement unlocked: View response of unimplemented feature!");
});

/* POST WRITE REQUESTS AUTH*/
router.post('/create_rank', requiresLogin,requiresRole('admin'),function(req,res,next){
  var data = req.body;
  var id = mongoose.Types.ObjectId();

  if(data.title != null) {
      var rank = new RankModel();
      for (var key in rank) {
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
router.get('/create_report_category',requiresLogin,requiresRole('admin'),function(req,res){
    var data = req.query;
    var id = mongoose.Types.ObjectId();
    ReportCategoryModel.findOne({name:data.name},function(err,doc){
        if(doc){
            res.status(200).json({error:"Reprot Category with such name already exists!"});
        }else {
            var reportCategory = new ReportCategoryModel();
            for (var key in reportCategory) {
                if (allowKey(key)) {
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

});
function deg2rad(deg){
    return deg*Math.PI/180;
}
router.get('/reports',function(req,res){
    var data = req.query;
    var returnResult=[];
    var limit = data.limit || 0;

    //deg2rad might not be necessary
    var location = {
        long : deg2rad(data.long),
        lat : deg2rad(data.lat)
    };
    var distance = data.distance || 5000;

    // Set up "Constants"
    const m1 = 111132.92;		// latitude calculation term 1
    const m2 = -559.82;		// latitude calculation term 2
    const m3 = 1.175;			// latitude calculation term 3
    const m4 = -0.0023;		// latitude calculation term 4
    const p1 = 111412.84;		// longitude calculation term 1
    const p2 = -93.5;			// longitude calculation term 2
    const p3 = 0.118;			// longitude calculation term 3

    var latlen = m1 + (m2 * Math.cos(2 * location.lat)) + (m3 * Math.cos(4 * location.lat)) +
        (m4 * Math.cos(6 * location.lat));
    var longlen = (p1 * Math.cos(location.lat)) + (p2 * Math.cos(3 * location.lat)) +
        (p3 * Math.cos(5 * location.lat));

    var approved=true;
    if(req.isAuthenticated()) {
        var appMetadata = req.user.profile._json.app_metadata || {};
        var roles = appMetadata.roles || [];
        if (roles.indexOf("admin") != -1 || roles.indexOf("advanced") != -1) {
            approved = data.approved || true;
        }
    }
    //var rating;
    //distinction by user, category, location, approved,rating
    ReportModel.find({categoryId:data.categoryId,approved:approved,submitterId:data.userid},MONGO_PROJECTION).sort({"date":-1}).limit(parseInt(limit)).exec(function(err, result){
        if(err) throw err;


        if(distance&&location.long&&location.lat) {
            for (var i = 0; i < result.length; i++) {

                if(result[i].latitude!=null&&result[i].longitude!=null) {
                    if (((location.long - result[i].longitude) * longlen) ^ 2 + ((location.lat - result[i].latitude) * latlen) ^ 2 <= distance ^ 2) {
                        returnResult.push(result);
                    }
                }
                if(i==result.length-1){
                    res.status(200).json(returnResult);
                }
                //might require improvement right here
            }

        }else {

            res.status(200).json(result);
        }
    });
});

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
            if(report.id == null) {
                report.id = id;
            }
            report.approved = false;
            doc.save();
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
router.get("/approve_report",requiresLogin,requiresRole("admin"),function(req,res){
    var data = req.query;
    var id = data.id;
    ReportModel.findOne({id:id},function(err,doc){
        if(err) throw err;

        doc.approved=true;
        doc.save();

        res.status(200).send("OK");
    });
});

router.get("/add_role",requiresLogin,requiresRole("admin"),function(req,res){
    var data = req.query;
    var userId = data.userid;
    var role = data.role;
    var rolesArr;

    management.users.get({id:userId},function(err,user) {
        if (err) {
            res.status(200).send("Invalid user id");
        } else {

            rolesArr = user.app_metadata.roles || [];

            if (rolesArr.indexOf(role) == -1 && role != null) {
                rolesArr.push(role);
            }
            console.log(rolesArr);
            //var params = { id: userId };
            var metadata = {
                roles: rolesArr
            };

            management.users.updateAppMetadata({id: userId}, metadata, function (err, user) {
                if (err) console.log(err);
                console.log(user.app_metadata.roles);
            });

            res.status(200).send("OK");
        }
    });
});
router.get("/remove_role",requiresLogin,requiresRole("admin"),function(req,res) {
    var data = req.query;
    var userId = data.userid;
    var role = data.role;
    var roles = [];

    management.users.get({id: userId}, function (err, user) {
        if (err) {
            res.status(200).send("Invalid user id");
        } else {
            roles = user.app_metadata.roles;
            if (roles.indexOf(role) != -1) {
                roles.splice(roles.indexOf(role), 1);
            }

            var metadata = {
                roles: roles
            };

            management.users.updateAppMetadata({id: userId}, metadata, function (err, user) {
                if (err) console.log(err);
                console.log(user.app_metadata.roles);
            });

            res.status(200).send("OK");
        }
    });
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
