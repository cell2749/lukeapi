/**
 * Created by nikitak on 1.11.2016.
 */
/**
 * Created by nikitak on 1.11.2016.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var mongodb = require('../../../mongodb/lukeBdb');
/* SECURITY */
var requiresLogin = require('../../../security/requiresLogin');
var requiresRole = require('../../../security/requiresRole');
var requiresRoles = require('../../../security/requiresRoles');
var restrictBanned = require('../../../security/restrictBanned');
/* MODELS */
var UserModel = require("../../../models/lukeB/UserModel");
var ReportModel = require("../../../models/lukeB/ReportModel");
var PlaceModel = require("../../../models/lukeB/PlaceModel");
var CommentModel = require("../../../models/lukeB/CommentModel");
var CategoryModel = require("../../../models/lukeB/CategoryModel");
/*Utility*/
var UtModule = require("../../utility");
var Utility = new UtModule([
    "id",
    "_id",
    "__v",
    "profileId",
    "image_url",
    "votes",
    "votes.profileId",
    "votes.vote",
    "votes.date",
    "flagged",
    "approved"
],5);
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
 * @apiParam {String} [profileId] Filter results by submitters' id
 * @apiParam {String} [long] Filter results by longitude (only if latitude is set). Center of circle.
 * @apiParam {String} [lat] Filter results by latitude (only if longitude is set). Center of circle.
 * @apiParam {String} [distance=5000] Filter results by radius(in meters, only if longitude and latitude is set). Radius of circle.
 *
 * @apiSuccessExample Success-Response-Multiple:
 *      HTTP/1.1 200 OK
 *      [{
 *          id: String,
 *          title: String,
 *          location: {
 *              long: Number,
 *              lat: Number
 *          },
 *          categoryId: [String],
 *          image_url: String,
 *          description: String,
 *          profileId: String,
 *          date: String,
 *          votes:[{
 *              profileId:String,
 *              date:String,
 *              vote:Boolean
 *          }],
 *          approved: Boolean,
 *          flagged: Boolean
 *      }]
 * @apiSuccessExample Success-Response-Single:
 *      HTTP/1.1 200 OK
 *      {
 *          id: String,
 *          title: String,
 *          location: {
 *              long: Number,
 *              lat: Number
 *          },
 *          categoryId: [String],
 *          image_url: String,
 *          description: String,
 *          profileId: String,
 *          date: String,
 *          votes:[{
 *              profileId:String,
 *              date:String,
 *              vote:Boolean
 *          }],
 *          approved: Boolean,
 *          flagged: Boolean
 *      }
 *
 * @apiSuccess {String} id Report id
 * @apiSuccess {Object} location Json object containing longitude and latitude
 * @apiSuccess {Number} longitude Longtitude of a report
 * @apiSuccess {Number} latitude Latitude of a report
 * @apiSuccess {String} image_url Url to image that report has
 * @apiSuccess {String} title Title of a report
 * @apiSuccess {String} description Description of a report
 * @apiSuccess {String} date Date when reprot was made
 * @apiSuccess {Array} categoryId Array containing category ids of a report
 * @apiSuccess {String} profileId User id of reports submitter
 * @apiSuccess {Boolean} approved If true indicates that report is approved
 * @apiSuccess {Boolean} flagged If true indicates that report is reported/flagged
 * @apiSuccess {Array} votes Array containing json objects (Below details)
 * @apiSuccess {String} votes[].userId Id of user who voted on this report
 * @apiSuccess {Boolean} votes[].vote False if downvote. True if upvote.
 * @apiSuccess {String} votes[].date Date when vote was made
 *
 * @apiDescription
 * Public access and registered users receive only filtered results (approved,!flagged).
 * Admins and advanced users have more options to filter the results.
 * Location filter is available for public. Returns single report in case id is specified.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeB/report?profileId=facebook|ad10ed1j2d010d21
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
        long : deg2rad(data.long),
        lat : deg2rad(data.lat)
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

    var approved = true; //{$ne:null};
    var flagged = false; //{$ne:null};
    var id = data.id || {$ne:null};
    var profileId = data.profileId || {$ne:null};
    var showVotes = 0;
    if(data.votes=="false"||data.votes==0){
        showVotes = 0;
    }else if(data.votes=="true"||data.votes==1){
        showVotes = 1;
    }
    var newProjection = MONGO_PROJECTION;
    newProjection[votes]=showVotes;

    if(req.isAuthenticated()) {
        var appMetadata = req.user.profile._json.app_metadata || {};
        var roles = appMetadata.roles || [];
        if (roles.indexOf("admin") != -1 || roles.indexOf("advanced") != -1) {
            approved = data.approved || approved;
            flagged = data.flagged || flagged;
        }
    }
    ReportModel.find({id:id, approved:approved,profileId:profileId,flagged:flagged},newProjection).sort({"date":-1}).limit(parseInt(limit)).exec(function(err, collection){
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

                if(result[i].location.lat!=null&&result[i].location.long!=null) {
                    if (((location.long - result[i].location.long) * longlen) ^ 2 + ((location.lat - result[i].location.lat) * latlen) ^ 2 <= distance ^ 2) {
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
 * @apiParam {String} title Title of a report
 * @apiParam {Object} [location] Json object containing longitude and latitude
 * @apiParam {Number} [location.longitude] Longtitude of a report
 * @apiParam {Number} [location.latitude] Latitude of a report
 * @apiParam {File} [image] Image file to be used in a report
 * @apiParam {String} [description] Description of a report
 * @apiParam {String} [date] Date when report was made*
 * @apiParam {Array} [categoryId] Array containing category ids of a report
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          id: String,
 *          title: String,
 *          location: {
 *              long: Number,
 *              lat: Number
 *          },
 *          categoryId: [String],
 *          image_url: String,
 *          description: String,
 *          profileId: String,
 *          date: String,
 *          votes:[{
 *              profileId:String,
 *              date:String,
 *              vote:Boolean
 *          }],
 *          approved: Boolean,
 *          flagged: Boolean
 *      }
 *
 * @apiSuccess {String} id Report id
 * @apiSuccess {Object} location Json object containing longitude and latitude
 * @apiSuccess {Number} longitude Longtitude of a report
 * @apiSuccess {Number} latitude Latitude of a report
 * @apiSuccess {String} image_url Url to image that report has
 * @apiSuccess {String} title Title of a report
 * @apiSuccess {String} description Description of a report
 * @apiSuccess {String} date Date when reprot was made
 * @apiSuccess {Array} categoryId Array containing category ids of a report
 * @apiSuccess {String} profileId User id of reports submitter
 * @apiSuccess {Boolean} approved If true indicates that report is approved
 * @apiSuccess {Boolean} flagged If true indicates that report is reported/flagged
 * @apiSuccess {Array} votes Array containing json objects (Below details)
 * @apiSuccess {String} votes[].userId Id of user who voted on this report
 * @apiSuccess {Boolean} votes[].vote False if downvote. True if upvote.
 * @apiSuccess {String} votes[].date Date when vote was made
 *
 * @apiDescription
 * Create report using provided parameters. Date is currently created on the server side.
 * Maybe make it client side?
 * Image not yet implemented. Returns created report.
 *
 * @apiExample Example URL:
 * //POST REQUEST EXAMPLE
 *
 * @apiUse error
 * @apiUse loginError
 */
router.post('/create',requiresLogin,function(req,res,next) {
    var data = req.body;
    var id = mongoose.Types.ObjectId();

    UserModel.findOne({id: req.user.profile.id}, function (err, doc) {
        var report = new ReportModel();

        for (var key in report) {
            if (Utility.allowKey(key)) {
                report[key] = data[key] || report[key];
            }
        }
        if (report.date == null) {
            report.date = new Date().toISOString();
        }
        //vote.report.id = id;
        report._id = id;
        report.approved = false;
        report.rating = 0;
        report.rating2 = 0;
        report.save(function (err, report) {
            if (err)throw err;
            var returnV = {};
            for (var key in ReportModel.schema.paths) {
                returnV[key] = report[key];
            }
            res.status(200).json(returnV);
        });
    });

});
/**
 * @api {post} /lukeA/report/update Update
 * @apiName Update
 * @apiGroup Report
 *
 * @apiParam {String} id Id of the report to be updated
 * @apiParam {String} [title] Title of a report
 * @apiParam {String} [description] Description of a report
 * @apiParam {Array} [categoryId] Array containing category ids of a report
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          id: String,
 *          title: String,
 *          location: {
 *              long: Number,
 *              lat: Number
 *          },
 *          categoryId: [String],
 *          image_url: String,
 *          description: String,
 *          profileId: String,
 *          date: String,
 *          votes:[{
 *              profileId:String,
 *              date:String,
 *              vote:Boolean
 *          }],
 *          approved: Boolean,
 *          flagged: Boolean
 *      }
 *
 * @apiSuccess {String} id Report id
 * @apiSuccess {Object} location Json object containing longitude and latitude
 * @apiSuccess {Number} longitude Longtitude of a report
 * @apiSuccess {Number} latitude Latitude of a report
 * @apiSuccess {String} image_url Url to image that report has
 * @apiSuccess {String} title Title of a report
 * @apiSuccess {String} description Description of a report
 * @apiSuccess {String} date Date when reprot was made
 * @apiSuccess {Array} categoryId Array containing category ids of a report
 * @apiSuccess {String} profileId User id of reports submitter
 * @apiSuccess {Boolean} approved If true indicates that report is approved
 * @apiSuccess {Boolean} flagged If true indicates that report is reported/flagged
 * @apiSuccess {Array} votes Array containing json objects (Below details)
 * @apiSuccess {String} votes[].userId Id of user who voted on this report
 * @apiSuccess {Boolean} votes[].vote False if downvote. True if upvote.
 * @apiSuccess {String} votes[].date Date when vote was made
 *
 * @apiDescription
 * Updates the report by id. Image is currently not updatable.
 * Returns updated report.
 *
 * @apiExample Example URL:
 * //POST REQUEST EXAMPLE
 *
 * @apiUse error
 * @apiUse loginError
 * @apiErrorExample Access restriction:
 *      HTTP/1.1 401
 *      {
 *          error:"Restricted Access"
 *      }
 * @apiErrorExample Wrong id:
 *      HTTP/1.1 401
 *      {
 *          error:"No report with such id"
 *      }
 */
router.post('/update',requiresLogin,function(req,res) {
    var data = req.body;

    var allowedKeyes = [
        "title",
        "description",
        "categoryId"
    ];
    var appMetadata = req.user.profile._json.app_metadata || {};
    var roles = appMetadata.roles || [];

    ReportModel.findOne({id: data.id}, function (err, doc) {
        if (doc.profileId != req.user.profile.id && roles.indexOf("admin") == -1) {
            res.status(401).json({error: "Restricted Access"});
        } else {
            if (doc) {
                var pattern = new ReportModel();
                for (var key in pattern.schema.paths) {
                    if (allowedKeyes.indexOf(key) != -1) {
                        doc[key] = data[key] || doc[key];
                    }
                }
                doc.save(function (err, result) {
                    var returnV = {}, reportPattern = new ReportModel();
                    for (var key in reportPattern.schema.paths) {
                        returnV[key] = result[key];
                    }
                    res.status(200).json(returnV);
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
 * @apiParam {String} id Id of the report to be removed
 *
 * @apiDescription
 * Removes the report by id. Admin can remove other users reports.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeB/report/remove?id=y892128121u08
 *
 * @apiUse error
 * @apiUse loginError
 * @apiErrorExample Access restriction:
 *      HTTP/1.1 401
 *      {
 *          error:"Restricted Access"
 *      }
 * @apiUse error
 * @apiUse removeStatus
 * @apiUse specialAdmin
 * @apiErrorExample Restricted access:
 *      HTTP/1.1 401
 *      {
 *          error:"Restricted access"
 *      }
 */
router.get("/remove",requiresLogin,function(req,res) {
    var id = req.query.id;
    ReportModel.findOne({id: id}, function (err, doc) {
        if (err) throw err;

        if (doc.profileId == req.user.profileId || Utility.hasRole(req, "admin")) {
            Utility.remove(ReportModel, req.query.id, res);
        } else {
            res.status(401).json({error: "Restricted access"});
        }
    });
});
/**
 * @api {get} /lukeA/report/upvote Upvote
 * @apiName Upvote
 * @apiGroup Report
 *
 * @apiParam {String} id Id of the report
 *
 * @apiDescription
 * Upvotes the report by id.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeB/report/upvote?id=y892128121u08
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse voteStatus
 */
router.get("/upvote",requiresLogin,function(req,res){
    Utility.vote(ReportModel,req,res,true);
});
/**
 * @api {get} /lukeA/report/downvote Downvote
 * @apiName Downvote
 * @apiGroup Report
 *
 * @apiParam {String} id Id of the report
 *
 * @apiDescription
 * Downvotes the report by id.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeB/report/downvote?id=y892128121u08
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse voteStatus
 */
router.get("/downvote",requiresLogin,function(req,res){
    Utility.vote(ReportModel,req,res,false);
});
/**
 * @api {get} /lukeA/report/vote Vote
 * @apiName Vote
 * @apiGroup Report
 *
 * @apiParam {String} id Id of the report
 * @apiParam {Boolean} vote true if upvote, false if downvote.
 *
 * @apiDescription
 * Votes the report by id.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeB/report/upvote?id=y892128121u08?vote=true
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse voteStatus
 * @apiUse missingVote
 */
router.get("/vote",requiresLogin,function(req,res){
    Utility.vote(ReportModel,req,res,req.query.vote);
});
/**
 * @api {get} /lukeA/report/downvote-count Downvote count
 * @apiName DownvoteCount
 * @apiGroup Report
 *
 * @apiParam {String} id Id of the report
 *
 * @apiDescription
 * Returns count of downvotes of the report by id.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeB/report/downvote-count?id=y892128121u08
 *
 * @apiUse error
 * @apiUse voteCountStatus
 */
router.get("/downvote-count",function(req,res){
    Utility.voteCount(ReportModel,req.query.id,res,false);
});
/**
 * @api {get} /lukeA/report/upvote-count Upvote count
 * @apiName UpvoteCount
 * @apiGroup Report
 *
 * @apiParam {String} id Id of the report
 *
 * @apiDescription
 * Returns count of upvotes of the report by id.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeB/report/upvote-count?id=y892128121u08
 *
 * @apiUse error
 * @apiUse voteCountStatus
 */
router.get("/upvote-count",function(req,res){
    Utility.voteCount(ReportModel,req.query.id,res,true);
});
/**
 * @api {get} /lukeA/report/approve Approve
 * @apiName Approve
 * @apiGroup Report
 *
 * @apiParam {String} id Id of the report
 *
 * @apiSuccess {Boolean} success True if approving was successful
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200
 *      {
 *          success:true
 *      }
 * @apiDescription
 * Approves report by id.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeB/report/approve?id=y892128121u08
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse authError
 * @apiUse roleAdmin
 * @apiErrorExample Missing Id:
 *      HTTP/1.1 404
 *      {
 *          error: "No report with such id"
 *      }
 */
router.get("/approve",requiresLogin,requiresRole("admin"),function(req,res) {
    var data = req.query;
    var id = data.id;
    ReportModel.findOne({id: id}, function (err, doc) {
        if (err) throw err;
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
 * @apiParam {String} id Id of the report
 *
 * @apiSuccess {Boolean} success True if approving was successful
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200
 *      {
 *          success:true
 *      }
 * @apiDescription
 * Disapproves report by id.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeB/report/disapprove?id=y892128121u08
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse authError
 * @apiUse roleAdmin
 * @apiErrorExample Missing Id:
 *      HTTP/1.1 404
 *      {
 *          error: "No report with such id"
 *      }
 */
router.get("/disapprove",requiresLogin,requiresRole("admin"),function(req,res){
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
 * @apiParam {String} id Id of the report
 *
 * @apiSuccess {Boolean} success True if report was flagged successfully
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200
 *      {
 *          success:true
 *      }
 * @apiDescription
 * Flags the report by id.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeB/report/flag?id=y892128121u08
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
router.get("/flag",requiresLogin,restrictBanned,function(req,res){
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
 * @apiParam {String} id Id of the report
 *
 * @apiSuccess {Boolean} success True if report was unflagged successfully
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200
 *      {
 *          success:true
 *      }
 * @apiDescription
 * Unflags the report by id.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeB/report/unflag?id=y892128121u08
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse authError
 * @apiUse roleAdmin
 * @apiErrorExample Missing Id:
 *      HTTP/1.1 404
 *      {
 *          error: "No report with such id"
 *      }
 */
router.get("/unflag",requiresLogin,requiresRole("admin"),function(req,res){
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
module.exports = router;