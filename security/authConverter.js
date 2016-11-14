/**
 * Created by Cell on 13-Nov-16.
 */
var https = require('https');
var UserModel = require('../models/lukeA/UserModel');
var mongoose = require('mongoose');
module.exports = function(req,res,next) {
    /*var id_token = {
        id_token: req.headers.authorization.split(" ")[1]
    };*/

    //var post_data = JSON.stringify(id_token);
    var post_options = {
        host: 'nikitak.eu.auth0.com',
        path: '/userinfo',
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + req.headers.access_token
        }
    };
    var post_req = https.request(post_options, function (res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log(chunk);
            req.user["profile"] = chunk;
            req.user.profile["id"] = req.user.profile.user_id;
        });
    });
    post_req.on('error', function (e) {
        console.log("HTTP CONVERTER REQUEST ERROR: " + e);
    });
    post_req.end();
    next();
};