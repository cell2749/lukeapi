var fs = require('fs');
const MONGO_PROJECTION = {
    __v:0,
    _id:0
}
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
/**
 * @apiDefine removeStatus
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200
 *      {
 *          success: "Removed N items"
 *      }
 * @apiSuccess {String} success Indicates amount of removed items.
 *
 * @apiErrorExample Missing id:
 *      HTTP/1.1 422
 *      {
 *          success: "Missing id"
 *      }
 * @apiErrorExample Wrong id:
 *      HTTP/1.1 404
 *      {
 *          success: "No such id"
 *      }
 * */
Utility.prototype.remove = function(Model,id,res) {
    if(id) {
        Model.find({id: id}).remove(function (err, item) {
            if (err) throw err;

            if (item.result.n != 0) {
                res.status(200).json({success: "Removed " + item.result.n + " items"});
            } else {
                res.status(404).json({error: "No such id"});
            }
        });
    }else{
        res.status(422).json({error: "Missing id"});
    }
};
/**
 * @apiDefine updateStatus
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200
 *      {
 *          success: true
 *      }
 * @apiSuccess {Boolean} success True if update was successful
 *
 * @apiErrorExample Missing id:
 *      HTTP/1.1 422
 *      {
 *          success: "Missing id"
 *      }
 * @apiErrorExample Wrong id:
 *      HTTP/1.1 404
 *      {
 *          success: "No such id"
 *      }
 * */
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
                res.status(404).json({error: "No such id"});
            }
        });
    }else{
        res.status(422).json({error: "Missing id"});
    }
};
/**
 * @apiDefine voteStatus
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200
 *      {
 *          success: true
 *      }
 * @apiSuccess {Boolean} success True if voting was successful
 *
 * @apiErrorExample Missing id:
 *      HTTP/1.1 422
 *      {
 *          success: "Missing id"
 *      }
 * @apiErrorExample Wrong id:
 *      HTTP/1.1 404
 *      {
 *          success: "No such id"
 *      }
 * */
/**
 * @apiDefine missingVote
 * @apiErrorExample Missing Vote:
 *      HTTP/1.1 422
 *      {
 *          success: "Missing vote:true or false"
 *      }
 * */
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
                    res.status(404).json({error: "No such id"});
                }
            });
        } else {
            res.status(422).json({error: "Missing vote: true or false"});
        }
    } else {
        res.status(422).json({error: "Missing id"});
    }
};
/**
 * @apiDefine voteCountStatus
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200
 *      {
 *          count: Number
 *      }
 * @apiSuccess {Number} count Vote count
 * @apiErrorExample Missing id:
 *      HTTP/1.1 422
 *      {
 *          success: "Missing id"
 *      }
 * @apiErrorExample Wrong id:
 *      HTTP/1.1 404
 *      {
 *          success: "No such id"
 *      }
 * */
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
                res.status(404).json({error: "No such id"});
            }
        });
    } else {
        res.status(422).json({error: "Missing report id"});
    }
};
Utility.prototype.get = function(Model,id,res) {
    var returnV = new Model();
    var returnArray = [];
    if (id == null) {
        Model.find({},MONGO_PROJECTION, function (err, doc) {
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
Utility.prototype.hasRole = function(req,role) {
    var appMetadata = req.user.profile._json.app_metadata || {};
    var roles = appMetadata.roles || [];

    return (roles.indexOf(role) != -1);
};
Utility.prototype.saveImage = function(req,path,imgName){
    var fullpath = "/opt/balticapp/lukeapi/public/images/" + path + imgName;
    if(req.files) {
        if (req.files.image) {
            var format = req.files.image.type.split('/')[1];
            if (format.length < 5) {
                fullpath = fullpath + "." + format;

                fs.readFile(req.files.image.path, function (err, data) {
                    if (err)throw err;
                    fs.writeFile(fullpath, data, function (err) {
                        if (err) throw err;

                        return "www.balticapp.fi/images/" + path + imgName + "." + format;
                    });
                });
            } else {
                console.log("Format too long: " + format);
                return null;
            }
        } else {
            console.log("Error: req.files.image is empty");
            return null;
        }
    }else{
        console.log("Error: req.files is empty");
        return null;
    }
};
Utility.prototype.deleteImage = function(url){
    if(url.indexOf("..")==-1&&url.indexOf(".www")==-1&&url.indexOf("www.balticapp.fi/images/")!=-1) {
        var path = "/opt/balticapp/lukeapi/public/images/" + url.substr(url.indexOf("www.balticapp.fi/images/") + "www.balticapp.fi/images/".length);
        fs.unlink(path,function(){
           return true;
        });
    }else{
        return false;
    }

};
Utility.prototype.copyImage = function(req,large){
    if(!large) {
        return req.user.profile.picture;
    }else{
        return req.user.profile.picture_large;
    }
};
module.exports = Utility;