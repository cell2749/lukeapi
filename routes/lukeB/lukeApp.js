var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var mongodb = require('../../mongodb/lukeBdb');
/* SECURITY */
var requiresLogin = require('../../security/requiresLogin');
var requiresRole = require('../../security/requiresRole');
var requiresRoles = require('../../security/requiresRoles');
var restrictBanned = require('../../security/restrictBanned');
/* MODELS */
var UserModel = require("../../models/lukeB/UserModel");
var ReportModel = require("../../models/lukeB/ReportModel");
var PlaceModel = require("../../models/lukeB/PlaceModel");
var CommentModel = require("../../models/lukeB/CommentModel");
var CategoryModel = require("../../models/lukeB/CategoryModel");
/* ROUTES*/
var user = require('./routes/user');
var report = require('./routes/report');
var place = require('./routes/place');
var category = require('./routes/category');
var comment = require('./routes/comment');

const MONGO_PROJECTION ={
    _id: 0,
    __v: 0
};
/* DATABASE HTTP REQUESTS*/
router.use('/user',user);
router.use('/place',place);
router.use("/category",category);
router.use("/report",report);
router.use('/comment', comment);
/**
 * @api {get} /lukeB/authzero Get setup
 * @apiName GetSetup
 * @apiGroup Auth0
 *
 * @apiSuccessExample Success-Response-Single:
 *      HTTP/1.1 200 OK
 *      {
 *           AUTH0_CLIENT_ID: String,
 *           AUTH0_DOMAIN: String,
 *           AUTH0_CALLBACK_URL: String
 *      }
 *
 * @apiSuccess {String} AUTH0_CLIENT_ID Auth0 client id
 * @apiSuccess {String} AUTH0_DOMAIN Auth0 domain
 * @apiSuccess {String} AUTH0_CALLBACK_URL Callback url to server. Read more on the callback url implementation.
 *
 * @apiDescription
 * Returns auth0 connection setup information.
 *
 * @apiExample Example:
 * http://balticapp.fi/lukeB/authzero
 * */
router.get("/authzero",function(req,res,next) {
    var env = {
        AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
        AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
        AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL_PRODUCTION_B
    };
    res.status(200).json(env);
});
/**
 * @api {get} /lukeB/callback Callback
 * @apiName Callback
 * @apiGroup Auth0
 *
 * @apiParam {String} route Redirect route after successful authentication
 *
 * @apiSuccessExample Success-Response-Single:
 *      HTTP/1.1 200 OK
 *
 * @apiSuccess Default Responds with HTTP/1.1 200 OK if route is not provided.
 *
 * @apiDescription
 * Callback url for the auth0 setup. Can be used with parameters - route.
 * After registering/checking the user in local database redirects to specified route or responds with OK 200.
 *
 * */
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
/**
 * @api {get} /lukeB/login Login
 * @apiName Login
 * @apiGroup Auth0
 *
 * @apiSuccessExample Success-Response-Single:
 *      HTTP/1.1 200 OK
 *
 * @apiSuccess Default Responds with HTTP/1.1 200 OK on successful authentication
 *
 * @apiDescription
 * Meant to be used instead of callback in case redirection is not needed.
 * Note that this route is not specified as a callback, therefore it has to be called manually.
 * (!Note: token is either manipulated automatically or you will have to send it manually)
 * */
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
/**
 * @api {get} /lukeA/logout Logout
 * @apiName Logout
 * @apiGroup Auth0
 *
 * @apiSuccessExample Success-Response-Single:
 *      HTTP/1.1 200
 *      {
 *          success:true
 *      }
 *
 * @apiSuccess {Boolean} success True if logout is successful
 *
 * @apiDescription
 * Logout function. Call this if user wants to logout from application.
 * (!Note: token is either manipulated automatically or you will have to send it manually)
 *
 * */
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
