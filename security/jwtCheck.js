var jwt = require('express-jwt');

module.exports = jwt({
    secret: process.env.AUTH0_CLIENT_SECRET,
    //secret: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
    audience: process.env.AUTH0_CLIENT_ID
});
