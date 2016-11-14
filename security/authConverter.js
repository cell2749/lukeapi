/**
 * Created by Cell on 13-Nov-16.
 */
var https = require('https');
var UserModel = require('../models/lukeA/UserModel');
var mongoose = require('mongoose');
module.exports = function(req,res,next) {
    var post_options = {
        host: process.env.AUTH0_DOMAIN,
        path: '/userinfo',
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + req.headers.acstoken
        }
    };

    var post_req = https.request(post_options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            chunk.id = chunk.user_id;
            req.user.profile = chunk;
            next();
        });
    });
    post_req.on('error', function (e) {
        console.log("HTTP CONVERTER REQUEST ERROR: " + e);
    });
    post_req.end();

};