/**
 * 401 UNAUTHORIZED
 * 422 UNPROCESSABLE ENTITY
 * 404 NOT FOUND
 *
* */
var Utility = function(keyes,maxFlags){
    this.omitKeyes = keyes;
    this.maxFlags = maxFlags;
};
Utility.prototype.allowKey = function(key) {
    for (var i = 0; i < this.omitKeyes.length; i++) {
        if (this.omitKeyes[i] == key) {
            return false;
        }
    }
    return true;
};
Utility.prototype.deg2rad = function(deg) {
    return deg * Math.PI / 180;
};
Utility.prototype.remove = function(Model,id,res) {
    if(id) {
        Model.find({id: id}).remove(function (err, item) {
            if (err) throw err;

            if (item.result.n != 0) {
                res.status(200).json({success: "Removed " + item.result.n + " items"});
            } else {
                res.status(200).json({error: "No such id"});
            }
        });
    }else{
        res.status(200).json({error: "Missing id"});
    }
};
Utility.prototype.update = function(Model,data,res) {
    if(data.id) {
        Model.findOne({id: data.id}, function (err, doc) {
            if (doc) {
                for (var key in Model.schema.paths) {
                    if (this.allowKey(key)) {
                        doc[key] = data[key] || doc[key];
                    }
                }
                res.status(200).json({success: true});
            } else {
                res.status(200).json({error: "No such id"});
            }
        });
    }else{
        res.status(200).json({error: "Missing id"});
    }
};
Utility.prototype.vote = function(Model,req,res,vote) {
    var id = req.query.id;
    if (id) {
        if (vote != null) {
            Model.findOne({id: id}, function (err, doc) {
                if (err)throw err;

                if (doc) {
                    var exists = false;
                    var vote = {
                        profileId: req.user.profile.id,
                        date: Date.now(),
                        vote: vote
                    };
                    var flagCount = 0;
                    for (var i = 0; i < doc.votes.length; i++) {
                        if (doc.votes[i].profileId == req.user.profile.id) {
                            doc.votes[i] = vote;
                            exists = true;
                        }
                        if(doc.votes[i].vote==false || doc.votes[i].vote=="false" ){
                            flagCount++;
                        }

                        if (i == doc.votes.length - 1) {
                            if (!exists) {
                                doc.votes.push(vote);
                            }
                            if(this.maxFlags!=null&&flagCount>=this.maxFlags){
                                   doc.flagged = true;
                            }
                            doc.save(function (err, result) {
                                if (err)throw err;
                                res.status(200).json({success: true});
                            });
                        }
                    }
                } else {
                    res.status(200).json({error: "No item with such id"});
                }
            });
        } else {
            res.status(200).json({error: "Missing vote: true or false"});
        }
    } else {
        res.status(200).json({error: "Missing id"});
    }
};
Utility.prototype.voteCount = function(Model,id,res,vote) {
    var count = 0;
    if (id) {
        Model.findOne({id: id}, function (err, doc) {
            if (err)throw err;
            if (doc) {
                for (var i = 0; i < doc.votes.length; i++) {
                    if (doc.votes[i].vote == vote) {
                        count++;
                    }
                    if (i == doc.votes.length - 1) {
                        res.status(200).json({count: count});
                    }
                }
            } else {
                res.status(200).json({error: "No item with such id"});
            }
        });
    } else {
        res.status(200).json({error: "Missing report id"});
    }
};
Utility.prototype.get = function(Model,id,res) {
    var returnV = new Model();
    var returnArray = [];
    if (id == null) {
        Model.find({}, function (err, doc) {
            if (err)throw err;
            for(var i=0 ;i<doc.length;i++) {
                for (var key in Model.schema.paths) {
                    returnV[key] = doc[i][key];
                }
                returnArray.push(returnV);
                returnV={};
                if(i==doc.length-1){
                    res.status(200).json(returnArray);
                }
            }
        });
    } else {
        Model.findOne({id: id}, function (err, doc) {
            if (err) throw err;
            for(var key in Model.schema.paths){
                returnV[key]=doc[key];
            }
            res.status(200).json(doc);
        });
    }
};
module.exports = Utility;