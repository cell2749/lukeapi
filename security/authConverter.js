/**
 * Created by Cell on 13-Nov-16.
 */
var https = require('https');
var UserModel = require('../models/lukeA/UserModel');

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

    var post_req = https.request(post_options, function (httpResponse) {
        httpResponse.setEncoding('utf8');
        httpResponse.on('data', function (chunk) {
            try{
                var userData = JSON.parse(chunk);
                userData.id = userData.user_id;
                userData._json = {app_metadata: userData.app_metadata};
                req.user.profile = userData;
                next();
            }catch(error){
                console.log(chunk);
                res.status(400).json({error:chunk});
            }
        });
    });
    post_req.on('error', function (e) {
        console.log("HTTP CONVERTER REQUEST ERROR: " + e);
    });
    post_req.end();

};
