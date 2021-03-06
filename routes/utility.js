var fs = require('fs');
var gm = require('gm').subClass({imageMagick: true});
const MONGO_PROJECTION = {
    __v: 0,
    _id: 0
}
var Utility = function (keyes, maxFlags) {
    this.omitKeyes = keyes;
    this.maxFlags = maxFlags;
};
Utility.prototype.filter = function (object) {
    //console.log(object);
    if (object != "undefined") {
        try{
        var filteredObject = JSON.parse(JSON.stringify(object), function (key, value) {
            if (key == '_id' || key == '__v') {
                return undefined;
            } else {
                return value;
            }
        });
        return filteredObject;
        }catch(err){
            console.log("Object:\n" + object + "\nError:\n" + err);
            return {error:"Oops. Something went wrong."};
        }
    } else {
        return {}
    }


};
Utility.prototype.allowKey = function (key) {
    for (var i = 0; i < this.omitKeyes.length; i++) {
        if (this.omitKeyes[i] == key) {
            return false;
        }
    }
    return true;
};
Utility.prototype.deg2rad = function (deg) {
    return deg * Math.PI / 180;
};
//Returns Distance
Utility.prototype.getCrow = function (lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1);
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
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
Utility.prototype.remove = function (Model, id, res) {
    if (id) {
        Model.find({id: id}).remove(function (err, item) {
            if (err) console.log(err);

            if (item.result.n != 0) {
                res.status(200).json({success: "Removed " + item.result.n + " items"});
            } else {
                res.status(404).json({error: "No such id"});
            }
        });
    } else {
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
Utility.prototype.update = function (Model, data, res) {
    var that = this;
    if (data.id) {
        Model.findOne({id: data.id}, function (err, doc) {
            if (doc) {
                for (var key in Model.schema.paths) {
                    if (that.allowKey(key)) {
                        var value = that.getKey(data, key) || that.getKey(doc, key);
                        that.setKey(doc, key, value);
                    }
                }

                doc.save(function (err, item) {
                    if (err) console.log(err);
                    res.status(200).json(that.filter(item));
                });

            } else {
                res.status(404).json({error: "No such id"});
            }
        });
    } else {
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
Utility.prototype.vote = function (Model, req, res, vote) {
    var id = req.query.id;
    if (id) {
        if (vote != null) {
            Model.findOne({id: id}, function (err, doc) {
                if (err) console.log(err);

                if (doc) {
                    var exists = false;
                    var date = new Date();
                    date.setUTCHours(date.getUTCHours() - Math.floor(date.getTimezoneOffset() / 60));
                    var voteObj = {
                        profileId: req.user.profile.id,
                        date: date.toISOString(),
                        vote: vote
                    };
                    var flagCount = 0;
                    if (doc.votes.length == 0) {
                        doc.votes.push(voteObj);
                        doc.save(function (err, result) {
                            if (err) console.log(err);
                            res.status(200).json({success: true});
                        });
                    } else {
                        for (var i = 0; i < doc.votes.length; i++) {
                            if (doc.votes[i].profileId == req.user.profile.id) {
                                doc.votes[i] = voteObj;
                                exists = true;
                            }
                            if (doc.votes[i].vote == false || doc.votes[i].vote == "false") {
                                flagCount++;
                            }

                            if (i == doc.votes.length - 1) {
                                if (!exists) {
                                    doc.votes.push(voteObj);
                                }
                                if (this.maxFlags != null && flagCount >= this.maxFlags) {
                                    doc.flagged = true;
                                }
                                doc.save(function (err, result) {
                                    if (err) console.log(err);
                                    res.status(200).json({success: true});
                                });
                            }
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
Utility.prototype.voteCount = function (Model, id, res, vote) {
    var count = 0;
    if (id) {
        Model.findOne({id: id}, function (err, doc) {
            if (err) console.log(err);
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
Utility.prototype.get = function (Model, id, res) {
    //var returnArray = [];
    var that = this;
    if (id == null) {
        Model.find({}, MONGO_PROJECTION, function (err, doc) {
            if (err) console.log(err);
            if (doc.length > 0) {
                res.status(200).json(that.filter(doc));

            } else {
                res.status(200).json([]);
            }
        });
    } else {
        Model.findOne({id: id}, function (err, doc) {
            if (err) console.log(err);
            res.status(200).json(that.filter(doc));
        });
    }
}
;
Utility.prototype.hasRole = function (req, role) {
    var appMetadata = req.user.profile._json.app_metadata || {};
    var roles = appMetadata.roles || [];

    return (roles.indexOf(role) != -1);
};
Utility.prototype.saveImageFromFiles = function (req, path, imgName) {
    var fullpath = "/opt/balticapp/lukeapi/public/images/" + path + imgName;
    if (req.files) {
        if (req.files.image) {
            var format = req.files.image.type.split('/')[1];
            if (format.length < 5) {
                fullpath = fullpath + "." + format;

                fs.readFile(req.files.image.path, function (err, data) {
                    if (err) console.log(err);
                    fs.writeFile(fullpath, data, function (err) {
                        if (err) console.log(err);

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
    } else {
        console.log("Error: req.files is empty");
        return null;
    }
};
Utility.prototype.deleteImage = function (url) {
    if (url) {
        if (url.indexOf("..") == -1 && url.indexOf(".www") == -1 && url.indexOf("www.balticapp.fi/images/") != -1) {
            var path = "/opt/balticapp/lukeapi/public/images/" + url.substr(url.indexOf("www.balticapp.fi/images/") + "www.balticapp.fi/images/".length);
            fs.unlink(path, function () {
                return true;
            });
        } else {
            return false;
        }
    } else {
        return false;
    }
};
Utility.prototype.copyImage = function (req, large) {
    if (!large) {
        return req.user.profile.picture;
    } else {
        return req.user.profile.picture_large;
    }
};

Utility.prototype.setKey = function (obj, key, value) {
    var keys = key.split(".");
    var ret = obj;
    for (var i = 0; i < keys.length - 1; i++) {
        ret = ret[keys[i]];
    }
    ret[keys[i]] = value;

    return ret;
};
Utility.prototype.getKey = function (obj, key) {
    var keys = key.split(".");

    var ret = obj[keys[0]];
    for (var i = 1; i < keys.length; i++) {
        if (i == 0) {
            ret = obj[keys[0]];
        } else {
            if (ret == null) {
                return null;
            } else {
                ret = ret[keys[i]];
            }
        }
    }
    return ret;
};

Utility.prototype.saveImageBase64 = function (base, path, name) {
    var prePath = "/opt/balticapp/lukeapi/public/images/";
    var url = "http://www.balticapp.fi/images/";
    if (base != null) {
        try {
            var format = ".jpeg";

            var fullpath = prePath + path + name + format;

            var imageBuffer = new Buffer(base, 'base64');

            fs.writeFile(fullpath, imageBuffer, function (err) {
                if (err) console.log(err);

            });
            return url + path + name + format;
        } catch (e) {
            console.log(e);
            return null;
        }
    } else {
        console.log("Error: base is empty");
        return null;
    }
};
Utility.prototype.saveImage = function (image, path, name) {
    var prePath = "/opt/balticapp/lukeapi/public/images/";
    var url = "http://www.balticapp.fi/images/";
    var format = ".jpeg";

    var fullPath = prePath + path + name + format;
    if (image == null) {
        console.log("ERROR: Image is empty");
        return null;
    } else {
        fs.readFile(image.uri, function (err, data) {
            if (err) console.log("ERROR READ ", err);
            //console.log(data);
            fs.writeFile(fullPath, data, function (err) {
                if (err) console.log("ERROR WRITE", err);

            });
        });
        return url + path + name + format;
    }
};
Utility.prototype.saveThumbnailBase64 = function (base, path, name) {
    var prePath = "/opt/balticapp/lukeapi/public/thumbnails/";
    var url = "http://www.balticapp.fi/thumbnails/";
    if (base != null) {
        try {
            var format = ".jpeg";

            var fullpath = prePath + path + name + format;

            var imageBuffer = new Buffer(base, 'base64');

            fs.writeFile(fullpath, imageBuffer, function (err) {
                if (err) console.log(err);
                gm(fullpath).resize(40);

            });
            return url + path + name + format;
        } catch (e) {
            console.log(e);
            return null;
        }
    } else {
        console.log("Error: base is empty");
        return null;
    }
};

module.exports = Utility;