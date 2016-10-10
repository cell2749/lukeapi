/**
 * Created by nikitak on 10.10.2016.
 */
var jwt = require('express-jwt');
var rsaValidation = require('auth0-api-jwt-rsa-validation');
//var secret = require("./authSecret");

var jwtCheck = jwt({
    secret: rsaValidation(),
    algorithms: ['RS256'],
    issuer: "https://nikitak.eu.auth0.com/",
    audience: 'http://localhost:3000'
});
module.exports = jwtCheck;