/**
 * Created by nikitak on 1.11.2016.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongodb = require('../../../mongodb/lukeAdb');
var fs = require
/* SECURITY */
var requiresLogin = require('../../../security/requiresLogin');
var requiresRole = require('../../../security/requiresRole');
var requiresRoles = require('../../../security/requiresRoles');
var requiresOneOfRoles = require('../../../security/requiresOneOfRoles');
var restrictBanned = require('../../../security/restrictBanned');
var jwtCheck = require('../../../security/jwtCheck');
var authConverter = require('../../../security/authConverter');
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
    "image_url",
    "rankingId",
    "submitterId",
    "submitterRating"
]);
const MONGO_PROJECTION ={
    _id: 0,
    __v: 0
};
/**
 * @api {get} /lukeA/user/get-all Get all users
 * @apiName GetUsers
 * @apiGroup User
 *
 * @apiSuccess {String} id Id of the User.
 * @apiSuccess {String} username Username of the User.
 * @apiSuccess {String} image_url Url of the image that User uses.
 * @apiSuccess {Number} score Experience of the User.
 * @apiSuccess {String} rankingId Id of a rank that the User has.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200
 *      [{
 *          id:String,
 *          username:String,
 *          image_url:String,
 *          score: Number,
 *          rankingId: String
 *      }]
 *
 * @apiDescription
 * Returns array of json objects containing user information.
 *
 * @apiUse error
 * @apiUse loginError
 *
 */
router.get('/get-all', jwtCheck,authConverter, function(req, res, next) {
    Utility.get(UserModel,null,res);
});
/**
 * @api {get} /lukeA/user Get user
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {String} [id] Users unique ID.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1
 *      {
 *          id:String,
 *          username:String,
 *          image_url:String,
 *          score: Number,
 *          rankingId: String
 *      }
 *
 * @apiSuccess {String} id Id of the User.
 * @apiSuccess {String} username Username of the User.
 * @apiSuccess {String} image_url Url of the image that User uses.
 * @apiSuccess {Number} score Experience of the User.
 * @apiSuccess {String} rankingId Id of a rank that the User has.
 *
 * @apiDescription
 * Id is optional. If id not specified then function returns the users own information.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeA/user?id=auth0|21jeh192he921e2121
 *
 * @apiErrorExample Wrong id:
 *      HTTP/1.1 404
 *      {
 *          error:"No user with such id"
 *      }
 * @apiUse error
 * @apiUse loginError
 * @apiUse noUser
 */
router.get('/',jwtCheck,authConverter, function(req, res, next) {
    var id = req.query.id || req.user.profile.id;

    UserModel.findOne({id: id}, MONGO_PROJECTION, function (err, result) {
        if (err) throw err;

        if (result) {
            var response = result;
            res.status(200).json(response);
        } else {
            res.status(404).json({error: "No user with such id"});
        }
    });
});
/**
 * @api {post} /lukeA/user/update Update user
 * @apiName UpdateUser
 * @apiGroup User
 *
 * @apiParam {File} [image] Image file that needs to be updated/uploaded
 * @apiParam (Parameters Forbidden for Update) {String} [id] Users unique ID. For admin.
 * @apiParam (Parameters Forbidden for Update) {String} [username] Username of the User.
 * @apiParam (Parameters Forbidden for Update) {String} [image_url] URL to the image that the user is using
 * @apiParam (Parameters Forbidden for Update) {Number} [score] Experience of the User.
 * @apiParam (Parameters Forbidden for Update) {String} [rankingId] Id of a rank that the User has.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200
 *      {
 *          success:Boolean
 *      }
 *
 * @apiSuccess {Boolean} success If true, then at least one of the specified parameters was updated
 *
 * @apiDescription
 * <strong>Currently user can't update any of his own parameters.</strong>
 * Update function available for user to update his own profile. Id is optional.
 * If id is specified and doesn't belong to the user, the user is checked for admin rights.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeA/user/update?id=auth0|21jeh192he921e2121&username=JohnDoe
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse authError
 * @apiUse noUser
 */
router.post('/update',jwtCheck,authConverter,function(req,res) {
    var data = req.body;
    var id = data.id || req.user.profile.id;
    var appMetadata = req.user.profile._json.app_metadata || {roles: []};

    if (id == req.user.profile.id || appMetadata.roles.indexOf('admin') != -1) {
        UserModel.findOne({id: id}, function (err, doc) {
            if (doc != null) {
                var userPattern = new UserModel();
                var success = false;
                for (var key in userPattern.schema.paths) {
                    if (Utility.allowKey(key)) {
                        doc[key] = data[key] || doc[key];
                        success = true;
                    }
                }
                doc.image_url = Utility.saveImage(req,"lukeA/user/",doc.id);
                doc.save(function(err,result){
                    if(err) throw err;
                    res.status(200).json({success:success});
                });

            } else {
                res.status(404).json({error: 'No user with such id'});
            }
        });
    } else {
        res.status(401).json({error: 'Proper authorization required', auth: true});
    }
});
/**
 * @api {get} /lukeA/user/available Check for username
 * @apiName AvailableUser
 * @apiGroup User
 *
 * @apiParam {String} username Username that user wants.
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          exists:Boolean
 *      }
 *
 * @apiSuccess {Boolean} exists If true, then username is already taken.
 *
 * @apiDescription
 * Checks for Username availability
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeA/user/available?username=JohnDoe
 *
 * @apiUse error
 * @apiUse loginError
 * @apiErrorExample Missing Username:
 *      HTTP/1.1 422
 *      {
 *          error:"Username not specified"
 *      }
 */
router.get('/available',jwtCheck,authConverter,function(req,res){
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
        res.status(422).json({error:"Username not specified"});
    }
});
/**
 * @api {get} /lukeA/user/set-username Set username
 * @apiName SetUsername
 * @apiGroup User
 *
 * @apiParam {String} username Username that user wants.
 * @apiParam {String} [id] Id of a User. For admin.
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          success: true
 *      }
 *
 * @apiSuccess {Boolean} success If true, the username was set successfully
 *
 * @apiDescription
 * User can set a username if one is available and he doesn't have it yet.
 * Admin can set his own and other users usernames, if the specified username is available.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeA/user/set-username?username=JohnDoe
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse authError
 * @apiErrorExample Missing Username:
 *      HTTP/1.1 422
 *      {
 *          error:"Username not specified"
 *      }
 * @apiErrorExample Username un-available:
 *      HTTP/1.1 422
 *      {
 *          error:"Username already exists"
 *      }
 * @apiErrorExample Username already set:
 *      HTTP/1.1 422
 *      {
 *          error:"Cannot modify existing value",
 *          auth: true
 *      }
 * @apiUse specialAdmin
 */
router.get('/set-username',jwtCheck,authConverter,function(req,res) {
    var id = req.query.id || req.user.profile.id;
    var username = req.query.username;
    var appMetadata = req.user.profile._json.app_metadata || {};
    var roles = appMetadata.roles || [];
    if (id != req.user.profile.id && roles.indexOf("admin") == -1) {
        res.status(401).json({error: 'Proper authorization required', auth: true});
    } else {
        if (username) {
            UserModel.findOne({username: username}, function (err, doc) {
                if (err) throw err;

                if (doc) {
                    res.status(422).json({error: "Username already exists"});
                } else {
                    UserModel.findOne({id: id}, function (err, doc) {
                        if (err) throw err;

                        if (doc.username && roles.indexOf("admin") == -1) {
                            res.status(401).json({error: "Cannot modify existing value.", auth: true});
                        } else {
                            doc.username = username;
                            doc.save(function (err, result) {
                                if (err)throw err;
                                res.status(200).json({success: true});
                            });

                        }
                    });
                }
            });
        } else {
            res.status(422).json({error: "Username not specified"});
        }
    }
});
/*router.get("/copy-profile",jwtCheck,authConverter,function(req,res) {
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
});*/
/**
 * @api {get} /lukeA/user/add-role Add role
 * @apiName AddRole
 * @apiGroup User
 *
 * @apiParam {String} role Role that user needs.
 * @apiParam {String} id Id of a User
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          success: true
 *      }
 *
 * @apiSuccess {Boolean} success If true, role was added successfully
 *
 * @apiDescription
 * Adds role to a user if the role is not 'superadmin'. Addition of 'admin' requires superadmin rights.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeA/user/add-role?id=auth0|ej21oje10e212oe12&role=advanced
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse authError
 * @apiErrorExample Missing role:
 *      HTTP/1.1 422
 *      {
 *          error:"Role not specified"
 *      }
 * @apiErrorExample Invalid user id:
 *      HTTP/1.1 404
 *      {
 *          error:"Invalid user id"
 *      }
 * @apiUse roleSuper
 * @apiUse roleAdmin
 */
router.get("/add-role",jwtCheck,authConverter,requiresOneOfRoles(["admin","superadmin"]),function(req,res) {
    var data = req.query;
    var userId = data.id;
    var role = data.role;
    var rolesArr;
    var appMetadata = req.user.profile._json.app_metadata || {};
    var adminRoles = appMetadata.roles || [];
    if(role!=null) {
        if (role != "superadmin" && (role != "admin" || adminRoles.indexOf("superadmin") != -1)) {
            management.users.get({id: userId}, function (err, user) {
                if (err) {
                    res.status(404).json({error: "Invalid user id"});
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
                        res.status(200).json({success: true});
                    });
                }
            });
        } else {
            res.status(401).json({error: 'Proper authorization required', auth: true});
        }
    }else{
        res.status(422).json({error: 'Role not specified'});
    }
});
/**
 * @api {get} /lukeA/user/remove-role Remove role
 * @apiName RemoveRole
 * @apiGroup User
 *
 * @apiParam {String} role Role that needs to be removed from user
 * @apiParam {String} id Id of a User
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          success: true
 *      }
 *
 * @apiSuccess {Boolean} success If true, role was removed successfully
 *
 * @apiDescription
 * Removes role from a user if the role is not 'superadmin'. Removing of 'admin' requires superadmin rights.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeA/user/remove-role?id=auth0|ej21oje10e212oe12&role=advanced
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse authError
 * @apiErrorExample Missing role:
 *      HTTP/1.1 422
 *      {
 *          error:"Role not specified"
 *      }
 * @apiErrorExample Invalid user id:
 *      HTTP/1.1 404
 *      {
 *          error:"Invalid user id"
 *      }
 * @apiUse roleAdmin
 * @apiUse roleSuper
 */
router.get("/remove-role",jwtCheck,authConverter,requiresOneOfRoles(["admin","superadmin"]),function(req,res) {
    var data = req.query;
    var userId = data.id;
    var role = data.role;
    var roles = [];
    var appMetadata = req.user.profile._json.app_metadata || {};
    var adminRoles = appMetadata.roles || [];
    if (role != null) {
        if (role != "superadmin" && (role != "admin" || adminRoles.indexOf("superadmin") != -1)) {
            management.users.get({id: userId}, function (err, user) {
                if (err) {
                    res.status(200).json({error: "Invalid user id"});
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
                        res.status(200).json({success: true});
                    });
                }
            });
        } else {
            res.status(200).json({error: 'Proper authorization required', auth: true});
        }
    } else {
        res.status(422).json({error: 'Role not specified'});
    }
});
/**
 * @api {get} /lukeA/user/roles Get roles
 * @apiName GetRoles
 * @apiGroup User
 *
 * @apiParam {String} [id] Id of a User
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      [
 *          String
 *      ]
 *
 * @apiSuccess {array} array Contains the roles of specified user
 *
 * @apiDescription
 * Returns array of Strings, that are roles for the specified user (Admin only).
 * If id was not specified the users' own roles are returned.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeA/user/roles?id=auth0|ej21oje10e212oe12
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse authError
 * @apiErrorExample Invalid user id:
 *      HTTP/1.1 404
 *      {
 *          error:"Invalid user id"
 *      }
 * @apiUse specialAdmin
 */
router.get("/roles",jwtCheck,authConverter,function(req,res){
    var data = req.query;
    var userId = data.id||req.user.profile.id;
    var appMetadata = req.user.profile._json.app_metadata || {};
    var adminRoles = appMetadata.roles || [];

    if(userId==req.user.profile.id || adminRoles.indexOf("admin")!=-1) {
        management.users.get({id: userId}, function (err, user) {
            if (err) {
                res.status(404).json({error: "Invalid user id"});
            } else {
                var result = user.app_metadata.roles||[];
                res.status(200).json(result);
            }
        });
    }else{
        res.status(401).json({error:'Proper authorization required',auth:true});
    }
});
/**
 * @api {get} /lukeA/user/is-admin Is Admin
 * @apiName IsAdmin
 * @apiGroup User
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          success: true
 *      }
 *
 * @apiSuccess {Boolean} success If true, user is admin
 *
 * @apiDescription
 * Checks if user is admin. Used for gui manipulation.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeA/user/is-admin
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse authError
 * @apiUse roleAdmin
 */
router.get('/is-admin',jwtCheck,authConverter,requiresRole("admin"),function(req,res){
    res.status(200).json({success:true});
});
/**
 * @api {get} /lukeA/user/is-advanced Is Advanced
 * @apiName IsAdvanced
 * @apiGroup User
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          success: true
 *      }
 *
 * @apiSuccess {Boolean} success If true, user is advanced
 *
 * @apiDescription
 * Checks if user is advanced. Used for gui manipulation.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeA/user/is-advanced
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse authError
 * @apiUse roleAdv
 */
router.get('/is-advanced',jwtCheck,authConverter,requiresRole("advanced"),function(req,res){
    res.status(200).json({success:true});
});
/**
 * @api {get} /lukeA/user/ban Ban
 * @apiName Ban
 * @apiGroup User
 *
 * @apiParam {String} id Id of a User
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          success: true
 *      }
 *
 * @apiSuccess {Boolean} success If true, user was banned successfully
 *
 * @apiDescription
 * Bans user with specified id.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeA/user/ban?id=auth0|ej21oje10e212oe12
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse authError
 * @apiErrorExample Invalid user id:
 *      HTTP/1.1 404
 *      {
 *          error:"Invalid user id"
 *      }
 * @apiUse roleAdmin
 */
router.get("/ban",jwtCheck,authConverter,requiresRole("admin"),function(req,res) {
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
/**
 * @api {get} /lukeA/user/unban Unban
 * @apiName Unban
 * @apiGroup User
 *
 * @apiParam {String} id Id of a User
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          success: true
 *      }
 *
 * @apiSuccess {Boolean} success If true, user was un-banned successfully
 *
 * @apiDescription
 * Unbans user with specified id.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeA/user/ban?id=auth0|ej21oje10e212oe12
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse authError
 * @apiErrorExample Invalid user id:
 *      HTTP/1.1 404
 *      {
 *          error:"Invalid user id"
 *      }
 *
 * @apiUse roleAdmin
 */
router.get("/unban",jwtCheck,authConverter,requiresRole("admin"),function(req,res) {
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
/**
 * @api {post} /lukeA/user/upload-default-image Upload default image
 * @apiName UploadDefaultImage
 * @apiGroup User
 *
 * @apiParam {File} image Image file to be used as default image
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200
 *      {
 *          success: true
 *      }
 *
 * @apiSuccess {Boolean} success If true, upload was successful
 *
 * @apiDescription
 * Uploads default image for the user to view.
 *
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse authError
 * @apiErrorExample Fail:
 *      HTTP/1.1 500
 *      {
 *          error:"Image upload failed"
 *      }
 * @apiErrorExample Missing name:
 *      HTTP/1.1 422
 *      {
 *          error:"Missing name"
 *      }
 *
 * @apiUse roleAdmin
 * @apiUse roleSuper
 */
router.post("/upload-default-image",jwtCheck,authConverter,requiresOneOfRoles(["admin","superadmin"]),function(req,res){
   var name = req.body.image_name;
    if(name!=null) {
        if (Utility.saveImage(req, "lukeA/user/default/", name) != null) {
            res.status(200).json({success: true});
        } else {
            res.status(500).json({error: "Image upload failed"});
        }
    }else{
        res.status(422).json({error:"Missing name"});
    }
});
/**
 * @api {get} /lukeA/user/delete-default-image Delete default image
 * @apiName DeleteDefaultImage
 * @apiGroup User
 *
 * @apiParam {String} image_url Image url to be deleted
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200
 *      {
 *          success: true
 *      }
 *
 * @apiSuccess {Boolean} success If true, deletion was successful
 *
 * @apiDescription
 * Deletes default image from defaults.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeA/user/delete-default-image?image_url='http://www.balticapp.fi/images/lukeA/user/default/doggy.jpg'
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse authError
 * @apiErrorExample Fail:
 *      HTTP/1.1 500
 *      {
 *          error:"Image deletion failed"
 *      }
 * @apiErrorExample Missing/Incorrect url:
 *      HTTP/1.1 422
 *      {
 *          error:"Missing/Incorrect url"
 *      }
 *
 * @apiUse roleAdmin
 * @apiUse roleSuper
 */
router.get("/delete-default-image",jwtCheck,authConverter,requiresOneOfRoles(["admin","superadmin"]),function(req,res){
    var image_url = req.query.image_url;
    if(image_url!=null&&image_url.indexOf("user/default")!=-1) {
        if (Utility.deleteImage(image_url) != null) {
            res.status(200).json({success: true});
        } else {
            res.status(500).json({error: "Image deletion failed"});
        }
    }else{
        res.status(422).json({error:"Missing/Incorrect url"});
    }
});
/**
 * @api {get} /images/lukeA/user/default
 * @apiName GetImages
 * @apiGroup User
 *
 * @apiDescription
 * Location of default user images. Access unique image by name.
 *
 * @apiExample Example image_url:
 * http://balticapp.fi/images/lukeA/user/default/redTomato.jpg
 */
module.exports = router;