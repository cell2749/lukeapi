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
    "username",
    "score",
    "rankingId",
    "submitterId",
    "submitterRating"
]);
const MONGO_PROJECTION ={
    _id: 0,
    __v: 0
};
/**
 * @api {get} /lukeA/experience Get experience pattern(s)
 * @apiName GetAll
 * @apiGroup Experience
 *
 * @apiParam {String} [id] Id of an experience pattern to be fetched
 *
 * @apiSuccessExample Success-Response-Single:
 *      HTTP/1.1 200 OK
 *      {
 *           id:String,
 *           title: String,
 *           reportGain: Number,
 *           upvoteGain: Number,
 *           downvoteGain: Number,
 *           active: Boolean
 *      }
 * @apiSuccessExample Success-Response-All:
 *      HTTP/1.1 200 OK
 *      [{
 *          id:String,
 *           title: String,
 *           reportGain: Number,
 *           upvoteGain: Number,
 *           downvoteGain: Number,
 *           active: Boolean
 *      }]
 *
 * @apiSuccess {String} id Id of the rank
 * @apiSuccess {String} title Title of the rank
 * @apiSuccess {Number} reportGain Experience gain on report
 * @apiSuccess {Number} upvoteGain Experience gain on upvote
 * @apiSuccess {Number} downvoteGain Experience gain on downvote
 * @apiSuccess {Boolean} active Indicates if current pattern is active. Only one pattern can be active at a time.
 *
 * @apiDescription
 * Returns single experience pattern based on specified id - json.
 * Returns all experience patterns if id was not specified - array of json.
 *
 * @apiExample Example:
 * http://balticapp.fi/lukeA/experience?id=2121ge921ed123d1
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse authError
 * @apiUse roleAdmin
 */
router.get("/",requiresLogin,requiresRole("admin"),function(req,res){
    Utility.get(ExperienceModel,req.query.id,res);
});
/**
 * @api {post} /lukeA/experience/create Create
 * @apiName Create
 * @apiGroup Experience
 *
 * @apiParam {String} title Title of the rank
 * @apiParam {Number} reportGain Experience gain on report
 * @apiParam {Number} upvoteGain Experience gain on upvote
 * @apiParam {Number} downvoteGain Experience gain on downvote
 * @apiParam {Boolean} active Indicates if current pattern is active. Only one pattern can be active at a time.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *           id:String,
 *           title: String,
 *           reportGain: Number,
 *           upvoteGain: Number,
 *           downvoteGain: Number,
 *           active: Boolean
 *      }
 *
 * @apiSuccess {String} id Id of the rank
 * @apiSuccess {String} title Title of the rank
 * @apiSuccess {Number} reportGain Experience gain on report
 * @apiSuccess {Number} upvoteGain Experience gain on upvote
 * @apiSuccess {Number} downvoteGain Experience gain on downvote
 * @apiSuccess {Boolean} active Indicates if current pattern is active. Only one pattern can be active at a time.
 *
 * @apiDescription
 * Creates experience pattern. Returns created experience pattern.
 *
 * @apiExample Example:
 * //POST REQUEST EXAMPLE
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse authError
 * @apiUse roleSuper
 */
router.post("/create",requiresLogin,requiresRole("superadmin"),function(req,res) {
    var data = req.body;
    var experiencePattern = new ExperienceModel();
    for (var key in experiencePattern.schema.paths) {
        if (Utility.allowKey(key)) {
            experiencePattern[key] = data[key] || experiencePattern[key];
        }
    }
    var id = mongoose.Types.ObjectId();
    experiencePattern.id = id;
    experiencePattern._id = id;
    experiencePattern.save(function (err, result) {
        if (err) throw err;
        var returnV = new ExperienceModel();
        for (var key in ExperienceModel.schema.paths) {
            returnV[key] = result[key];
        }
        res.status(200).json(returnV);
    });
});
/**
 * @api {post} /lukeA/experience/update Update
 * @apiName Update
 * @apiGroup Experience
 *
 * @apiParam {String} id Id of the rank
 * @apiParam {String} [title] Title of the rank
 * @apiParam {Number} [reportGain] Experience gain on report
 * @apiParam {Number} [upvoteGain] Experience gain on upvote
 * @apiParam {Number} [downvoteGain] Experience gain on downvote
 * @apiParam {Boolean} [active] Indicates if current pattern is active. Only one pattern can be active at a time.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *           id:String,
 *           title: String,
 *           reportGain: Number,
 *           upvoteGain: Number,
 *           downvoteGain: Number,
 *           active: Boolean
 *      }
 *
 * @apiSuccess {String} id Id of the rank
 * @apiSuccess {String} title Title of the rank
 * @apiSuccess {Number} reportGain Experience gain on report
 * @apiSuccess {Number} upvoteGain Experience gain on upvote
 * @apiSuccess {Number} downvoteGain Experience gain on downvote
 * @apiSuccess {Boolean} active Indicates if current pattern is active. Only one pattern can be active at a time.
 *
 * @apiDescription
 * Updates experience pattern. Returns updated experience pattern.
 *
 * @apiExample Example:
 * //POST REQUEST EXAMPLE
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse authError
 * @apiUse roleSuper
 * @apiErrorExample Wrong or missing id:
 *      HTTP/1.1 404
 *      {
 *          error:"No pattern was found"
 *      }
 */
router.post("/update",requiresLogin,requiresRole("superadmin"),function(req,res){
    var data = req.body;
    ExperienceModel.findOne({id:data.id},function(err, doc){
        if(err) throw err;
        if(doc) {
            var experiencePattern = new ExperienceModel();
            for(var key in experiencePattern.schema.paths){
                if(Utility.allowKey(key)){
                    doc[key]= data[key] || doc[key];
                }
            }
            doc.save(function(err,result){
                if(err) throw err;
                var returnV={}, pattern = new ExperienceModel();
                for(var key in pattern.schema.paths){
                    returnV[key]=result[key];
                }
                res.status(200).json(returnV);
            });

        }else{
            res.status(404).json({error:"No pattern was found"});
        }
    });
});
/**
 * @api {get} /lukeA/experience/remove Remove
 * @apiName Remove
 * @apiGroup Experience
 *
 * @apiParam {String} id Id of the rank
 * @apiParam {String} [title] Title of the rank
 * @apiParam {Number} [reportGain] Experience gain on report
 * @apiParam {Number} [upvoteGain] Experience gain on upvote
 * @apiParam {Number} [downvoteGain] Experience gain on downvote
 * @apiParam {Boolean} [active] Indicates if current pattern is active. Only one pattern can be active at a time.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          success: "Removed N items"
 *      }
 *
 * @apiSuccess {String} success Indicates amount of patterns removed. Should be 1.
 *
 * @apiDescription
 * Removes experience pattern. Requires superadmin role.
 *
 * @apiExample Example:
 * http://balticapp.fi/lukeA/experience/remove?id=12h21h83021
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse authError
 * @apiUse roleSuper
 * @apiErrorExample Wrong or missing id:
 *      HTTP/1.1 404
 *      {
 *          error:"No item with such id"
 *      }
 */
router.get("/remove",requiresLogin,requiresRole("superadmin"),function(req,res) {
    var data = req.query;
    ExperienceModel.find({id: data.id}).remove(function (err, item) {
        if (err) throw err;
        if (item.result.n != 0) {
            res.status(200).json({success:"Removed " + item.result.n + "items"});
        } else {
            res.status(404).json({error:"No item with such id"});
        }
    });
});
/**
 * @api {get} /lukeA/experience/activate Activate
 * @apiName Activate
 * @apiGroup Experience
 *
 * @apiParam {String} id Id of the rank
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          success: true
 *      }
 *
 * @apiSuccess {Boolean} success True if activation was successful.
 *
 * @apiDescription
 * Activates experience pattern by id and deactivates all other patterns. Requires superadmin role.
 *
 * @apiExample Example:
 * http://balticapp.fi/lukeA/experience/activate?id=18ujej0210e138u
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse authError
 * @apiUse roleSuper
 * @apiErrorExample Wrong id:
 *      HTTP/1.1 404
 *      {
 *          error:"No experience model with such id"
 *      }
 * @apiErrorExample Missing id:
 *      HTTP/1.1 404
 *      {
 *          error:"Missing id for experience model"
 *      }
 */
router.get("/activate",requiresLogin,requiresRole("superadmin"),function(req,res) {
    var data = req.query;
    if(data.id) {
        ExperienceModel.update({id: data.id}, {$set: {active: true}}, function (err, doc) {
            if (err) throw err;
            if(doc.n!=0) {
                ExperienceModel.update({
                    id: {$ne: data.id},
                    active: true
                }, {$set: {active: false}}, function (err, result) {
                    if (err) throw err;

                    res.status(200).json({success: true});
                });
            }else{
                res.status(404).json({error:"No experience model with such id"});
            }
        });
    }else{
        res.status(422).json({error:"Missing id for experience model"});
    }
});
/**
 * @api {get} /lukeA/experience/nullify-all Nullify All
 * @apiName NullifyAll
 * @apiGroup Experience
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          success: true
 *      }
 *
 * @apiSuccess {Boolean} success True if nullification was successful.
 *
 * @apiDescription
 * Nullifies all users experience and removes rank.
 * Requires superadmin role.
 *
 * @apiExample Example:
 * http://balticapp.fi/lukeA/experience/nullify-all
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse authError
 * @apiUse roleSuper
 */
router.get("/nullify-all",requiresLogin,requiresRole("superadmin"),function(req,res){
    UserModel.update({}, {$set: {score: 0, rankingId:null}}, function (err, result) {
        if(err) throw err;
        res.status(200).json({success:true});
    });
});
/**
 * @api {get} /lukeA/experience/nullify Nullify
 * @apiName Nullify
 * @apiGroup Experience
 *
 * @apiParam {string} id users id
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          success: true
 *      }
 *
 * @apiSuccess {Boolean} success True if nullification was successful.
 *
 * @apiDescription
 * Nullifies specified by id users experience and removes rank.
 * Requires superadmin role.
 *
 * @apiExample Example:
 * http://balticapp.fi/lukeA/experience/nullify?id=1ue190u1290u21e
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse authError
 * @apiUse roleSuper
 * @apiErrorExample Missing id:
 *      HTTP/1.1 422
 *      {
 *          error:"Missing user id"
 *      }
 */
router.get("/nullify",requiresLogin,requiresRole("superadmin"),function(req,res){
    var usrId = req.query.id;
    if(usrId) {
        UserModel.update({id: usrId}, {$set: {score: 0, rankingId: null}}, function (err, result) {
            if (err) throw err;
            res.status(200).json({success: true});
        });
    }else{
        res.status(422).json({error:"Missing user id"});
    }
});
module.exports = router;
