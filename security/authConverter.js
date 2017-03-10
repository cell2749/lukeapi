/**
 * Created by Cell on 13-Nov-16.
 */
var https = require('https');
var UserModel = require('../models/lukeA/UserModel');
var ManagementClient = require('auth0').ManagementClient;
var management = new ManagementClient({
    token: process.env.AUTH0_API_TOKEN,
    domain: process.env.AUTH0_DOMAIN
});
module.exports = function(req,res,next) {
    console.log("Authentication");
    management.users.get({id:req.user.sub},function(err,response){
        if(err){
            res.status(400).json({error: response});
        }else {
            try {
                var userData = response;
                userData.id = userData.user_id;
                userData._json = {app_metadata: userData.app_metadata};
                req.user.profile = userData;
                next();
            } catch (error) {
                console.log("authConverter Error: ");
                console.log(error);
                console.log("authConverter Error RESPONSE FROM MANAGEMENT API: ");
                console.log(response);
                res.status(400).send(error);
            }
        }
    });
};
