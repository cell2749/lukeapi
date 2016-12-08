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
var jwtCheck = require('../../../security/jwtCheck');
var authConverter = require('../../../security/authConverter');
var requiresRole = require('../../../security/requiresRole');
var requiresRoles = require('../../../security/requiresRoles');
var restrictBanned = require('../../../security/restrictBanned');
var requiresOneOfRoles = require('../../../security/requiresOneOfRoles');
var ManagementClient = require('auth0').ManagementClient;
var management = new ManagementClient({
    token: process.env.AUTH0_API_TOKEN,
    domain: process.env.AUTH0_DOMAIN
});
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
    "username",
    "image_url",
    "lastOnline",
    "profileId",
    "logTimes",
    "logTimes.locationId",
    "logTimes.timeLogIn",
    "logTimes.timeLogOut",
    "logTimes.numberOfComments",
    "logTimes.numberOfRatings",
    "logTimes.numberOfReports"
]);
const MONGO_PROJECTION ={
    _id: 0,
    __v: 0
};
/**
 * @api {get} /lukeB/user/get-all Get All
 * @apiName GetAll
 * @apiGroup User
 *
 * @apiSuccess {String} id User id
 * @apiSuccess {String} username Users chosen username
 * @apiSuccess {String} email Users e-mail
 * @apiSuccess {String} image_url URL to users image
 * @apiSuccess {String} bio Users biography
 * @apiSuccess {String} location Users location (country, town or city)
 * @apiSuccess {String} gender Users gender. String, not boolean? We support apaches?
 * @apiSuccess {String} hobby Users hobby
 * @apiSuccess {Array} favouritePlaces Array of favourite places for user
 * @apiSuccess {String} favouritePlaces[].placeId Id of the place as reference
 * @apiSuccess {String} favouritePlaces[].favouriteTime:String Favourite time.(Summer for example or a year)
 * @apiSuccess {Array} visitedPlaces Places that user has visited
 * @apiSuccess {String} visitedPlaces[].placeId Place Id as reference
 * @apiSuccess {Boolean} visitedPlaces[].report Boolean indicating if user has done any reports around that place
 * @apiSuccess {Array} profile Array containing links to social profiles of the user(Facebook, Twitter and etc.)*
 * Note! Currently there is no way of linking multiple social profiles to 1 user.
 * Even though if provider and link will be added, user won't be able to log in from more than 1 of the profiles.
 * Ask Nikita more about this topic if you have any questions.
 * @apiSuccess {String} profile[].provider Social Provider (Facebook, Twitter, Google and etc.)
 * @apiSuccess {String} profile[].link Link to the profile
 * @apiSuccess {String} lastOnline Date indicating last action of the user?
 * @apiSuccess {Array} logTimes Array containing log in and log out times bound to certain places
 * @apiSuccess {String} logTimes[].locationId Place id
 * @apiSuccess {String} logTimes[].timeLogIn Log in Date&Time
 * @apiSuccess {String} logTimes[].timeLogOut Log out Date&Time
 * @apiSuccess {Number} numberOfComments Amount of comments user made
 * @apiSuccess {Number} numberOfRatings Amount of hearts/flags user has given
 * @apiSuccess {Number} numberOfReports Amount of reports user has made
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200
 *      [{
 *          id:String,
 *          username:String,
 *          email:String,
 *          image_url:String,
 *          bio:String,
 *          location:String,
 *          gender:String,
 *          hobby:String,
 *          favouritePlaces:[{
 *              placeId:String,
 *              favouriteTime:String
 *          }],
 *          visitedPlaces:[{
 *              placeId:String,
 *              report:Boolean
 *          }],
 *          profile: [{
 *              provider: String,
 *              link: String
 *          }],
 *          lastOnline:String,
 *          logTimes:[{
 *              locationId:String,
 *              timeLogIn:String,
 *              timeLogOut:String,
 *              numberOfComments:Number,
 *              numberOfRatings:Number,
 *              numberOfReports:Number
 *          }]
 *      }]
 *
 * @apiExample
 * http://balticapp.fi/lukeB/user/get-all
 * @apiDescription
 * Returns Array of json objects containing users information.
 * Requires Login.
 *
 * @apiUse error
 * @apiUse loginError
 */
router.get('/get-all',jwtCheck,authConverter,function(req,res){
   Utility.get(UserModel,null,res);
});
/**
 * @api {get} /lukeB/user Get user
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {String} [id] User id that is to be returned. If not provided, users own information is returned.
 *
 * @apiSuccess {String} id User id
 * @apiSuccess {String} username Users chosen username
 * @apiSuccess {String} email Users e-mail
 * @apiSuccess {String} image_url URL to users image
 * @apiSuccess {String} bio Users biography
 * @apiSuccess {String} location Users location (country, town or city)
 * @apiSuccess {String} gender Users gender. String, not boolean? We support apaches?
 * @apiSuccess {String} hobby Users hobby
 * @apiSuccess {Array} favouritePlaces Array of favourite places for user
 * @apiSuccess {String} favouritePlaces[].placeId Id of the place as reference
 * @apiSuccess {String} favouritePlaces[].favouriteTime:String Favourite time.(Summer for example or a year)
 * @apiSuccess {Array} visitedPlaces Places that user has visited
 * @apiSuccess {String} visitedPlaces[].placeId Place Id as reference
 * @apiSuccess {Boolean} visitedPlaces[].report Boolean indicating if user has done any reports around that place
 * @apiSuccess {Array} profile Array containing links to social profiles of the user(Facebook, Twitter and etc.)*
 * Note! Currently there is no way of linking multiple social profiles to 1 user.
 * Even though if provider and link will be added, user won't be able to log in from more than 1 of the profiles.
 * Ask Nikita more about this topic if you have any questions.
 * @apiSuccess {String} profile[].provider Social Provider (Facebook, Twitter, Google and etc.)
 * @apiSuccess {String} profile[].link Link to the profile
 * @apiSuccess {String} lastOnline Date indicating last action of the user?
 * @apiSuccess {Array} logTimes Array containing log in and log out times bound to certain places
 * @apiSuccess {String} logTimes[].locationId Place id
 * @apiSuccess {String} logTimes[].timeLogIn Log in Date&Time
 * @apiSuccess {String} logTimes[].timeLogOut Log out Date&Time
 * @apiSuccess {Number} numberOfComments Amount of comments user made
 * @apiSuccess {Number} numberOfRatings Amount of hearts/flags user has given
 * @apiSuccess {Number} numberOfReports Amount of reports user has made
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200
 *      {
 *          id:String,
 *          username:String,
 *          email:String,
 *          image_url:String,
 *          bio:String,
 *          location:String,
 *          gender:String,
 *          hobby:String,
 *          favouritePlaces:[{
 *              placeId:String,
 *              favouriteTime:String
 *          }],
 *          visitedPlaces:[{
 *              placeId:String,
 *              report:Boolean
 *          }],
 *          profile: [{
 *              provider: String,
 *              link: String
 *          }],
 *          lastOnline:String,
 *          logTimes:[{
 *              locationId:String,
 *              timeLogIn:String,
 *              timeLogOut:String,
 *              numberOfComments:Number,
 *              numberOfRatings:Number,
 *              numberOfReports:Number
 *          }]
 *      }
 * @apiExample
 * http://balticapp.fi/lukeB/user?id=2u190e2u02190u
 * @apiDescription
 * Returns single json object containing user own information if no id was provided.
 * Returns single json object containing user information if id was provided.
 * Requires Login.
 *
 * @apiUse error
 * @apiUse loginError
 */
router.get('/',jwtCheck,authConverter, function(req, res, next) {
    var id = req.query.id || req.user.profile.id;
    Utility.get(UserModel,id,res);
});
/**
 * @api {post} /lukeB/user/update Update
 * @apiName Update
 * @apiGroup User
 *
 * @apiParam {String} [id] User id that is to be updated. For admin.
 * @apiParam {String} [email] Users e-mail
 * @apiParam {String} [bio] Users biography
 * @apiParam {String} [location] Users location (country, town or city)
 * @apiParam {String} [gender] Users gender. String, not boolean? We support apaches?
 * @apiParam {String} [hobby] Users hobby
 * @apiParam {File} [image] Image file that is to be linked to user profile.
 * @apiParam {Array} [favouritePlaces] Array of favourite places for user
 * @apiParam {String} [favouritePlaces[].placeId] Id of the place as reference
 * @apiParam {String} [favouritePlaces[].favouriteTime] Favourite time.(Summer for example or a year)
 * @apiParam {Array} [visitedPlaces] Places that user has visited
 * @apiParam {String} [visitedPlaces[].placeId] Place Id as reference
 * @apiParam {Boolean} [visitedPlaces[].report] Boolean indicating if user has done any reports around that place
 * @apiParam {Array} [profile] Array containing links to social profiles of the user(Facebook, Twitter and etc.)*
 * Note! Currently there is no way of linking multiple social profiles to 1 user.
 * Even though if provider and link will be added, user won't be able to log in from more than 1 of the profiles.
 * Ask Nikita more about this topic if you have any questions.
 * @apiParam {String} [profile[].provider] Social Provider (Facebook, Twitter, Google and etc.)
 * @apiParam {String} [profile[].link] Link to the profile
 *
 * @apiSuccess {String} id User id
 * @apiSuccess {String} username Users chosen username
 * @apiSuccess {String} email Users e-mail
 * @apiSuccess {String} image_url URL to users image
 * @apiSuccess {String} bio Users biography
 * @apiSuccess {String} location Users location (country, town or city)
 * @apiSuccess {String} gender Users gender. String, not boolean? We support apaches?
 * @apiSuccess {String} hobby Users hobby
 * @apiSuccess {Array} favouritePlaces Array of favourite places for user
 * @apiSuccess {String} favouritePlaces[].placeId Id of the place as reference
 * @apiSuccess {String} favouritePlaces[].favouriteTime:String Favourite time.(Summer for example or a year)
 * @apiSuccess {Array} visitedPlaces Places that user has visited
 * @apiSuccess {String} visitedPlaces[].placeId Place Id as reference
 * @apiSuccess {Boolean} visitedPlaces[].report Boolean indicating if user has done any reports around that place
 * @apiSuccess {Array} profile Array containing links to social profiles of the user(Facebook, Twitter and etc.)*
 * Note! Currently there is no way of linking multiple social profiles to 1 user.
 * Even though if provider and link will be added, user won't be able to log in from more than 1 of the profiles.
 * Ask Nikita more about this topic if you have any questions.
 * @apiSuccess {String} profile[].provider Social Provider (Facebook, Twitter, Google and etc.)
 * @apiSuccess {String} profile[].link Link to the profile
 * @apiSuccess {String} lastOnline Date indicating last action of the user?
 * @apiSuccess {Array} logTimes Array containing log in and log out times bound to certain places
 * @apiSuccess {String} logTimes[].locationId Place id
 * @apiSuccess {String} logTimes[].timeLogIn Log in Date&Time
 * @apiSuccess {String} logTimes[].timeLogOut Log out Date&Time
 * @apiSuccess {Number} numberOfComments Amount of comments user made
 * @apiSuccess {Number} numberOfRatings Amount of hearts/flags user has given
 * @apiSuccess {Number} numberOfReports Amount of reports user has made
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200
 *      {
 *          id:String,
 *          username:String,
 *          email:String,
 *          image_url:String,
 *          bio:String,
 *          location:String,
 *          gender:String,
 *          hobby:String,
 *          favouritePlaces:[{
 *              placeId:String,
 *              favouriteTime:String
 *          }],
 *          visitedPlaces:[{
 *              placeId:String,
 *              report:Boolean
 *          }],
 *          profile: [{
 *              provider: String,
 *              link: String
 *          }],
 *          lastOnline:String,
 *          logTimes:[{
 *              locationId:String,
 *              timeLogIn:String,
 *              timeLogOut:String,
 *              numberOfComments:Number,
 *              numberOfRatings:Number,
 *              numberOfReports:Number
 *          }]
 *      }
 *
 * @apiDescription
 * Updates the user with specified parameters. Not every parameter is allowed to be updated.
 * The ones that are listed are allowed. User doesn't have to specify his own id, if id is omitted then users own profile is updated.
 * Only admin can update another users profile.
 * Returns updated profile on success.
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse authError
 * @apiErrorExample Wrong id:
 *      HTTP/1.1 404
 *      {
 *          error: 'No user with such id'
 *      }
 */
router.post('/update',jwtCheck,authConverter,function(req,res) {
    var data = req.body;
    var id = data.id || req.user.profile.id;
    var appMetadata = req.user.profile._json.app_metadata || {roles: []};

    if (id == req.user.profile.id || appMetadata.roles.indexOf('admin') != -1) {
        UserModel.findOne({id: id}, function (err, doc) {
            if (doc != null) {
                for (var key in doc) {
                    if (Utility.allowKey(key)) {
                        var value = Utility.getKey(data, key) || Utility.getKey(doc, key);
                        Utility.setKey(doc, key, value);
                    }
                }
                doc.image_url = Utility.saveImageBase64(data.image,"lukeB/user/",doc.id)||doc.image_url;
                doc.save(function(err,result) {
                    if (err)throw err;

                    res.status(200).json(Utility.filter(result));
                });

            } else {
                res.status(404).json({error: 'No user with such id'});
            }
        });
    } else {
        res.status(401).json({error:'Proper authorization required',reqAuth:true});
    }
});
/**
 * @api {get} /lukeB/user/available Check for username
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
 * http://balticapp.fi/lukeB/user/available?username=JohnDoe
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
 * @api {get} /lukeB/user/set-username Set username
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
 * http://balticapp.fi/lukeB/user/set-username?username=JohnDoe
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
/**
 * @api {get} /lukeB/user/copy-profile Copy Profile
 * @apiName CopyProfile
 * @apiGroup User
 *
 * @apiParam {Boolean} [cpyImg=true] If true sets the image provided by social media to be user image.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          success: true
 *      }
 *
 * @apiSuccess {Boolean} success If true, the profile was copied successfully
 *
 * @apiDescription
 * Adds social media profile that user has logged with to profile property.
 * (Optional) Sets user image to one provided by social media.
 * Returns error in case user has not logged through social network.
 *
 * @apiExample Example URL 1:
 * http://balticapp.fi/lukeB/user/copy-profile?cpyImg=false
 * @apiExample Example URL 2:
 * http://balticapp.fi/lukeB/user/copy-profile?cpyImg=0
 * @apiExample Example URL 3:
 * http://balticapp.fi/lukeB/user/copy-profile
 *
 * @apiUse error
 * @apiUse loginError
 *
 * @apiErrorExample Missing provider:
 *      HTTP/1.1 404
 *      {
 *          error:"Error in reading social media profile data"
 *      }
 */
router.get("/copy-profile",jwtCheck,authConverter,function(req,res) {
    var data = req.user.profile;
    var cpyImg = true;
    if(req.query.cpyImg=="false" || req.query.cpyImg==0){
        cpyImg = false;
    }

    if(data.provider&&data._json.link) {
        UserModel.findOne({id: data.id}, function (err, doc) {
            if (err)throw err;
            var exists = false;
            doc.profile.forEach(function (item) {
                if (item.provider == data.provider) {
                    exists = true;
                    item.link = data._json.link;
                }
            });
            if (!exists) {
                doc.profile.push({
                    provider: data.provider,
                    link: data._json.link
                });
            }
            if (cpyImg && data.picture) {
                doc.image_url = data.picture;
            }
            doc.save(function(err,result){
                if(err)throw err;
                res.status(200).json({success:true});
            });
        });
    }else{
        res.status(404).json({error:"Error in reading social media profile data"});
    }
});
/**
 * @api {get} /lukeB/user/add-favourite-place Add Favourite Place
 * @apiName AddFavouritePlace
 * @apiGroup User
 *
 * @apiParam {String} id Place id
 * @apiParam {String} [favouriteTime] String indicating users' time preference towards a place.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          success: true
 *      }
 *
 * @apiSuccess {Boolean} success If true, the addition was successful.
 *
 * @apiDescription
 * Adds place to user favourites by id.
 *
 * @apiExample Example URL 1:
 * http://balticapp.fi/lukeB/user/add-favourite-place?id=19012h9120812&favouriteTime=Autumn
 *
 * @apiUse error
 * @apiUse loginError
 *
 * @apiErrorExample Missing or wrong id:
 *      HTTP/1.1 404
 *      {
 *          error:"No place with such id"
 *      }
 */
router.get("/add-favourite-place",jwtCheck,authConverter,function(req,res) {
    var data = req.query;

    PlaceModel.findOne({id: data.id}, function (err, place) {
        if (err)throw err;
        if (place) {
            UserModel.findOne({id: req.user.profile.id}, function (err, user) {
                if (err)throw err;
                var exists = false;
                user.visitedPlaces.forEach(function (item) {
                    if (item.placeId == place.id) {
                        exists = true;
                        item.favouriteTime = data.favouriteTime;
                    }
                });
                if (!exists) {
                    user.visitedPlaces.push({
                        placeId: place.id,
                        favouriteTime: data.favouriteTime
                    });
                }
                user.save(function (err, result) {
                    if (err)throw err;
                    res.status(200).json({success: true});
                });
            });
        } else {
            res.status(404).json({error: "No place with such id"});
        }
    });
});
/**
 * @api {get} /lukeB/user/remove-favourite-place Remove Favourite Place
 * @apiName RemoveFavouritePlace
 * @apiGroup User
 *
 * @apiParam {String} id Place id
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          success: true
 *      }
 *
 * @apiSuccess {Boolean} success Always true
 *
 * @apiDescription
 * Removes the place from favourites if it finds matching.
 * Does not check for validity of id.
 * Does not say if any place was removed.
 *
 * @apiExample Example URL 1:
 * http://balticapp.fi/lukeB/user/remove-favourite-place?id=19012h9120812
 *
 * @apiUse error
 * @apiUse loginError
 *
 */
router.get("/remove-favourite-place",jwtCheck,authConverter,function(req,res) {
    var data = req.query;
    UserModel.findOne({id: req.user.profile.id}, function (err, user) {
        if (err)throw err;
        for (var i = 0; i < user.visitedPlaces.length; i++) {
            if (user.visitedPlaces[i].placeId == data.id) {
                user.visitedPlaces.splice(i, 1);
            }
        }
        user.save(function (err, result) {
            if (err)throw err;
            res.status(200).json({success: true});
        });

    });
});
/**
 * @api {get} /lukeB/user/add-role Add role
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
 * http://balticapp.fi/lukeB/user/add-role?id=auth0|ej21oje10e212oe12&role=advanced
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
router.get("/add-role",jwtCheck,authConverter,requiresRole("admin"),function(req,res) {
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
/**
 * @api {get} /lukeB/user/remove-role Remove role
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
 * http://balticapp.fi/lukeB/user/remove-role?id=auth0|ej21oje10e212oe12&role=advanced
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
router.get("/remove-role",jwtCheck,authConverter,requiresRole("admin"),function(req,res) {
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
/**
 * @api {get} /lukeB/user/roles Get roles
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
 * http://balticapp.fi/lukeB/user/roles?id=auth0|ej21oje10e212oe12
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
/**
 * @api {get} /lukeB/user/is-admin Is Admin
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
 * http://balticapp.fi/lukeB/user/is-admin
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
 * @api {get} /lukeB/user/is-advanced Is Advanced
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
 * http://balticapp.fi/lukeB/user/is-advanced
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
 * @api {get} /lukeB/user/ban Ban
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
 * http://balticapp.fi/lukeB/user/ban?id=auth0|ej21oje10e212oe12
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
/**
 * @api {get} /lukeB/user/unban Unban
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
 * http://balticapp.fi/lukeB/user/ban?id=auth0|ej21oje10e212oe12
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
 * @api {post} /lukeB/user/upload-default-image Upload default image
 * @apiName UploadDefaultImage
 * @apiGroup User
 *
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
 * Uploads default image for the user to view. The image then is accessible through /images/lukeA/user/default/image_name.jpeg
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
 *          error:"Missing image_name"
 *      }
 *
 * @apiUse roleAdmin
 * @apiUse roleSuper
 */
router.post("/upload-default-image",jwtCheck,authConverter,requiresOneOfRoles(["admin","superadmin"]),function(req,res){
    var name = req.body.image_name;
    if(name!=null) {
        if (Utility.saveImageBase64(req.body.image, "lukeB/user/default/", name) != null) {
            res.status(200).json({success: true});
        } else {
            res.status(500).json({error: "Image upload failed"});
        }
    }else{
        res.status(422).json({error:"Missing image_name"});
    }
});
/**
 * @api {get} /lukeB/user/delete-default-image Delete default image
 * @apiName DeleteDefaultImage
 * @apiGroup User
 *
 * @apiParam {String} name Default image name to be deleted.
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
 * http://balticapp.fi/lukeB/user/delete-default-image?name=dogs
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
    var image_name = req.query.name;
    var image_url = "http://www.balticapp.fi/images/lukeB/user/default/"+image_name+".jpeg";
    if(image_url!=null&&image_url.indexOf("user/default")!=-1) {
        if (Utility.deleteImage(image_url) != null) {
            res.status(200).json({success: true});
        } else {
            res.status(500).json({error: "Image deletion failed"});
        }
    }else{
        res.status(422).json({error:"Missing/incorrect url"});
    }
});
/**
 * @api {get} /images/lukeB/user/default Get Default Image(s)
 * @apiName GetImages
 * @apiGroup User
 *
 * @apiDescription
 * Location of default user images. Access unique image by name. *Requires improvement.
 *
 * @apiExample Example image_url:
 * http://balticapp.fi/images/lukeB/user/default/redTomato.jpg
 */
module.exports = router;