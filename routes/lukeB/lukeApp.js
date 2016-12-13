var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var mongodb = require('../../mongodb/lukeBdb');
var util =require("util");
/* SECURITY */
var requiresLogin = require('../../security/requiresLogin');
var requiresRole = require('../../security/requiresRole');
var requiresRoles = require('../../security/requiresRoles');
var restrictBanned = require('../../security/restrictBanned');
var jwtCheck = require('../../security/jwtCheck');
var authConverter = require('../../security/authConverter');
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

const MONGO_PROJECTION = {
    _id: 0,
    __v: 0
};
/* DATABASE HTTP REQUESTS*/
router.use('/user', user);
router.use('/place', place);
router.use("/category", category);
router.use("/report", report);
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
router.get("/authzero", function (req, res, next) {
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
 * @apiSuccessExample Success-Response-Single:
 *      HTTP/1.1 200 OK
 *
 * @apiSuccess Responds always 200 OK
 *
 * @apiDescription
 * Callback url for the auth0 authentication redirect_url. Returns always OK. Should be checked for client uri variables.
 *
 * */
router.get("/callback", function (req, res) {
    res.status(200).send("OK");
});
/**
 * @api {get} /lukeB/login Login
 * @apiName Login
 * @apiGroup Auth0
 *
 * @apiParam (Headers) Authorization Bearer id_token
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
router.get("/login", jwtCheck, authConverter, function (req, res) {
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
                    //console.log(result);
                });
            }
        });
    }
    res.status(200).send('OK');
});


module.exports = router;
