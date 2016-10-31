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
var ManagementClient = require('auth0').ManagementClient;
var management = new ManagementClient({
    token: process.env.AUTH0_API_TOKEN,
    domain: process.env.AUTH0_DOMAIN
});
/* MODELS */
var UserModel = require("../models/lukeB/UserModel");
var ReportModel = require("../models/lukeB/ReportModel");
var PlaceModel = require("../models/lukeB/PlaceModel");

const MONGO_PROJECTION = {
    _id: 0,
    __v: 0
};

/* UTILITY FUNCTIONS */
function allowKey(key) {
    var omit = [
        "id",
        "_id",
        "__v",
        "username",
        "score",
        "rankingId",
        "submitterId",
        "submitterRating"
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
/* AUTHENTICATION SETUP */
router.get("/authzero",function(req,res,next) {
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
    } else {
        var userData = req.user.profile;
        console.log(userData);

        UserModel.findOne({id: userData.id}, MONGO_PROJECTION, function (err, result) {
            if (err) throw err;
            console.log("User model find");
            if (result != null) {
                console.log("exists");
            } else {
                console.log("creating new");
                var user = new UserModel({
                    id: userData.id
                });

                console.log(user);

                user.save(function (err, result) {
                    if (err) throw err;

                    console.log(result);
                });
            }
        });
    }
    console.log(req.url);

    if (route == null) {
        res.status(200).send('OK');
    } else {
        res.redirect(route);
    }
});
router.get("/login",passport.authenticate('auth0',{failureRedirect:'/url-if-something-fails'}), function(req,res) {
    if (!req.user) {
        throw new Error('user null');
    } else {
        var userData = req.user.profile;
        //console.log(userData);

        UserModel.findOne({id: userData.id}, MONGO_PROJECTION, function (err, result) {
            if (err) throw err;
            if (result == null) {
                var user = new UserModel({
                    id: userData.id
                });
                user.save(function (err, result) {
                    if (err) throw err;
                    console.log(result);
                });
            }
        });
    }
    res.status(200).send('OK');
});
router.get('/logout',requiresLogin,function(req,res){
    req.logout();
    res.status(200).json({success:true});
});
/* DATABASE HTTP REQUESTS*/
/**
 * GET /users
 * */
router.get('/users', requiresLogin, requiresRole('admin'), function(req, res, next) {
    UserModel.find({}, MONGO_PROJECTION, function (err, result) {
        if (err) throw err;

        var response = result || [];
        res.status(200).json(response);
    });
});
/**
 * */
router.get('/user',requiresLogin, function(req, res, next) {
    var id = req.query.id || req.user.profile.id;
    var appMetadata = req.user.profile._json.app_metadata || {roles: []};

    if (id == req.user.profile.id || appMetadata.roles.indexOf("admin") != -1) {
        UserModel.findOne({id: id}, MONGO_PROJECTION, function (err, result) {
            if (err) throw err;

            var response = result || {};
            res.status(200).json(response);
        });
    } else {
        res.status(200).json({error:'Proper authorization required',reqAuth:true});
    }
});
/**
 * UserModel methods??
 * Delete
 * Ban
 * Update
 *
 * */
router.get('/updateUser',requiresLogin,function(req,res) {
    var id = req.query.id || req.user.profile.id;
    var appMetadata = req.user.profile._json.app_metadata || {roles: []};

    if (id == req.user.profile.id || appMetadata.roles.indexOf('admin') != -1) {
        UserModel.findOne({id: id}, function (err, doc) {
            if (doc != null) {
                for (var key in doc) {
                    if (key != 'id' || key != '_id' || key != '__v') {
                        doc[key] = req.query[key] || doc[key];
                    }
                }
                doc.save();
                res.status(200).json(doc);
            } else {
                res.status(200).json({error: 'No user with such id'});
            }
        });
    } else {
        res.status(200).json({error:'Proper authorization required',reqAuth:true});
    }
});

router.get('/username-available',requiresLogin,function(req,res){
    var username = req.query.username;
    if(username) {
        UserModel.findOne({username: username}, function (err, doc) {
            if (err) throw err;

            if (doc) {
                res.status(200).json({exists: true})
            } else {
                res.status(200).json({exists: false});
            }
        });
    }else{
        res.status(200).json({error:"Username not specified"});
    }
});
//distinction by user, category, location, approved,rating
router.get('/reports',function(req,res){
    var data = req.query;
    var returnResult=[];
    var limit = data.limit || 0;
    var rating = data.rating;

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

    var approved = {$ne:null};
    var flagged = {$ne:null};
    var submitterId = data.submitterId || {$ne:null};

    if(req.isAuthenticated()) {
        var appMetadata = req.user.profile._json.app_metadata || {};
        var roles = appMetadata.roles || [];
        if (roles.indexOf("admin") != -1 || roles.indexOf("advanced") != -1) {
            approved = data.approved || approved;
            flagged = data.flagged || flagged;
        }
    }
    ReportModel.find({approved:approved,submitterId:submitterId,flagged:flagged},MONGO_PROJECTION).sort({"date":-1}).limit(parseInt(limit)).exec(function(err, collection){
        if(err) throw err;
        var result = [];
        if(rating!=null) {
            for (i = 0; i < collection.length; i++) {
                if (collection[i].rating != null && rating < collection[i].rating) {
                    result.push(collection[i]);
                }
            }
        }else{
            result=collection;
        }

        if(distance&&location.long&&location.lat) {
            for (var i = 0; i < result.length; i++) {

                if(result[i].location.lat!=null&&result[i].location.long!=null) {
                    if (((location.long - result[i].location.long) * longlen) ^ 2 + ((location.lat - result[i].location.lat) * latlen) ^ 2 <= distance ^ 2) {
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
router.get('/create_report',requiresLogin,function(req,res,next) {
    var data = req.query;
    var id = mongoose.Types.ObjectId();


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
        report.approved = false;
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

});
router.get('/update-report',requiresLogin,function(req,res){
    var omitKeyes = [
        "_id",
        "__v",
        "id",
        "location.long",
        "location.lat",
        "date",
        "rating",
        "submitterRating",
        "submitterId",
        "approved",
        "votes"
    ];
    var data = req.query;
    ReportModel.findOne({id:data.id},function(err,doc) {
        if (doc.profileId != req.user.profile.id) {
            res.status(200).json({error:"Restricted Access"});
        } else {
            if (doc) {
                var pattern = new ReportModel();
                for (var key in pattern.schema.paths) {
                    if (omitKeyes.indexOf(key) == -1) {
                        doc[key] = data[key] || doc[key];
                    }
                }
                doc.save(function(err,result){
                    var returnV={}, reportPattern = new ReportModel();
                    for(var key in reportPattern.schema.paths){
                        returnV[key]=result[key];
                    }
                    res.status(200).json(returnV);
                });

            } else {
                res.status(200).json({error:"No such id"});
            }
        }
    });
});
router.get("/remove-report",requiresLogin,function(req,res){
    var data = req.query;
    var id = data.id;
    var appMetadata = req.user.profile._json.app_metadata || {};
    var adminRoles = appMetadata.roles || [];
    ReportModel.findOne({id:id},{"submitterId":1},function(err,doc) {
        if (doc.submitterId == req.user.profile.id || adminRoles.indexOf("admin")!=-1) {
            ReportModel.find({id: id}).remove(function (err, item) {
                if (err) throw err;

                if (item.result.n != 0) {
                    res.status(200).json({success:"Removed " + item.result.n + " items"});
                } else {
                    res.status(200).json({error:"No report with such id"});
                }
            });
        }else{
            res.status(200).json({error:"Restricted Access"});
        }
    });
});
router.get("/approve-report",requiresLogin,requiresRole("admin"),function(req,res) {
    var data = req.query;
    var id = data.id;
    ReportModel.findOne({id: id}, function (err, doc) {
        if (err) throw err;
        if(doc) {
            doc.approved = true;
            doc.save(function(err,result){
                if(err) throw err;
                res.status(200).json({success:true});
            });
        }else{
            res.status(200).json({error:"No report with such id"});
        }
    });
});
router.get("/add-role",requiresLogin,requiresRole("admin"),function(req,res) {
    var data = req.query;
    var userId = data.userid;
    var role = data.role;
    var rolesArr;
    var appMetadata = req.user.profile._json.app_metadata || {};
    var adminRoles = appMetadata.roles || [];

    if (role != "superadmin" && (role != "admin" || adminRoles.indexOf("superadmin") != -1)) {
        management.users.get({id: userId}, function (err, user) {
            if (err) {
                res.status(200).json({error:"Invalid user id"});
            } else {
                rolesArr = user.app_metadata.roles || [];

                if (rolesArr.indexOf(role) == -1 && role != null) {
                    rolesArr.push(role);
                }

                var metadata = {
                    roles: rolesArr
                };

                management.users.updateAppMetadata({id: userId}, metadata, function (err, user) {
                    if (err) console.log(err);
                    res.status(200).json({success:true});
                });
            }
        });
    } else {
        res.status(200).json({error:"Restricted access"});
    }
});
router.get("/remove-role",requiresLogin,requiresRole("admin"),function(req,res) {
    var data = req.query;
    var userId = data.userid;
    var role = data.role;
    var roles = [];
    var appMetadata = req.user.profile._json.app_metadata || {};
    var adminRoles = appMetadata.roles || [];

    if(role!="superadmin"&&(role!="admin"||adminRoles.indexOf("superadmin") != -1)) {
        management.users.get({id: userId}, function (err, user) {
            if (err) {
                res.status(200).json({error:"Invalid user id"});
            } else {
                roles = user.app_metadata.roles;
                if (roles.indexOf(role) != -1 && role != null) {
                    roles.splice(roles.indexOf(role), 1);
                }

                var metadata = {
                    roles: roles
                };

                management.users.updateAppMetadata({id: userId}, metadata, function (err, user) {
                    if (err) console.log(err);
                    res.status(200).json({success:"OK"});
                });
            }
        });
    }else{
        res.status(200).json({error:"Restricted access"});
    }
});
router.get("/user-roles",requiresLogin,function(req,res){
    var data = req.query;
    var userId = data.id ||req.user.profile.id;
    var appMetadata = req.user.profile._json.app_metadata || {};
    var adminRoles = appMetadata.roles || [];

    if(userId==req.user.profile.id || adminRoles.indexOf("admin")!=-1) {
        management.users.get({id: userId}, function (err, user) {
            if (err) {
                res.status(200).json({error: "Invalid user id"});
            } else {
                res.status(200).json(user.app_metadata.roles);
            }
        });
    }else{
        res.status(200).json({error:'Proper authorization required',auth:true});
    }
});
router.get('/is-admin',requiresLogin,requiresRole("admin"),function(req,res){
    res.status(200).json({success:true});
});
router.get('/is-advanced',requiresLogin,requiresRole("advanced"),function(req,res){
    res.status(200).json({success:true});
});
/* BAN UNBAN */
router.get("/ban",requiresLogin,requiresRole("admin"),function(req,res) {
    var data = req.query;
    var id = data.id;
    var rolesArr;

    management.users.get({id: id}, function (err, user) {
        if (err) {
            res.status(200).json({error: "Invalid user id"});
        } else {
            rolesArr = user.app_metadata.roles || [];

            if (rolesArr.indexOf("ban") == -1) {
                rolesArr.push("ban");
            }

            var metadata = {
                roles: rolesArr
            };

            management.users.updateAppMetadata({id: id}, metadata, function (err, user) {
                if (err) console.log(err);
                res.status(200).json({success: true});
            });
        }
    });
});
router.get("/unban",requiresLogin,requiresRole("admin"),function(req,res) {
    var data = req.query;
    var id = data.id;
    var roles;

    management.users.get({id: id}, function (err, user) {
        if (err) {
            res.status(200).json({error: "Invalid user id"});
        } else {
            roles = user.app_metadata.roles;
            if (roles.indexOf("ban") != -1) {
                roles.splice(roles.indexOf("ban"), 1);
            }

            var metadata = {
                roles: roles
            };

            management.users.updateAppMetadata({id: id}, metadata, function (err, user) {
                if (err) console.log(err);
                res.status(200).json({success: true});
            });
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
