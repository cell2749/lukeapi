/**
 * Created by Cell on 13-Nov-16.
 */
var https = require('https');
module.exports = function(req,res,next){
    var returnData;
    returnData=null;
    var options = {
        host: 'nikitak.eu.auth0.com',
        path: '/tokeninfo',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'id_token': req.headers.authorization.split(" ")[1]
        }
    };

    var request = https.request(options, function (result) {
        //console.log('STATUS: ' + result.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(result.headers));
        result.setEncoding('utf8');

        result.on('data', function (chunk) {
            req.user["profile"] = chunk;
        });
    });

    request.on('error', function (e) {
        console.log("HTTP CONVERTER REQUEST ERROR: " + e);
    });

    request.end();
    next();
};