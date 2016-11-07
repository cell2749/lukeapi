/**
 * Created by Cell on 11-Oct-16.
 */
module.exports = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).json({error:"Authentication required", login:true});
    }
    next();
};
