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
var jwtCheck = require('../../../security/jwtCheck');
var authConverter = require('../../../security/authConverter');
/* MODELS */
var UserModel = require("../../../models/lukeB/UserModel");
var ReportModel = require("../../../models/lukeB/ReportModel");
var PlaceModel = require("../../../models/lukeB/PlaceModel");
var CommentModel = require("../../../models/lukeB/CommentModel");
var CategoryModel = require("../../../models/lukeB/CategoryModel");
/*Utility*/
const urlRegex = require('url-regex');
var UtModule = require("../../utility");
var Utility = new UtModule([
    "__v",
    "_id",
    "id",
    "profileId",
    "reportId",
    "votes",
    "date",
    "location",
    "location.lat",
    "location.long",
    "votes.profileId",
    "votes.date",
    "votes.vote",
    "flagged"
],20);
const MONGO_PROJECTION ={
    _id: 0,
    __v: 0
};
/**
 * @api {get} /lukeB/comment Get comment(s)
 * @apiName GetAll
 * @apiGroup Comment
 *
 * @apiParam {String} [id] Id of a comment to be viewed
 *
 * @apiSuccessExample Success-Response-Multiple:
 *      HTTP/1.1 200 OK
 *      [{
 *          id: String,
 *          profileId: String,
 *          reportId: String,
 *          text:String,
 *          date:String,
 *          votes:[{
 *              profileId: String,
 *              date: String,
 *              vote: Boolean
 *          }],
 *          location: {
 *              long: Number,
 *              lat: Number
 *          },
 *          flagged: Boolean
 *      }]
 * @apiSuccessExample Success-Response-Single:
 *      HTTP/1.1 200 OK
 *      {
 *          id: String,
 *          profileId:String,
 *          reportId:String,
 *          text:String,
 *          date:String,
 *          votes:[{
 *              profileId: String,
 *              date: String,
 *              vote: Boolean
 *          }],
 *          location: {
 *              long: Number,
 *              lat: Number
 *          },
 *          flagged: Boolean
 *      }
 *
 * @apiSuccess {String} id Id of the comment
 * @apiSuccess {String} profileId Id of the user who posted the comment
 * @apiSuccess {String} reportId Id of the report which was commented
 * @apiSuccess {String} text Comment message/text
 * @apiSuccess {String} date Date when comment was made
 * @apiSuccess {Array} votes Array containing information related to rating of the comment
 * @apiSuccess {String} votes[].profileId Id of the user who voted
 * @apiSuccess {String} votes[].date Date when he voted
 * @apiSuccess {Boolean} votes[].vote True - upvote, False - downvote
 * @apiSuccess {Object} location Json object containing information on where the user commented
 * @apiSuccess {Number} location.long Longitude of the point from where the user commented
 * @apiSuccess {Number} location.lat Latitude of the point from where the user commented
 * @apiSuccess {Boolean} flagged Flag, if true comment is inappropriate and should be removed/hidden
 *
 * @apiDescription
 * Returns All places or place by provided id. Open to all.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeB/comment?id=0je10122901e
 */
router.get("/",function(req,res){
    Utility.get(CommentModel,req.query.id,res);
});
/**
 * @api {post} /lukeB/comment/create Create
 * @apiName Create
 * @apiGroup Comment
 *
 * @apiParam {String} reportId Id of the report which was commented
 * @apiParam {String} [text] Comment message/text
 * @apiParam {Object} [location Json] object containing information on where the user commented
 * @apiParam {Number} [location.long] Longitude of the point from where the user commented
 * @apiParam {Number} [location.lat] Latitude of the point from where the user commented
 *
 * @apiSuccessExample Success-Response-Single:
 *      HTTP/1.1 200 OK
 *      {
 *          id: String,
 *          profileId:String,
 *          reportId:String,
 *          text:String,
 *          date:String,
 *          votes:[{
 *              profileId: String,
 *              date: String,
 *              vote: Boolean
 *          }],
 *          location: {
 *              long: Number,
 *              lat: Number
 *          },
 *          flagged: Boolean
 *      }
 *
 * @apiSuccess {String} id Id of the comment
 * @apiSuccess {String} profileId Id of the user who posted the comment
 * @apiSuccess {String} reportId Id of the report which was commented
 * @apiSuccess {String} text Comment message/text
 * @apiSuccess {String} date Date when comment was made
 * @apiSuccess {Array} votes Array containing information related to rating of the comment
 * @apiSuccess {String} votes.profileId Id of the user who voted
 * @apiSuccess {String} votes.date Date when he voted
 * @apiSuccess {Boolean} votes.vote True - upvote, False - downvote
 * @apiSuccess {Object} location Json object containing information on where the user commented
 * @apiSuccess {Number} location.long Longitude of the point from where the user commented
 * @apiSuccess {Number} location.lat Latitude of the point from where the user commented
 * @apiSuccess {Boolean} flagged Flag, if true comment is inappropriate and should be removed/hidden
 *
 * @apiDescription
 * Adds comment to a report.
 *
 * @apiUse error
 * @apiUse loginError
 * @apiErrorExample Missing id:
 *      HTTP/1.1 422
 *      {
 *          error:"Missing id"
 *      }
 * @apiErrorExample Url error:
 *      HTTP/1.1 422
 *      {
 *          error:"No urls are allowed"
 *      }
 * @apiErrorExample Wrong id:
 *      HTTP/1.1 422
 *      {
 *          error:"No report with such id"
 *      }
 */
router.get("/create",jwtCheck,authConverter,function(req,res) {
    var data = req.query;
    var text = req.query.text || "";
    var urls = text.match(urlRegex());
    if (data.reportId != null) {
        if (urls.length == 0) {
            ReportModel.findOne({id: data.reportId}, function (err, doc) {
                if (err) throw err;
                if (doc) {
                    var comment = new CommentModel();
                    for (var key in comment.schema.paths) {
                        if (Utility.allowKey(key)) {
                            var value = Utility.getKey(data, key) || Utility.getKey(doc, key);
                            Utility.setKey(doc, key, value);
                        }
                    }
                    var id = mongoose.Types.ObjectId();
                    comment._id = id;
                    comment.id = id;
                    var date = new Date();
                    date.setUTCHours(date.getUTCHours()-Math.floor(date.getTimezoneOffset()/60));
                    comment.date = date.toISOString();
                    comment.profileId = req.user.profileId;
                    comment.save(function (err, item) {
                        if (err)throw err;
                        res.status(200).json({success: true});
                    });
                } else {
                    res.status(404).json({error: "No report with such Id"});
                }
            });
        } else {
            res.status(422).json({error: "No urls are allowed"});
        }
    } else {
        res.status(422).json({error: "Missing report Id"});
    }
});
/**
 * @api {post} /lukeB/comment/update Update
 * @apiName Update
 * @apiGroup Comment
 *
 * @apiParam {String} id Id of the comment
 * @apiParam {String} [text] Comment message/text
 *
 * @apiDescription
 * Updates comment of the report.
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse updateStatus
 */
router.get("/update",jwtCheck,authConverter,function(req,res){
    Utility.update(CommentModel,req.query,res);
});
/**
 * @api {post} /lukeB/comment/remove remove
 * @apiName Remove
 * @apiGroup Comment
 *
 * @apiParam {String} id Id of the comment
 *
 * @apiDescription
 * Removes comment of the report.
 * @apiExample Example URL:
 * http://balticapp.fi/lukeB/comment/remove?id=e2921y8998e1
 * @apiUse error
 * @apiUse loginError
 * @apiUse removeStatus
 */
router.get("/remove",jwtCheck,authConverter,function(req,res){
    Utility.remove(CommentModel,req.query.id,res);
});
/**
 * @api {get} /lukeB/place/vote vote
 * @apiName Vote
 * @apiGroup Comment
 *
 * @apiParam {String} id Id of the comment to be upvoted
 * @apiParam {Boolean} vote If true - upvote, if false - downvote
 * @apiDescription
 * Vote comment by id using vote parameter.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeB/comment/vote?id=28h2e82818210u&vote=false
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse voteStatus
 * @apiUse missingVote
 * @apiUse banned
 */
router.get("/vote",jwtCheck,authConverter,function(req,res){
    Utility.vote(CommentModel,req,res,req.query.vote);
});
/**
 * @api {get} /lukeB/place/upvote Upvote
 * @apiName Upvote
 * @apiGroup Comment
 *
 * @apiParam {String} id Id of the comment to be upvoted
 *
 * @apiDescription
 * Upvote comment by id
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeB/comment/upvote?id=28h2e82818210u
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse voteStatus
 * @apiUse banned
 */
router.get("/upvote",jwtCheck,authConverter,function(req,res){
    Utility.vote(CommentModel,req,res,true);
});
/**
 * @api {get} /lukeB/place/downvote Downvote
 * @apiName Downvote
 * @apiGroup Comment
 *
 * @apiParam {String} id Id of the comment to be upvoted
 *
 * @apiDescription
 * Downvote comment by id
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeB/comment/downvote?id=28h2e82818210u
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse voteStatus
 * @apiUse banned
 */
router.get("/downvote",jwtCheck,authConverter,function(req,res){
    Utility.vote(CommentModel,req,res,false);
});
/**
 * @api {get} /lukeA/place/downvote-count Downvote count
 * @apiName DownvoteCount
 * @apiGroup Comment
 *
 * @apiParam {String} id Id of the comment
 *
 * @apiDescription
 * Returns count of downvotes of the comment by id.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeB/comment/downvote-count?id=y892128121u08
 *
 * @apiUse error
 * @apiUse voteCountStatus
 */
router.get("/downvote-count",function(req,res){
    Utility.voteCount(CommentModel,req.query.id,res,false);
});
/**
 * @api {get} /lukeA/place/upvote-count Upvote count
 * @apiName UpvoteCount
 * @apiGroup Comment
 *
 * @apiParam {String} id Id of the comment
 *
 * @apiDescription
 * Returns count of upvotes of the comment by id.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeB/comment/upvote-count?id=y892128121u08
 *
 * @apiUse error
 * @apiUse voteCountStatus
 */
router.get("/upvote-count",function(req,res){
    Utility.voteCount(CommentModel,req.query.id,res,true);
});

module.exports = router;