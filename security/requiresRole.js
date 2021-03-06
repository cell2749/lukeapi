/**
 * Created by Cell on 11-Oct-16.
 */
module.exports = function requireRole(role) {
    return function(req, res, next) {
        var appMetadata = req.user.profile._json.app_metadata || {};
        var roles = appMetadata.roles || [];

        if (roles.indexOf(role) != -1) {
            next();
        } else {
            res.status(401).json({error:'Proper authorization required',auth:true});
        }
    }
};

