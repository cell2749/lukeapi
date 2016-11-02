/**
 * Created by nikitak on 1.11.2016.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongodb = require('../../../mongodb/lukeAdb');
/* SECURITY */
var requiresLogin = require('../../../security/requiresLogin');
var requiresRole = require('../../../security/requiresRole');
var requiresRoles = require('../../../security/requiresRoles');
var restrictBanned = require('../../../security/restrictBanned');
var ManagementClient = require('auth0').ManagementClient;
var management = new ManagementClient({
    token: process.env.AUTH0_API_TOKEN,
    domain: process.env.AUTH0_DOMAIN
});
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

router.get('/get-all', requiresLogin, requiresRole('admin'), function(req, res, next) {
    UserModel.find({},MONGO_PROJECTION, function (err, result) {
        if(err) throw err;

        var response = result || [];
        res.status(200).json(response);
    });
});
/**
 * */
router.get('/',requiresLogin, function(req, res, next) {
    var id=req.query.id || req.user.profile.id;
    var appMetadata = req.user.profile._json.app_metadata || {roles:[]};

    if(id == req.user.profile.id || appMetadata.roles.indexOf("admin")!=-1) {
        UserModel.findOne({id: id}, MONGO_PROJECTION, function (err, result) {
            if (err) throw err;

            var response = result || {};
            res.status(200).json(response);
        });
    }else{
        res.status(200).json({error:'Proper authorization required',auth:true});
    }
});
/**
 * UserModel methods??
 * Delete
 * Ban
 * Update
 *
 * */
router.get('/update',requiresLogin,function(req,res) {
    var id = req.query.id || req.user.profile.id;
    var appMetadata = req.user.profile._json.app_metadata || {roles: []};

    if (id == req.user.profile.id || appMetadata.roles.indexOf('admin') != -1) {
        UserModel.findOne({id: id}, function (err, doc) {
            if (doc != null) {
                var userPattern = new UserModel();
                for (var key in userPattern.schema.paths) {
                    if (Utility.allowKey(key)) {
                        doc[key] = req.query[key] || doc[key];
                    }
                }
                doc.save(function(err,result){
                    if(err) throw err;
                    res.status(200).json(result);
                });

            } else {
                res.status(200).json({error: 'No user with such id'});
            }
        });
    } else {
        res.status(200).json({error: 'Proper authorization required', auth: true});
    }
});
router.get('/available',requiresLogin,function(req,res){
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
router.get('/set-username',requiresLogin,function(req,res){
    var username = req.query.username;
    UserModel.findOne({id:req.user.profile.id},function(err,doc){
        if(err) throw err;
        if(doc.username){
            res.status(200).json({error:"Cannot modify existing value."});
        }else{
            doc.username = username;
            doc.save();
            res.status(200).json({success:true});
        }
    });
});
router.get("/copy-profile",requiresLogin,function(req,res) {
    var data = req.user.profile;
    var profile = {
        image_url: data.picture,
        provider: data.provider,
        link: data._json.link
    };
    console.log(data);
    console.log("WOW / ");
    console.log(data.picture);
    console.log(data.provider);
    console.log(data._json.link);
    res.status(200).json(profile);
});
router.get("/add-role",requiresLogin,requiresRole("admin"),function(req,res) {
    var data = req.query;
    var userId = data.id;
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
        res.status(200).json({error:'Proper authorization required',auth:true});
    }
});
router.get("/remove-role",requiresLogin,requiresRole("admin"),function(req,res) {
    var data = req.query;
    var userId = data.id;
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
                    res.status(200).json({success:true});
                });
            }
        });
    }else{
        res.status(200).json({error:'Proper authorization required',auth:true});
    }
});
router.get("/user-roles",requiresLogin,function(req,res){
    var data = req.query;
    var userId = data.id||req.user.profile.id;
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
/* BAN/UNBAN */
router.get("/ban",requiresLogin,requiresRole("admin"),function(req,res) {
    var data = req.query;
    var id = data.id;
    var rolesArr;

    management.users.get({id: id}, function (err, user) {
        if (err) {
            res.status(200).json({error: "Invalid user id"});
        } else {
            rolesArr = user.app_metadata.roles || [];

            if (rolesArr.indexOf("ban") == -1 && rolesArr.indexOf("admin")==-1 && rolesArr.indexOf("superadmin")==-1) {
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
module.exports = router;