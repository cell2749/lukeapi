var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
/* SECURITY */
var requiresLogin = require('../../security/requiresLogin');
var requiresRole = require('../../security/requiresRole');
var requiresRoles = require('../../security/requiresRoles');
var jwtCheck = require('../../security/jwtCheck');
var authConverter = require('../../security/authConverter');
var https = require('https');
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
//var apiDoc = require('../../views/apiDocA.html')

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
/*router.get('/api',function(req,res){
    res.status(200).send(apiDoc);
});*/
/**
 * @api {get} /lukeA/authzero Get setup
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
 * http://balticapp.fi/lukeA/authzero
 * */
router.get("/authzero",function(req,res,next){
  var lockSetup = {
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL_PRODUCTION_A
  };
  res.status(200).json(lockSetup);
});
/**
 * @api {get} /lukeA/callback Callback
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
/*router.get('/callback',passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }), function(req, res) {
    var route = req.query.route;

    if (!req.user) {
        throw new Error('user null');
    } else {
        var userData = req.user.profile;

        UserModel.findOne({id: userData.id}, MONGO_PROJECTION, function (err, result) {
            if (err) throw err;

            if (result == null) {
                var user = new UserModel({
                    id: userData.id,
                    score: 0,
                    rankingId: "0"
                });

                user.save(function (err, result) {
                    if (err) throw err;

                    if (route == null) {
                        res.status(200).send("OK");
                    } else {
                        res.redirect(route);
                    }
                });
            }
        });
    }
});*/
/**
 * @api {get} /lukeA/login Login
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
router.get("/login",jwtCheck,authConverter, function(req,res){
    if (!req.user) {
        throw new Error('user null');
    }else{
        var userData = req.user.profile;

        UserModel.findOne({id:userData.id},MONGO_PROJECTION, function (err, result) {
            if(err) throw err;

            if(result==null){
                var user = new UserModel();
                user.id=userData.id;
                user.score = 0;
                user.save(function(err,result){
                    if(err) throw err;
                    console.log(result);
                });
            }
        });
    }
    res.status(200).send("OK");
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
/*router.get('/logout',jwtCheck,authConverter,function(req,res){
    req.logout();
    res.status(200).json({success:true});
});*/

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
router.get("/test",jwtCheck,function(req,res) {
    console.log("Header Authorization /");
    console.log(req.headers.authorization);
    console.log("User /");
    console.log(req.user);
    var returnData;
    returnData=null;
    var options = {
        host: 'nikitak.eu.auth0.com',
        path: '/tokeninfo',
        method: 'GET',
        headers: {
            'id_token': req.headers.authorization.split(" ")[1]
        }
    };

    var request = http.request(options, function (result) {
        //console.log('STATUS: ' + result.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(result.headers));
        result.setEncoding('utf8');

        result.on('data', function (chunk) {
            console.log("Data /");
            console.log(chunk);
            returnData = chunk;
        });
    });

    request.on('error', function (e) {
        console.log(e);
    });

    request.end();
    res.status(200).json({status:"Testing",data:returnData});
});
module.exports = router;
