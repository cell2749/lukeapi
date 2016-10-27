/**
 * Created by nikitak on 12.10.2016.
 */
module.exports = function requireRole(roles) {
    return function(req, res, next) {
        var appMetadata = req.user.profile._json.app_metadata || {};
        var allRoles = appMetadata.roles || [];
        var count;
        count = 0;
        for(var i=0;i<roles.length;i++){
            if(allRoles.indexOf(roles[i])!= -1){
                count++;
            }
        }
        if (count == roles.length) {
            next();
        } else {
            res.status(200).json({error:'Proper authorization required',reqAuth:true});
        }
    }
};