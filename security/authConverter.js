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
    console.log("id token /");
    console.log(req.headers.authorization);
    //var post_data = JSON.stringify(id_token);
    var post_options = {
        host: process.env.AUTH0_DOMAIN,
        path: '/userinfo',
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + req.headers.acstoken
        }
    };
    console.log("Access Token / ");
    console.log(req.headers.access_token);
    var post_req = https.request(post_options, function (res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log("Chunk / ")
            console.log(chunk);
            chunk.id = chunk.user_id;
            req.user.profile = chunk;
            console.log("Profile / ");
            console.log(req.user.profile);
        });
    });
    post_req.on('error', function (e) {
        console.log("HTTP CONVERTER REQUEST ERROR: " + e);
    });
    post_req.end();
    next();
};