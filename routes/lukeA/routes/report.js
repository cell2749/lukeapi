/**
 * Created by nikitak on 1.11.2016.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var mongodb = require('../../../mongodb/lukeAdb');
/* SECURITY */
var requiresLogin = require('../../../security/requiresLogin');
var requiresRole = require('../../../security/requiresRole');
var requiresRoles = require('../../../security/requiresRoles');
var restrictBanned = require('../../../security/restrictBanned');
var jwtCheck = require('../../../security/jwtCheck');
var authConverter = require('../../../security/authConverter');

/* MODELS */
var UserModel = require("../../../models/lukeA/UserModel");
var ReportModel = require("../../../models/lukeA/ReportModel");
var RankModel = require("../../../models/lukeA/RankModel");
var ReportCategoryModel = require("../../../models/lukeA/ReportCategoryModel");
var VoteModel = require("../../../models/lukeA/VoteModel");
var ExperienceModel = require("../../../models/lukeA/ExperienceModel");
/* UTILITY */
const FLAG_TRIGGER = 10;
var UtModule = require("../../utility");
var Utility = new UtModule([
    //Omit Keyes to be updated by user
    "id",
    "_id",
    "__v",
    "image_url",
    "thumbnail_url",
    "rating",
    "submitterId",
    "approved",
    "flagged",
    "votes",
    "votes.userId",
    "votes.vote",
    "username",
    "score",
    "rankingId",
    "submitterId"
], 1);
const MONGO_PROJECTION = {
    _id: 0,
    __v: 0
};
/**
 * @api {get} /lukeA/report Get report(s)
 * @apiName GetAll
 * @apiGroup Report
 *
 * @apiParam {String} [id] Id of a report in case single report needs to be viewed.
 * @apiParam {String} [submitterId] Filter results by submitter id
 * @apiParam {String} [long] Filter results by longitude (only if latitude is set). Center of circle.
 * @apiParam {String} [lat] Filter results by latitude (only if longitude is set). Center of circle.
 * @apiParam {String} [distance=5000] Filter results by radius(in meters, only if longitude and latitude is set). Radius of circle.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      [{
 *          id: String
 *          longitude: Number,
 *          latitude: Number,
 *          altitude: Number,
 *          image_url: String,
 *          thumbnail_url: String,
 *          title: String,
 *          description: String,
 *          date: String,
 *          categoryId: [
 *              String
 *          ],
 *          rating: Number,
 *          submitterId: String,
 *          approved: Boolean,
 *          flagged: Boolean,
 *          votes: [
 *             {
 *                  userId: String,
 *                  vote: Boolean
 *              }
 *          ]
 *      }]
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          id: String
 *          longitude: Number,
 *          latitude: Number,
 *          altitude: Number,
 *          image_url: String,
 *          thumbnail_url: String,
 *          title: String,
 *          description: String,
 *          date: String,
 *          categoryId: [
 *              String
 *          ],
 *          rating: Number,
 *          submitterId: String,
 *          approved: Boolean,
 *          flagged: Boolean,
 *          votes: [
 *             {
 *                  userId: String,
 *                  vote: Boolean
 *              }
 *          ]
 *      }
 *
 * @apiSuccess {String} id Report id
 * @apiSuccess {Number} longitude Longtitude of a report
 * @apiSuccess {Number} latitude Latitude of a report
 * @apiSuccess {Number} altitude Altitude of a report
 * @apiSuccess {String} image_url Url to image that report has
 * @apiSuccess {String} thumbnail_url Url to smaller image that report has (40 px)
 * @apiSuccess {String} title Title of a report
 * @apiSuccess {String} description Description of a report
 * @apiSuccess {String} date Date when reprot was made
 * @apiSuccess {Array} categoryId Array containing category ids of a report
 * @apiSuccess {Number} rating Rating of a report
 * @apiSuccess {String} submitterId User id of reports submitter
 * @apiSuccess {Boolean} approved If true indicates that report is approved
 * @apiSuccess {Boolean} flagged If true indicates that report is reported/flagged
 * @apiSuccess {Array} votes Array containing json objects (Below details)
 * @apiSuccess {String} votes[].userId Id of user who voted on this report
 * @apiSuccess {Boolean} votes[].vote False if downvote. True if upvote.
 *
 * @apiDescription
 * Public access and registered users receive only filtered results (approved,!flagged).
 * Location filter is available for public. Returns single report in case id is specified.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeA/report?submitterId=facebook|ad10ed1j2d010d21
 *
 */
router.get('/', function (req, res) {
    var data = req.query;
    var returnResult = [];
    var limit = data.limit || 0;
    var rating = data.rating;

    //deg2rad might not be necessary
    /*var location = {
     long: Utility.deg2rad(data.long),
     lat: Utility.deg2rad(data.lat)
     };*/
    var location = {
        long: data.long,
        lat: data.lat
    };
    var distance = data.distance || 5000;

    var id = data.id || {$ne: null};
    var approved = {$ne: false};
    var flagged = {$ne: true};
    var submitterId = data.submitterId || {$ne: null};

    ReportModel.find({
        id: id,
        approved: approved,
        submitterId: submitterId,
        flagged: flagged
    }, MONGO_PROJECTION).sort({"date": -1}).limit(parseInt(limit)).exec(function (err, collection) {
        if (err) console.log(err);
        var result = [];
        if (rating != null) {
            for (i = 0; i < collection.length; i++) {
                if (collection[i].rating != null && rating < collection[i].rating) {
                    result.push(collection[i]);
                }
            }
        } else {
            result = collection;
        }

        if (distance && location.long && location.lat) {
            for (var i = 0; i < result.length; i++) {

                if (result[i].latitude != null && result[i].longitude != null) {
                    //if (((location.long - result[i].longitude) * longlen) ^ 2 + ((location.lat - result[i].latitude) * latlen) ^ 2 <= distance ^ 2) {
                    if (Utility.getCrow(location.lat, location.long, result[i].latitude, result[i].longitude) <= distance) {
                        returnResult.push(result[i]);
                    }
                }
                if (i == result.length - 1) {
                    res.status(200).json(returnResult);
                }
                //might require improvement right here
            }
        } else {
            res.status(200).json(result);
        }
    });
});
/**
 * @api {get} /lukeA/report/admin-get Get report(s) for Admin
 * @apiName AdminGetAll
 * @apiGroup Report
 *
 * @apiParam {String} [id] Id of a report in case single report needs to be viewed.
 * @apiParam {String} [submitterId] Filter results by submitter id
 * @apiParam {String} [long] Filter results by longitude (only if latitude is set). Center of circle.
 * @apiParam {String} [lat] Filter results by latitude (only if longitude is set). Center of circle.
 * @apiParam {String} [distance=5000] Filter results by radius(in meters, only if longitude and latitude is set). Radius of circle.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      [{
 *          id: String
 *          longitude: Number,
 *          latitude: Number,
 *          altitude: Number,
 *          image_url: String,
 *          thumbnail_url: String,
 *          title: String,
 *          description: String,
 *          date: String,
 *          categoryId: [
 *              String
 *          ],
 *          rating: Number,
 *          submitterId: String,
 *          approved: Boolean,
 *          flagged: Boolean,
 *          votes: [
 *             {
 *                  userId: String,
 *                  vote: Boolean
 *              }
 *          ]
 *      }]
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          id: String
 *          longitude: Number,
 *          latitude: Number,
 *          altitude: Number,
 *          image_url: String,
 *          thumbnail_url: String,
 *          title: String,
 *          description: String,
 *          date: String,
 *          categoryId: [
 *              String
 *          ],
 *          rating: Number,
 *          submitterId: String,
 *          approved: Boolean,
 *          flagged: Boolean,
 *          votes: [
 *             {
 *                  userId: String,
 *                  vote: Boolean
 *              }
 *          ]
 *      }
 *
 * @apiSuccess {String} id Report id
 * @apiSuccess {Number} longitude Longtitude of a report
 * @apiSuccess {Number} latitude Latitude of a report
 * @apiSuccess {Number} altitude Altitude of a report
 * @apiSuccess {String} image_url Url to image that report has
 * @apiSuccess {String} thumbnail_url Url to smaller image that report has (40 px)
 * @apiSuccess {String} title Title of a report
 * @apiSuccess {String} description Description of a report
 * @apiSuccess {String} date Date when reprot was made
 * @apiSuccess {Array} categoryId Array containing category ids of a report
 * @apiSuccess {Number} rating Rating of a report
 * @apiSuccess {String} submitterId User id of reports submitter
 * @apiSuccess {Boolean} approved If true indicates that report is approved
 * @apiSuccess {Boolean} flagged If true indicates that report is reported/flagged
 * @apiSuccess {Array} votes Array containing json objects (Below details)
 * @apiSuccess {String} votes[].userId Id of user who voted on this report
 * @apiSuccess {Boolean} votes[].vote False if downvote. True if upvote.
 *
 * @apiDescription
 * Admin get request returns unfiltered results.
 * Location filter is available for public. Returns single report in case id is specified.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeA/report?submitterId=facebook|ad10ed1j2d010d21
 *
 * @apiUse roleAdmin
 */
router.get("/admin-get", jwtCheck, authConverter, requiresRole("admin"), function (req, res) {
    var data = req.query;
    var returnResult = [];
    var limit = data.limit || 0;
    var rating = data.rating;

    var location = {
        long: data.long,
        lat: data.lat
    };
    var distance = data.distance || 5000;


    var id = data.id || {$ne: null};

    var submitterId = data.submitterId || {$ne: null};

    ReportModel.find({
        id: id,
        submitterId: submitterId
    }, MONGO_PROJECTION).sort({"date": -1}).limit(parseInt(limit)).exec(function (err, collection) {
        if (err) console.log(err);
        var result = [];
        if (rating != null) {
            for (i = 0; i < collection.length; i++) {
                if (collection[i].rating != null && rating < collection[i].rating) {
                    result.push(collection[i]);
                }
            }
        } else {
            result = collection;
        }

        if (distance && location.long && location.lat) {
            for (var i = 0; i < result.length; i++) {

                if (result[i].latitude != null && result[i].longitude != null) {
                    //if (((location.long - result[i].longitude) * longlen) ^ 2 + ((location.lat - result[i].latitude) * latlen) ^ 2 <= distance ^ 2) {
                    if (Utility.getCrow(location.lat, location.long, result[i].latitude, result[i].longitude) <= distance) {
                        returnResult.push(result[i]);
                    }
                }
                if (i == result.length - 1) {
                    res.status(200).json(returnResult);
                }
                //might require improvement right here
            }
        } else {
            res.status(200).json(result);
        }
    });
});
/**
 * @api {post} /lukeA/report/create Create
 * @apiName Create
 * @apiGroup Report
 *
 * @apiParam {String} [title] Title of the report
 * @apiParam {String} longitude Longitude of a point where report was made.
 * @apiParam {String} latitude Latitude of a point where report was made.
 * @apiParam {String} [altitude] Altitude of a point where report was made
 * @apiParam {File} [image] Image file that is bound to a report.*Not yet implemented.
 * @apiParam {String} description Description of a report.
 * @apiParam {Array} categoryId Array containing category ids of a report.
 *
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          id: String
 *          longitude: Number,
 *          latitude: Number,
 *          altitude: Number,
 *          image_url: String,
 *          thumbnail_url: String,
 *          title: String,
 *          description: String,
 *          date: String,
 *          categoryId: [
 *              String
 *          ],
 *          rating: Number,
 *          submitterId: String,
 *          approved: Boolean,
 *          flagged: Boolean,
 *          votes: [
 *             {
 *                  userId: String,
 *                  vote: Boolean
 *              }
 *          ]
 *          positive: Boolean
 *      }
 *
 * @apiSuccess {String} id Report id
 * @apiSuccess {Number} longitude Longitude of a report
 * @apiSuccess {Number} latitude Latitude of a report
 * @apiSuccess {Number} altitude Altitude of a report
 * @apiSuccess {String} image_url Url to image that report has
 * @apiSuccess {String} thumbnail_url Url to smaller image that report has (40 px)
 * @apiSuccess {String} title Title of a report
 * @apiSuccess {String} description Description of a report
 * @apiSuccess {String} date Date when report was made
 * @apiSuccess {Array} categoryId Array containing category ids of a report
 * @apiSuccess {Number} rating Rating of a report
 * @apiSuccess {String} submitterId User id of reports submitter
 * @apiSuccess {Boolean} approved If true indicates that report is approved
 * @apiSuccess {Boolean} flagged If true indicates that report is reported/flagged
 * @apiSuccess {Array} votes Array containing json objects (Below details)
 * @apiSuccess {String} votes[].userId Id of user who voted on this report
 * @apiSuccess {Boolean} votes[].vote False if downvote. True if upvote.
 * @apiSuccess {Boolean} positive Indicates if the report is positive, negative or neutral. If the positive parameter is not present, then it is neutral;
 *
 * @apiDescription
 * Creates report with specified parameter. Some parameters are restricted from user to manage them.
 * Returns the created report. Adds experience to user from active experience pattern.
 * <strong>Requires active experience pattern!</strong>
 *
 * @apiUse specialAdmin
 * @apiUse specialAdv
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse banned
 * @apiErrorExample Missing longitude:
 *      HTTP/1.1 422
 *      {
 *          error:"Missing longitude"
 *      }
 * @apiErrorExample Missing latitude:
 *      HTTP/1.1 422
 *      {
 *          error:"Missing latitude"
 *      }
 * @apiErrorExample Missing description:
 *      HTTP/1.1 422
 *      {
 *          error:"Missing description"
 *      }
 * @apiErrorExample Missing categoryId:
 *      HTTP/1.1 422
 *      {
 *          error:"Missing categoryId"
 *      }
 * @apiErrorExample Experience Model:
 *      HTTP/1.1 404
 *      {
 *          error:"No experience pattern active"
 *      }
 */
router.post('/create', jwtCheck, authConverter, restrictBanned, function (req, res, next) {
    var data = req.body;
    var id = mongoose.Types.ObjectId();

    if (data.longitude == null) {
        res.status(422).json({error: "Missing longitude"});
    } else if (data.latitude == null) {
        res.status(422).json({error: "Missing latitude"});
    } else if (data.description == null) {
        res.status(422).json({error: "Missing description"});
    } else if (data.categoryId == null) {
        res.status(422).json({error: "Missing categoryId"});
    } else {
        ExperienceModel.findOne({active: true}, function (err, exp) {
            if (err) console.log(err);
            if (exp) {
                UserModel.findOne({id: req.user.profile.id}, function (err, doc) {
                    doc.score = doc.score + exp.reportGain;
                    RankModel.find({}, {id: 1, score: 1}, {sort: {score: 1}}, function (err, ranks) {
                        if (err) console.log(err);

                        console.log(ranks);
                        if (ranks.length == 0) {
                            doc.rankingId = null;
                        } else {
                            for (var i = 0; i < ranks.length; i++) {
                                if (doc.score >= ranks[i].score) {
                                    doc.rankingId = ranks[i].id;
                                }
                            }
                        }

                        var report = new ReportModel();
                        //var vote = new VoteModel();

                        for (var key in report.schema.paths) {
                            if (Utility.allowKey(key)) {
                                report[key] = data[key] || report[key];
                            }
                        }
                        if (report.date == null) {
                            var date = new Date();
                            date.setUTCHours(date.getUTCHours()-Math.floor(date.getTimezoneOffset()/60));
                            report.date = date.toISOString();
                        }
                        //vote.report.id = id;
                        report._id = id;
                        report.id = id;
                        report.votes = {};
                        report.approved = null;
                        report.flagged = false;
                        var date = new Date();
                        date.setUTCHours(date.getUTCHours()-Math.floor(date.getTimezoneOffset()/60));
                        report.date = date.toISOString();
                        //Save image and create thumbnail
                        report.image_url = Utility.saveImageBase64(data.image, "lukeA/report/", id);
                        report.thumbnail_url = Utility.saveThumbnailBase64(data.image, "lukeA/report/", id);

                        report.submitterId = req.user.profile.id;
                        doc.save(function (err, userSaved) {
                            if (err) console.log(err);

                            report.save(function (err, reportSaved) {
                                if (err) console.log(err);

                                res.status(200).json(Utility.filter(reportSaved));
                            });
                        });
                    });
                });
            } else {
                res.status(404).json({error: "No experience pattern active"});
            }
        });
    }
});
/**
 * @api {post} /lukeA/report/update Update
 * @apiName Update
 * @apiGroup Report
 *
 * @apiParam {String} id Id of the report
 * @apiParam {String} [title] Title of the report
 * @apiParam {File} [img] Image file that is bound to a report.*Not yet implemented.
 * @apiParam {String} [description] Description of a report.
 * @apiParam {Array} [categoryId] Array containing category ids of a report.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          id: String
 *          longitude: Number,
 *          latitude: Number,
 *          altitude: Number,
 *          image_url: String,
 *          thumbnail_url: String,
 *          title: String,
 *          description: String,
 *          date: String,
 *          categoryId: [
 *              String
 *          ],
 *          rating: Number,
 *          submitterId: String,
 *          approved: Boolean,
 *          flagged: Boolean,
 *          votes: [
 *             {
 *                  userId: String,
 *                  vote: Boolean
 *              }
 *          ]
 *      }
 *
 * @apiSuccess {String} id Report id
 * @apiSuccess {Number} longitude Longtitude of a report
 * @apiSuccess {Number} latitude Latitude of a report
 * @apiSuccess {Number} altitude Altitude of a report
 * @apiSuccess {String} image_url Url to image that report has
 * @apiSuccess {String} thumbnail_url Url to smaller image that report has (40 px)
 * @apiSuccess {String} title Title of a report
 * @apiSuccess {String} description Description of a report
 * @apiSuccess {String} date Date when reprot was made
 * @apiSuccess {Array} categoryId Array containing category ids of a report
 * @apiSuccess {Number} rating Rating of a report
 * @apiSuccess {String} submitterId User id of reports submitter
 * @apiSuccess {Boolean} approved If true indicates that report is approved
 * @apiSuccess {Boolean} flagged If true indicates that report is reported/flagged
 * @apiSuccess {Array} votes Array containing json objects (Below details)
 * @apiSuccess {String} votes[].userId Id of user who voted on this report
 * @apiSuccess {Boolean} votes[].vote False if downvote. True if upvote.
 *
 * @apiDescription
 * Updates the report with new values. Certain properties are forbidden from being updated.
 * All allowed are listed in parameters list.
 * <strong>Implementation not ready yet due to image</strong>
 *
 * @apiExample Example:
 * !!!!Example not ready yet due to image implementation!!!
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse banned
 * @apiErrorExample Owner mismatch:
 *      HTTP/1.1 401
 *      {
 *          error:"Restricted Access"
 *      }
 * @apiErrorExample Id is missing or wrong:
 *      HTTP/1.1 404
 *      {
 *          error:"No report with such id"
 *      }
 */
router.post("/update", jwtCheck, authConverter, restrictBanned, function (req, res) {
    var omitKeyes = [
        "_id",
        "__v",
        "id",
        "longitude",
        "latitude",
        "altitude",
        "date",
        "rating",
        "submitterRating",
        "submitterId",
        "approved",
        "flagged",
        "votes"
    ];
    var data = req.body;
    ReportModel.findOne({id: data.id}, function (err, doc) {
        if (doc.submitterId != req.user.profile.id) {
            res.status(401).json({error: "Restricted Access"});
        } else {
            if (doc) {
                var pattern = new ReportModel();
                for (var key in pattern.schema.paths) {
                    if (omitKeyes.indexOf(key) == -1) {
                        doc[key] = data[key] || doc[key];
                    }
                }
                //Update potential thumbnail
                doc.image_url = Utility.saveImageBase64(data.image, "lukeA/report/", doc.id) || doc.image_url;
                doc.thumbnail_url = Utility.saveThumbnailBase64(data.image, "lukeA/report/", doc.id) || doc.thumbnail_url;

                doc.save(function (err, result) {
                    res.status(200).json(Utility.filter(result));
                });

            } else {
                res.status(404).json({error: "No report with such id"});
            }
        }
    });
});
/**
 * @api {get} /lukeA/report/remove Remove
 * @apiName Remove
 * @apiGroup Report
 *
 * @apiParam {String} id Id of a report to be removed
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          success:"Removed N items"
 *      }
 *
 * @apiSuccess {String} success Contains information on amount of reports removed. Should be 1.
 *
 * @apiDescription
 * Removes the specified report. User can remove his own reports. Admin can remove other users' reports.
 *
 * @apiExample Example:
 * http://balticapp.fi/lukeA/report/remove?id=e1921e921e9219
 *
 * @apiUse error
 * @apiUse loginError
 * @apiErrorExample Owner mismatch:
 *      HTTP/1.1 401
 *      {
 *          error:"Restricted Access"
 *      }
 * @apiErrorExample Id is missing :
 *      HTTP/1.1 404
 *      {
 *          error:"No report with such id"
 *      }
 * @apiErrorExample Wrong Id:
 *      HTTP/1.1 422
 *      {
 *          error:"No report with such id"
 *      }
 * @apiUse specialAdmin
 */
router.get("/remove", jwtCheck, authConverter, function (req, res) {
    var data = req.query;
    var id = data.id;
    var appMetadata = req.user.profile._json.app_metadata || {};
    var adminRoles = appMetadata.roles || [];
    ReportModel.findOne({id: id}, {"submitterId": 1}, function (err, doc) {
        if (err) console.log(err);
        if (doc != null) {
            if ((doc.submitterId == req.user.profile.id || adminRoles.indexOf("admin") != -1)) {
                Utility.deleteImage(doc.image_url);
                Utility.deleteImage(doc.thumbnail_url);
                ReportModel.find({id: id}).remove(function (err, item) {
                    if (err) console.log(err);

                    if (item.result.n != 0) {
                        res.status(200).json({success: "Removed " + item.result.n + " items"});
                    } else {
                        res.status(404).json({error: "No report with such id"});
                    }
                });
            } else {
                res.status(401).json({error: "Restricted Access"});
            }
        } else {
            res.status(422).json({error: "No report with such id"});
        }
    });
});
/**
 * @api {get} /lukeA/report/approve Approve
 * @apiName Approve
 * @apiGroup Report
 *
 * @apiParam {String} id Id of a report to be approved
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          success: true
 *      }
 *
 * @apiSuccess {Boolean} success If true, approving was successful
 *
 * @apiDescription
 * Approves the specified report.
 *
 * @apiExample Example:
 * http://balticapp.fi/lukeA/report/approve?id=2e12adjsaj120jd101290
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse authError
 * @apiErrorExample Id is missing or wrong:
 *      HTTP/1.1 404
 *      {
 *          error:"No report with such id"
 *      }
 * @apiUse roleAdmin
 */
router.get("/approve", jwtCheck, authConverter, requiresRole("admin"), function (req, res) {
    var data = req.query;
    var id = data.id;
    ReportModel.findOne({id: id}, function (err, doc) {
        if (err) console.log(err);
        if (doc) {
            doc.approved = true;
            doc.flagged = false;
            doc.save(function (err, result) {
                if (err) console.log(err);
                res.status(200).json({success: true});
            });
        } else {
            res.status(404).json({error: "No report with such id"});
        }
    });
});
/**
 * @api {get} /lukeA/report/disapprove Disapprove
 * @apiName Disapprove
 * @apiGroup Report
 *
 * @apiParam {String} id Id of a report to be disapproved
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          success: true
 *      }
 *
 * @apiSuccess {Boolean} success If true, disapproving was successful
 *
 * @apiDescription
 * Disapproved the report with specified id.
 *
 * @apiExample Example:
 * http://balticapp.fi/lukeA/report/disapprove?id=2121ge921ed123d1
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse authError
 * @apiErrorExample Id is missing or wrong:
 *      HTTP/1.1 404
 *      {
 *          error:"No report with such id"
 *      }
 * @apiUse roleAdmin
 */
router.get("/disapprove", jwtCheck, authConverter, requiresRole("admin"), function (req, res) {
    var data = req.query;
    var id = data.id;
    ReportModel.findOne({id: id}, function (err, doc) {
        if (err) console.log(err);
        if (doc) {
            doc.approved = "false";
            doc.flagged = true;
            doc.save(function (err, result) {
                if (err) console.log(err);
                res.status(200).json({success: true});
            });
        } else {
            res.status(200).json({error: "No report with such id"});
        }
    });
});
/**
 * @api {get} /lukeA/report/upvote Upvote
 * @apiName Upvote
 * @apiGroup Report
 *
 * @apiParam {String} id Id of a report to be upvoted
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          success: true
 *      }
 *
 * @apiSuccess {Boolean} success If true, upvoting was successful
 *
 * @apiDescription
 * Upvotes the report with specified id.
 * Adds experience to user from active experience pattern. Buffs rating.
 * <strong>Active experience pattern must be present in db.</strong>
 *
 * @apiExample Example:
 * http://balticapp.fi/lukeA/report/upvote?id=2121ge921ed123d1
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse banned
 * @apiErrorExample Id is wrong:
 *      HTTP/1.1 404
 *      {
 *          error:"No report with such id"
 *      }
 * @apiErrorExample Experience pattern:
 *      HTTP/1.1 404
 *      {
 *          error:"No active experience patterns"
 *      }
 * @apiErrorExample Id is missing:
 *      HTTP/1.1 422
 *      {
 *          error:"No report id was provided"
 *      }
 */
router.get("/upvote", jwtCheck, authConverter, restrictBanned, function (req, res) {
    var userId = req.user.profile.id;
    var reportId = req.query.id;
    if (reportId != null) {
        ExperienceModel.findOne({active: true}, function (err, exp) {
            if (err) console.log(err);
            if (exp) {
                ReportModel.findOne({id: reportId}, function (err, doc) {
                    if (err) console.log(err);
                    if (doc) {
                        UserModel.findOne({id: doc.submitterId}, function (err, usr) {
                            if (err) console.log(err);
                            if (usr) {

                                var exists = false;
                                for (var i = 0; i < doc.votes.length; i++) {
                                    if (doc.votes[i].userId == userId) {
                                        exists = true;
                                        if (!doc.votes[i].vote) {
                                            doc.votes[i].vote = true;
                                            usr.score = usr.score + exp.upvoteGain - exp.downvoteGain;
                                            if (doc.rating != null) {
                                                doc.rating++;
                                            } else {
                                                doc.rating = 1;
                                            }
                                        }
                                    }
                                }
                                if (!exists) {
                                    doc.votes.push({userId: userId, vote: true});
                                    usr.score = usr.score + exp.upvoteGain;
                                    if (doc.rating != null) {
                                        doc.rating++;
                                    } else {
                                        doc.rating = 1;
                                    }
                                }
                                RankModel.find({}, {id: 1, score: 1}, {sort: {score: 1}}, function (err, ranks) {
                                    if (err) console.log(err);

                                    if (ranks.length == 0) {
                                        usr.rankingId = null;
                                    } else {
                                        for (var i = 0; i < ranks.length; i++) {
                                            if (usr.score >= ranks[i].score) {
                                                usr.rankingId = ranks[i].id;
                                            }
                                        }
                                    }
                                    doc.save(function (err, docSaved) {
                                        if (err) console.log(err);
                                        usr.save(function (err, usrSaved) {
                                            if (err) console.log(err);
                                            res.status(200).json({success: true});
                                        });

                                    });
                                });
                            } else {
                                res.status(200).json({success: false});
                            }
                        });
                    } else {
                        res.status(404).json({error: "No report with such id"});

                    }
                });
            } else {
                res.status(404).json({error: "No active experience patterns"});
            }
        });
    } else {
        res.status(422).json({error: "No report id was provided"});
    }
});
/**
 * @api {get} /lukeA/report/downvote Downvote
 * @apiName Downvote
 * @apiGroup Report
 *
 * @apiParam {String} id Id of a report to be downvoted
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          success: true
 *      }
 *
 * @apiSuccess {Boolean} success If true, downvoting was successful
 *
 * @apiDescription
 * Downvotes the report with specified id. Active experience pattern must be present in db.
 * Adds experience to user from active experience pattern. Diminishes rating.
 *
 * @apiExample Example:
 * http://balticapp.fi/lukeA/report/upvote?id=2121ge921ed123d1
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse banned
 * @apiErrorExample Id is wrong:
 *      HTTP/1.1 404
 *      {
 *          error:"No report with such id"
 *      }
 * @apiErrorExample Experience pattern:
 *      HTTP/1.1 404
 *      {
 *          error:"No active experience patterns"
 *      }
 * @apiErrorExample Id is missing:
 *      HTTP/1.1 422
 *      {
 *          error:"No report id was provided"
 *      }
 */
router.get("/downvote", jwtCheck, authConverter, restrictBanned, function (req, res) {
    var userId = req.user.profile.id;
    var reportId = req.query.id;
    if (reportId != null) {
        ExperienceModel.findOne({active: true}, function (err, exp) {
            if (err) console.log(err);
            if (exp) {
                ReportModel.findOne({id: reportId}, function (err, doc) {
                    if (err) console.log(err);
                    if (doc) {
                        UserModel.findOne({id: doc.submitterId}, function (err, usr) {
                            if (err) console.log(err);
                            if (usr) {
                                var exists = false;
                                for (var i = 0; i < doc.votes.length; i++) {
                                    if (doc.votes[i].userId == userId) {
                                        exists = true;
                                        if (doc.votes[i].vote) {
                                            doc.votes[i].vote = false;
                                            usr.score = usr.score + exp.downvoteGain - exp.upvoteGain;
                                            if (doc.rating != null) {
                                                doc.rating--;
                                            } else {
                                                doc.rating = -1;
                                            }
                                        }
                                    }
                                }
                                if (!exists) {
                                    doc.votes.push({userId: userId, vote: false});
                                    usr.score = usr.score + exp.downvoteGain;
                                    if (doc.rating != null) {
                                        doc.rating--;
                                    } else {
                                        doc.rating = -1;
                                    }
                                }
                                RankModel.find({}, {id: 1, score: 1}, {sort: {score: 1}}, function (err, ranks) {
                                    if (err) console.log(err);

                                    if (ranks.length == 0) {
                                        usr.rankingId = null;
                                    } else {
                                        for (var i = 0; i < ranks.length; i++) {
                                            if (usr.score >= ranks[i].score) {
                                                usr.rankingId = ranks[i].id;
                                            }
                                        }
                                    }
                                    doc.save(function (err, docSaved) {
                                        if (err) console.log(err);
                                        usr.save(function (err, usrSaved) {
                                            if (err) console.log(err);
                                            res.status(200).json({success: true});
                                        });
                                    });

                                });
                            } else {
                                res.status(200).json({success: false});
                                //res.status(200).json({error: "Report does not have a submitter"});
                            }
                        });
                    } else {
                        res.status(404).json({error: "No report with such id"});
                    }
                });
            } else {
                res.status(404).json({error: "No experience patterns"});
            }
        });
    } else {
        res.status(422).json({error: "No report id was provided"});
    }
});
/**
 * @api {get} /lukeA/report/vote Vote
 * @apiName Vote
 * @apiGroup Report
 *
 * @apiParam {String} id Id of a report to be voted
 * @apiParam {Boolean} vote Value of a report. True - upvote. False - downvote.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          success: true
 *      }
 *
 * @apiSuccess {Boolean} success If true, downvoting was successful
 *
 * @apiDescription
 * Votes the report with specified id. Active experience pattern must be present in db.
 * Adds experience to user from active experience pattern. Buffs or substracts rating.
 *
 * @apiExample Example:
 * http://balticapp.fi/lukeA/report/vote?id=2121ge921ed123d1&vote=true
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse banned
 * @apiErrorExample Id is wrong:
 *      HTTP/1.1 404
 *      {
 *          error:"No report with such id"
 *      }
 * @apiErrorExample Experience pattern:
 *      HTTP/1.1 404
 *      {
 *          error:"No active experience patterns"
 *      }
 * @apiErrorExample Id or vote is missing:
 *      HTTP/1.1 422
 *      {
 *          error:"Report id or vote was not specified"
 *      }
 */
router.get("/vote", jwtCheck, authConverter, restrictBanned, function (req, res) {
    var data = req.query;
    var userId = req.user.profile.id;
    var reportId = data.id;
    var vote = data.vote;
    if (reportId != null && vote != null) {
        ExperienceModel.findOne({active: true}, function (err, exp) {
            if (err) console.log(err);

            if (exp) {
                ReportModel.findOne({id: reportId}, function (err, doc) {
                    if (err) console.log(err);
                    if (doc) {
                        UserModel.findOne({id: doc.submitterId}, function (err, usr) {
                            if (err) console.log(err);

                            if (usr) {
                                if (vote == "true" || vote == 1) {
                                    var exists = false;
                                    for (var i = 0; i < doc.votes.length; i++) {
                                        if (doc.votes[i].userId == userId) {
                                            exists = true;
                                            if (!doc.votes[i].vote) {
                                                doc.votes[i].vote = true;
                                                usr.score = usr.score + exp.upvoteGain - exp.downvoteGain;
                                                if (doc.rating != null) {
                                                    doc.rating++;
                                                } else {
                                                    doc.rating = 1;
                                                }
                                            }
                                        }
                                    }
                                    if (!exists) {
                                        doc.votes.push({userId: userId, vote: true});
                                        usr.score = usr.score + exp.upvoteGain;
                                        if (doc.rating != null) {
                                            doc.rating++;
                                        } else {
                                            doc.rating = 1;
                                        }
                                    }
                                } else {
                                    var exists = false;
                                    for (var i = 0; i < doc.votes.length; i++) {
                                        if (doc.votes[i].userId == userId) {
                                            exists = true;
                                            if (doc.votes[i].vote) {
                                                doc.votes[i].vote = false;
                                                usr.score = usr.score + exp.downvoteGain - exp.upvoteGain;
                                                if (doc.rating != null) {
                                                    doc.rating--;
                                                } else {
                                                    doc.rating = -1;
                                                }
                                            }
                                        }
                                    }
                                    if (!exists) {
                                        doc.votes.push({userId: userId, vote: false});
                                        usr.score = usr.score + exp.downvoteGain;
                                        if (doc.rating != null) {
                                            doc.rating--;
                                        } else {
                                            doc.rating = -1;
                                        }
                                    }
                                }
                                RankModel.find({}, {id: 1, score: 1}, {sort: {score: 1}}, function (err, ranks) {
                                    if (err) console.log(err);

                                    if (ranks.length == 0) {
                                        usr.rankingId = null;
                                    } else {
                                        for (var i = 0; i < ranks.length; i++) {
                                            if (usr.score >= ranks[i].score) {
                                                usr.rankingId = ranks[i].id;
                                            }
                                        }
                                    }
                                    doc.save(function (err, docSaved) {
                                        if (err) console.log(err);
                                        usr.save(function (err, usrSaved) {
                                            if (err) console.log(err);
                                            res.status(200).json({success: true});
                                        });
                                    });

                                });
                            } else {
                                res.status(200).json({success: true});
                                //res.status(200).json({error: "Report does not have a submitter"});
                            }
                        });
                    } else {
                        res.status(404).json({error: "No report with such id"});
                    }
                });
            } else {
                res.status(404).json({error: "No experience patterns"});
            }
        });
    } else {
        res.status(422).json({error: "Report id or vote was not specified"});
    }
});
/**
 * @api {get} /lukeA/report/downvote-count Downvote count
 * @apiName DownvoteCount
 * @apiGroup Report
 *
 * @apiParam {String} id Id of a report
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          count: true
 *      }
 *
 * @apiSuccess {Number} count Amount of downvotes
 *
 * @apiDescription
 * Returns the count of downvotes of a report
 *
 * @apiExample Example:
 * http://balticapp.fi/lukeA/report/downvote-count?id=2121ge921ed123d1
 *
 * @apiErrorExample Id is wrong:
 *      HTTP/1.1 404
 *      {
 *          error:"No report with such id"
 *      }
 * @apiErrorExample Id is missing:
 *      HTTP/1.1 422
 *      {
 *          error:"Report id or vote was not specified"
 *      }
 */
router.get("/downvote-count", function (req, res) {
    var data = req.query;
    var count = 0;
    if (data.id) {
        ReportModel.findOne({id: data.id}, function (err, doc) {
            if (err) console.log(err);
            if (doc) {
                for (var i = 0; i < doc.votes.length; i++) {
                    if (!doc.votes[i].vote) {
                        count++;
                    }
                    if (i == doc.votes.length - 1) {
                        res.status(200).json({count: count});
                    }
                }
            } else {
                res.status(404).json({error: "No report with such id"});
            }
        });
    } else {
        res.status(422).json({error: "Missing report id"});
    }
});
/**
 * @api {get} /lukeA/report/upvote-count Upvote count
 * @apiName UpvoteCount
 * @apiGroup Report
 *
 * @apiParam {String} id Id of a report
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          count: true
 *      }
 *
 * @apiSuccess {Number} count Amount of upvotes
 *
 * @apiDescription
 * Returns the count of upvotes of a report
 *
 * @apiExample Example:
 * http://balticapp.fi/lukeA/report/upvote-count?id=2121ge921ed123d1
 *
 * @apiErrorExample Id is wrong:
 *      HTTP/1.1 404
 *      {
 *          error:"No report with such id"
 *      }
 * @apiErrorExample Id is missing:
 *      HTTP/1.1 422
 *      {
 *          error:"Report id or vote was not specified"
 *      }
 */
router.get("/upvote-count", function (req, res) {
    var data = req.query;
    var count = 0;
    if (data.id) {
        ReportModel.findOne({id: data.id}, function (err, doc) {
            if (err) console.log(err);
            if (doc) {
                for (var i = 0; i < doc.votes.length; i++) {
                    if (doc.votes[i].vote) {
                        count++;
                    }
                    if (i == doc.votes.length - 1) {
                        res.status(200).json({count: count});
                    }
                }
            } else {
                res.status(200).json({error: "No report with such id"});
            }
        });
    } else {
        res.status(200).json({error: "Missing report id"});
    }
});
/**
 * @api {get} /lukeA/report/flag Flag
 * @apiName Flag
 * @apiGroup Report
 *
 * @apiParam {String} id Id of the report
 *
 * @apiSuccess {Boolean} success True if report was flagged/unflagged successfully
 * @apiSuccess {Boolean} flagged True if threshold reached and report is now officially flagged.
 * @apiSuccess {Boolean} action Flag if true unflag if false
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200
 *      {
 *          success:true,
 *          flagged: Boolean,
 *          action: Boolean
 *
 *      }
 * @apiDescription
 * Adds or removes flag in report by id. If the flags reach threshold the report is flagged, if they are below threshold, it is unflagged.
 * Threshold currently 10.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeA/report/flag?id=y892128121u08
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse banned
 * @apiErrorExample Missing Id:
 *      HTTP/1.1 404
 *      {
 *          error: "No report with such id"
 *      }
 */
router.get("/flag", jwtCheck, authConverter, restrictBanned, function (req, res) {
    var data = req.query;
    var id = data.id;
    var action;
    ReportModel.findOne({id: id}, function (err, doc) {
        if (err) throw err;
        if (doc) {
            if (doc.flags.indexOf(req.user.profile.id) == -1) {
                doc.flags.push(req.user.profile.id);
                action=true
            } else {
                doc.flags.splice(doc.flags.indexOf(req.user.profile.id), 1);
                action=false;
            }
            if (doc.approved == null) {
                if (doc.flags.length >= FLAG_TRIGGER) {
                    doc.flagged = true;
                } else {
                    doc.flagged = false;

                }
            }
            doc.save(function (err, result) {
                if (err) throw err;
                res.status(200).json({success: true, flagged: result.flagged,action:action});
            });
        }
        else {
            res.status(200).json({error: "No report with such id"});
        }
    });
});


module.exports = router;