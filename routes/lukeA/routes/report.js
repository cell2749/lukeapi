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
var UtModule = require("../../utility");
var Utility = new UtModule([
    //Omit Keyes to be updated by user
    "id",
    "_id",
    "__v",
    "image_url",
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
]);
const MONGO_PROJECTION ={
    _id: 0,
    __v: 0
};
/**
 * @api {get} /lukeA/report Get report(s)
 * @apiName GetAll
 * @apiGroup Report
 *
 * @apiParam {String} [id] Id of a report in case single report needs to be viewed.
 * @apiParam {Boolean} [approved] Filter results by approved value
 * @apiParam {Boolean} [flagged] Filter results by flagged value
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
 * Admins and advanced users have more options to filter the results.
 * Location filter is available for public. Returns single report in case id is specified.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeA/report?submitterId=facebook|ad10ed1j2d010d21
 *
 * @apiUse specialAdmin
 * @apiUse specialAdv
 */
router.get('/',function(req,res){
    var data = req.query;
    var returnResult=[];
    var limit = data.limit || 0;
    var rating = data.rating;

    //deg2rad might not be necessary
    var location = {
        long : Utility.deg2rad(data.long),
        lat : Utility.deg2rad(data.lat)
    };
    var distance = data.distance || 5000;

    // Set up "Constants"
    const m1 = 111132.92;		// latitude calculation term 1
    const m2 = -559.82;		// latitude calculation term 2
    const m3 = 1.175;			// latitude calculation term 3
    const m4 = -0.0023;		// latitude calculation term 4
    const p1 = 111412.84;		// longitude calculation term 1
    const p2 = -93.5;			// longitude calculation term 2
    const p3 = 0.118;			// longitude calculation term 3

    var latlen = m1 + (m2 * Math.cos(2 * location.lat)) + (m3 * Math.cos(4 * location.lat)) +
        (m4 * Math.cos(6 * location.lat));
    var longlen = (p1 * Math.cos(location.lat)) + (p2 * Math.cos(3 * location.lat)) +
        (p3 * Math.cos(5 * location.lat));

    var id = data.id ||{$ne:null};
    var approved = {$ne:null};
    var flagged = {$ne:null};
    var submitterId = data.submitterId || {$ne:null};

    if(req.isAuthenticated()) {
        var appMetadata = req.user.profile._json.app_metadata || {};
        var roles = appMetadata.roles || [];
        if (roles.indexOf("admin") != -1 || roles.indexOf("advanced") != -1) {
            approved = data.approved || approved;
            flagged = data.flagged || flagged;
        }
    }
    ReportModel.find({id:id,approved:approved,submitterId:submitterId,flagged:flagged},MONGO_PROJECTION).sort({"date":-1}).limit(parseInt(limit)).exec(function(err, collection){
        if(err) throw err;
        var result = [];
        if(rating!=null) {
            for (i = 0; i < collection.length; i++) {
                if (collection[i].rating != null && rating < collection[i].rating) {
                    result.push(collection[i]);
                }
            }
        }else{
            result=collection;
        }

        if(distance&&location.long&&location.lat) {
            for (var i = 0; i < result.length; i++) {

                if(result[i].latitude!=null&&result[i].longitude!=null) {
                    if (((location.long - result[i].longitude) * longlen) ^ 2 + ((location.lat - result[i].latitude) * latlen) ^ 2 <= distance ^ 2) {
                        returnResult.push(result);
                    }
                }
                if(i==result.length-1){
                    res.status(200).json(returnResult);
                }
                //might require improvement right here
            }
        }else {
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
 * @apiParam {String} altitude Altitude of a point where report was made
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
 * Creates report with specified parameter. Some parameters are restricted from user to manage them.
 * Returns the created report. Adds experience to user from active experience pattern.
 * <strong>Requires active experience pattern!</strong>
 * <strong>Implementation not rady yet due to image</strong>
 *
 * @apiExample Example:
 * !!!!Example not ready yet due to image implementation!!!
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
 * @apiErrorExample Missing altitude:
 *      HTTP/1.1 422
 *      {
 *          error:"Missing altitude"
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
router.post('/create',jwtCheck,authConverter,restrictBanned,function(req,res,next) {
    var data = req.body;
    var id = mongoose.Types.ObjectId();

    if (data.longitude == null) {
        res.status(422).json({error: "Missing longitude"});
    } else if (data.latitude == null) {
        res.status(422).json({error: "Missing latitude"});
    } else if (data.altitude == null) {
        res.status(422).json({error: "Missing altitude"});
    } else if (data.description == null) {
        res.status(422).json({error: "Missing description"});
    } else if (data.categoryId == null) {
        res.status(422).json({error: "Missing categoryId"});
    } else {
        ExperienceModel.findOne({active: true}, function (err, exp) {
            if (err) throw err;
            if (exp) {
                UserModel.findOne({id: req.user.profile.id}, function (err, doc) {
                    doc.score = doc.score + exp.reportGain;
                    var report = new ReportModel();
                    //var vote = new VoteModel();

                    for (var key in report.schema.paths) {
                        if (Utility.allowKey(key)) {
                            report[key] = data[key] || report[key];
                        }
                    }
                    if (report.date == null) {
                        report.date = new Date().toISOString();
                    }
                    //vote.report.id = id;
                    report._id = id;
                    report.id = id;
                    report.votes = {};
                    report.approved = true;
                    report.flagged = false;
                    report.date = new Date().toISOString();

                    report.image_url = Utility.saveImage(req, "lukeA/report/", id);
                    report.submitterId = req.user.profile.id;
                    doc.save();
                    report.save(function (err, report) {
                        if (err)throw err;
                        var returnV = {};
                        for (var key in ReportModel.schema.paths) {
                            returnV[key] = report[key];
                        }
                        res.status(200).json(returnV);
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
router.post("/update",jwtCheck,authConverter,restrictBanned,function(req,res){
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
    ReportModel.findOne({id:data.id},function(err,doc) {
        if (doc.submitterId != req.user.profile.id) {
            res.status(401).json({error:"Restricted Access"});
        } else {
            if (doc) {
                var pattern = new ReportModel();
                for (var key in pattern.schema.paths) {
                    if (omitKeyes.indexOf(key) == -1) {
                        doc[key] = data[key] || doc[key];
                    }
                }
                doc.image_url = Utility.saveImage(req,"lukeA/report/",doc.id) || doc.image_url;
                doc.save(function(err,result){
                    var returnV={}, reportPattern = new ReportModel();
                    for(var key in reportPattern.schema.paths){
                        returnV[key]=result[key];
                    }
                    res.status(200).json(returnV);
                });

            } else {
                res.status(404).json({error:"No report with such id"});
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
 * @apiErrorExample Id is missing or wrong:
 *      HTTP/1.1 404
 *      {
 *          error:"No report with such id"
 *      }
 * @apiUse specialAdmin
 */
router.get("/remove",jwtCheck,authConverter,function(req,res){
    var data = req.query;
    var id = data.id;
    var appMetadata = req.user.profile._json.app_metadata || {};
    var adminRoles = appMetadata.roles || [];
    ReportModel.findOne({id:id},{"submitterId":1},function(err,doc) {
        if(err)throw err;
        if ((doc.submitterId == req.user.profile.id || adminRoles.indexOf("admin")!=-1)&&doc.length!=0) {
            Utility.deleteImage(doc.image_url);
            ReportModel.find({id: id}).remove(function (err, item) {
                if (err) throw err;

                if (item.result.n != 0) {
                    res.status(200).json({success:"Removed " + item.result.n + " items"});
                } else {
                    res.status(404).json({error:"No report with such id"});
                }
            });
        }else{
            if(doc.length!=0){
                res.status(401).json({error: "Restricted Access"});
            }else {
                res.status(404).json({error:"No report with such id"});
            }
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
router.get("/approve",jwtCheck,authConverter,requiresRole("admin"),function(req,res){
    var data = req.query;
    var id = data.id;
    ReportModel.findOne({id:id},function(err,doc){
        if(err) throw err;
        if(doc) {
            doc.approved = true;
            doc.save(function(err,result){
                if(err) throw err;
                res.status(200).json({success:true});
            });
        }else{
            res.status(404).json({error:"No report with such id"});
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
router.get("/disapprove",jwtCheck,authConverter,requiresRole("admin"),function(req,res){
    var data = req.query;
    var id = data.id;
    ReportModel.findOne({id:id},function(err,doc){
        if(err) throw err;
        if(doc) {
            doc.approved = false;
            doc.save(function(err,result){
                if(err) throw err;
                res.status(200).json({success:true});
            });
        }else{
            res.status(200).json({error:"No report with such id"});
        }
    });
});
/**
 * @api {get} /lukeA/report/flag Flag
 * @apiName Flag
 * @apiGroup Report
 *
 * @apiParam {String} id Id of a report to be flagged
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          success: true
 *      }
 *
 * @apiSuccess {Boolean} success If true, flagging was successful
 *
 * @apiDescription
 * Flag the report with specified id. Currently there is no role restriction on the use of this function.
 *
 * @apiExample Example:
 * http://balticapp.fi/lukeA/report/flag?id=2121ge921ed123d1
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse banned
 * @apiErrorExample Id is missing or wrong:
 *      HTTP/1.1 404
 *      {
 *          error:"No report with such id"
 *      }
 */
router.get("/flag",jwtCheck,authConverter,restrictBanned,function(req,res){
    var data = req.query;
    var id = data.id;
    ReportModel.findOne({id:id},function(err,doc){
        if(err) throw err;
        if(doc) {
            doc.flagged = true;
            doc.save(function(err,result){
                if(err) throw err;
                res.status(200).json({success:true});
            });
        }else{
            res.status(200).json({error:"No report with such id"});
        }
    });
});
/**
 * @api {get} /lukeA/report/unflag Unflag
 * @apiName Unflag
 * @apiGroup Report
 *
 * @apiParam {String} id Id of a report to be unflagged
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          success: true
 *      }
 *
 * @apiSuccess {Boolean} success If true, unflagging was successful
 *
 * @apiDescription
 * Unflag the report with specified id. Only admin can unflag the report.
 *
 * @apiExample Example:
 * http://balticapp.fi/lukeA/report/unflag?id=2121ge921ed123d1
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse roleAdmin
 * @apiErrorExample Id is missing or wrong:
 *      HTTP/1.1 404
 *      {
 *          error:"No report with such id"
 *      }
 */
router.get("/unflag",jwtCheck,authConverter,requiresRole("admin"),function(req,res){
    var data = req.query;
    var id = data.id;
    ReportModel.findOne({id:id},function(err,doc){
        if(err) throw err;
        if(doc) {
            doc.flagged = false;
            doc.save(function(err,result){
                if(err) throw err;
                res.status(200).json({success:true});
            });
        }else{
            res.status(200).json({error:"No report with such id"});
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
router.get("/upvote",jwtCheck,authConverter,restrictBanned,function(req,res) {
    var userId = req.user.profile.id;
    var reportId = req.query.id;
    if (reportId != null) {
        ExperienceModel.findOne({active: true}, function (err, exp) {
            if (err) throw err;
            if (exp) {
                ReportModel.findOne({id: reportId}, function (err, doc) {
                    if (err) throw err;
                    if (doc) {
                        UserModel.findOne({id: doc.submitterId}, function (err, usr) {
                            if (err) throw err;
                            if (usr) {
                                usr.score = usr.score + exp.upvoteGain;
                                var exists = false;
                                for (var i = 0; i < doc.votes.length; i++) {
                                    if (doc.votes[i].userId == userId) {
                                        exists = true;
                                        if (!doc.votes[i].vote) {
                                            doc.votes[i].vote = true;
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
                                    if (doc.rating != null) {
                                        doc.rating++;
                                    } else {
                                        doc.rating = 1;
                                    }
                                }
                                doc.save();
                                res.status(200).json({success: true});
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
router.get("/downvote",jwtCheck,authConverter,restrictBanned,function(req,res) {
    var userId = req.user.profile.id;
    var reportId = req.query.id;
    if (reportId != null) {
        ExperienceModel.findOne({active: true}, function (err, exp) {
            if (err) throw err;
            if (exp) {
                ReportModel.findOne({id: reportId}, function (err, doc) {
                    if (err) throw err;
                    if (doc) {
                        UserModel.findOne({id: doc.submitterId}, function (err, usr) {
                            if (err) throw err;
                            if (usr) {
                                usr.score = usr.score + exp.downvoteGain;

                                var exists = false;
                                for (var i = 0; i < doc.votes.length; i++) {
                                    if (doc.votes[i].userId == userId) {
                                        exists = true;
                                        if (doc.votes[i].vote) {
                                            doc.votes[i].vote = false;
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
                                    if (doc.rating != null) {
                                        doc.rating--;
                                    } else {
                                        doc.rating = -1;
                                    }
                                }
                                doc.save();
                                res.status(200).json({success: true});
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
router.get("/vote",jwtCheck,authConverter,restrictBanned,function(req,res) {
    var data = req.query;
    var userId = req.user.profile.id;
    var reportId = data.id;
    var vote = data.vote;
    if (reportId != null && vote != null) {
        ExperienceModel.findOne({active: true}, function (err, exp) {
            if (err) throw err;

            if (exp) {
                ReportModel.findOne({id: reportId}, function (err, doc) {
                    if (err) throw err;
                    if (doc) {
                        UserModel.findOne({id: doc.submitterId}, function (err, usr) {
                            if (err) throw err;

                            if (usr) {
                                if (vote == "true" || vote == 1) {
                                    var exists = false;
                                    for (var i = 0; i < doc.votes.length; i++) {
                                        if (doc.votes[i].userId == userId) {
                                            exists = true;
                                            if (!doc.votes[i].vote) {
                                                doc.votes[i].vote = true;
                                                usr.score = usr.score + exp.upvoteGain;
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
                                                usr.score = usr.score + exp.downvoteGain;
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
                                doc.save();
                                res.status(200).json({success: true});
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
router.get("/downvote-count",function(req,res){
    var data = req.query;
    var count=0;
    if(data.id) {
        ReportModel.findOne({id: data.id}, function (err, doc) {
            if(err)throw err;
            if(doc){
                for(var i=0;i<doc.votes.length;i++){
                    if(!doc.votes[i].vote){
                        count++;
                    }
                    if(i==doc.votes.length-1){
                        res.status(200).json({count:count});
                    }
                }
            }else{
                res.status(404).json({error:"No report with such id"});
            }
        });
    }else{
        res.status(422).json({error:"Missing report id"});
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
router.get("/upvote-count",function(req,res){
    var data = req.query;
    var count=0;
    if(data.id) {
        ReportModel.findOne({id: data.id}, function (err, doc) {
            if(err)throw err;
            if(doc){
                for(var i=0;i<doc.votes.length;i++){
                    if(doc.votes[i].vote){
                        count++;
                    }
                    if(i==doc.votes.length-1){
                        res.status(200).json({count:count});
                    }
                }
            }else{
                res.status(200).json({error:"No report with such id"});
            }
        });
    }else{
        res.status(200).json({error:"Missing report id"});
    }
});
module.exports = router;