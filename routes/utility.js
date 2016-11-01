var MyUtility = function(keyes){
    this.omitKeyes = keyes;
}
MyUtility.prototype.allowKey = function(key) {
    var omit = [
        "id",
        "_id",
        "__v",
        "username",
        "profileId",
        "rating",
        "rating2",
        "votes.profileId",
        "votes.vote",
        "flagged",
        "approved"
    ];
    for (var i = 0; i < this.omitKeyes.length; i++) {
        if (this.omitKeyes[i] == key) {
            return false;
        }
    }
    return true;
};
MyUtility.prototype.deg2rad = function(deg) {
    return deg * Math.PI / 180;
};
MyUtility.prototype.remove = function(Model,id) {
    Model.find({id: id}).remove(function (err, item) {
        if (err) throw err;

        if (item.result.n != 0) {
            res.status(200).json({success:"Removed " + item.result.n + " items"});
        } else {
            res.status(200).json({error:"No such id"});
        }
    });
};
MyUtility.prototype.update = function(Model,data) {
    Model.findOne({id: data.id}, function (err, doc) {
        if (doc) {
            var pattern = new Model();
            for (var key in pattern.schema.paths) {
                if (this.allowKey(key)) {
                    doc[key] = data[key] || doc[key];
                }
            }
            res.status(200).json({success:true});
        } else {
            res.status(200).json({error:"No such id"});
        }
    });
};
module.exports = MyUtility;