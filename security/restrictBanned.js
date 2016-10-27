/**
 * Created by nikitak on 27.10.2016.
 */
module.exports = function(req, res, next) {
    var appMetadata = req.user.profile._json.app_metadata || {};
    var roles = appMetadata.roles || [];

    if (roles.indexOf("ban") == -1) {
        next();
    } else {
        res.status(200).json({error: 'You are banned from the service', reqAuth: true});
    }
};
