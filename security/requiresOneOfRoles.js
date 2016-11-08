/**
 * Created by nikitak on 2.11.2016.
 */
module.exports = function requireOneOfRoles(roles) {
    return function(req, res, next) {
        var appMetadata = req.user.profile._json.app_metadata || {};
        var allRoles = appMetadata.roles || [];
        var passed = false;
        for(var i=0;i<roles.length;i++){
            if(allRoles.indexOf(roles[i])!= -1){
                passed = true;
            }
        }
        if (passed) {
            next();
        } else {
            res.status(401).json({error:'Proper authorization required',auth:true});
        }
    }
};