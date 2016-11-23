/**
 * Created by Cell on 13-Nov-16.
 */
var https = require('https');
var UserModel = require('../models/lukeA/UserModel');
var mongoose = require('mongoose');
module.exports = function(req,res,next) {
    var acstoken = req.headers.acstoken || req.headers.accessToken;
    var post_options = {
        host: process.env.AUTH0_DOMAIN,
        path: '/userinfo',
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + acstoken
        }
    };

    var post_req = https.request(post_options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            if(chunk!="UNAUTHORIZED") {
                var userData = JSON.parse(chunk);
                userData.id = userData.user_id;
                userData._json = {app_metadata: userData.app_metadata};
                req.user.profile = userData;
                next();
            }else{
                res.status(401).json({error:"Unauthorized"});
            }
        });
    });
    post_req.on('error', function (e) {
        console.log("HTTP CONVERTER REQUEST ERROR: " + e);
    });
    post_req.end();

};
