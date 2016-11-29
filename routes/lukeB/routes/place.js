/**
 * Created by nikitak on 1.11.2016.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var mongodb = require('../../../mongodb/lukeBdb');
var openWeather = require('openweather-node');
var http = require('http');

openWeather.setAPPID(process.env.OPEN_WEATHER_API_KEY);
openWeather.setCulture("fi");
/* SECURITY */
var requiresLogin = require('../../../security/requiresLogin');
var requiresRole = require('../../../security/requiresRole');
var requiresRoles = require('../../../security/requiresRoles');
var restrictBanned = require('../../../security/restrictBanned');
var requiresOneOfRoles = require('../../../security/requiresOneOfRoles');
var jwtCheck = require('../../../security/jwtCheck');
var authConverter = require('../../../security/authConverter');
/* MODELS */
var UserModel = require("../../../models/lukeB/UserModel");
var ReportModel = require("../../../models/lukeB/ReportModel");
var PlaceModel = require("../../../models/lukeB/PlaceModel");
var CommentModel = require("../../../models/lukeB/CommentModel");
var CategoryModel = require("../../../models/lukeB/CategoryModel");
/*Utility*/
var WEATHER_UPDATE = {};
var WEATHER_UPDATE_PERIOD;
var UtModule = require("../../utility");
var Utility = new UtModule([
    "id",
    "_id",
    "__v",
    "rating",
    "profileId",
    "nearReports",
    "visitLog",
    "visitLog.id",
    "visitLog.date",
    "visitLog.report",
    "weatherData",
    "weatherData.temperature",
    "weatherData.seaTemperature",
    "weatherData.wind"
]);
const MONGO_PROJECTION = {
    _id: 0,
    __v: 0
};
/**
 * @api {get} /lukeB/place Get place(s)
 * @apiName GetAll
 * @apiGroup Place
 *
 * @apiParam {String} [id] Id of a place to be viewed
 *
 * @apiSuccessExample Success-Response-Multiple:
 *      HTTP/1.1 200 OK
 *      [{
 *          id:String,
 *          title:String,
 *          location:{
 *              long:Number,
 *              lat:Number
 *          },
 *          type:String,
 *          votes:[{
 *              profileId:String,
 *              date:String,
 *              vote:Boolean
 *          }],
 *          description:String,
 *          nearReports:[{
 *              reportId:String
 *          }],
 *          reportLog:[{
 *              profileId:String,
 *              date:String,
 *              report:Boolean
 *          }],
 *          weatherData:{
 *              temperature:Number,
 *              seaTemperature:Number,
 *              wind:Number
 *          },
 *          radius: Number
 *      }]
 * @apiSuccessExample Success-Response-Single:
 *      HTTP/1.1 200 OK
 *      {
 *          id:String,
 *          title:String,
 *          location:{
 *              long:Number,
 *              lat:Number
 *          },
 *          type:String,
 *          votes:[{
 *              profileId:String,
 *              date:String,
 *              vote:Boolean
 *          }],
 *          description:String,
 *          nearReports:[{
 *              reportId:String
 *          }],
 *          reportLog:[{
 *              profileId:String,
 *              date:String,
 *              report:Boolean
 *          }],
 *          weatherData:{
 *              temperature:Number,
 *              seaTemperature:Number,
 *              wind:Number
 *          },
 *          radius: Number
 *      }
 *
 * @apiSuccess {String} id Place id
 * @apiSuccess {String} title Title of the place
 * @apiSuccess {Object} location Json object containing information about the place location
 * @apiSuccess {Number} location.long Longitude of the place
 * @apiSuccess {Number} location.lat Latitude of the place
 * @apiSuccess {String} type Type of the place
 * @apiSuccess {Array} votes Array of json objects containing votes
 * @apiSuccess {String} votes[].profileId Id of the user who voted on this report
 * @apiSuccess {String} votes[].date Date when the vote was made
 * @apiSuccess {Boolean} votes[].vote Vote - true if heart, false if flag.
 * @apiSuccess {String} description Description of the place
 * @apiSuccess {Array} nearReports Array of reports that are made withing the area of this place
 * @apiSuccess {String} nearReports[].reportId Id of the report as a reference
 * @apiSuccess {Array} reportLog Array containing visiting log of users
 * @apiSuccess {String} reportLog.profileId Id of the user who visited the place
 * @apiSuccess {String} reportLog.date Date when the place was visited by this user
 * @apiSuccess {Boolean} reportLog.report If true, user made submission in the area
 * @apiSuccess {Object} weatherData Json object containing current weather data about the place
 * @apiSuccess {Number} weatherData.temperature Temperature at the place
 * @apiSuccess {Number} weatherData.seaTemperature Sea tempereature if the area provides such information
 * @apiSuccess {Number} weatherData.wind Wind speed at the place
 * @apiSuccess {Number} radius Radius of the area around the place
 *
 * @apiDescription
 * Returns All places or place by provided id. Open to all.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeB/place
 */
router.get("/", function (req, res) {
    Utility.get(PlaceModel, req.query.id, res);
});
/**
 * @api {post} /lukeB/place/create Create
 * @apiName Create
 * @apiGroup Place
 *
 * @apiParam {String} title Title of the place
 * @apiParam {Object} [location Json] object containing location of the place
 * @apiParam {Number} [location.long] Longiture of the place
 * @apiParam {Number} [location.lat] Latitude of the place
 * @apiParam {String} [type] Type of the place
 * @apiParam {String} [description] Description of the place
 * @apiParam {Number} [radius] Radius of the place
 *
 * @apiSuccessExample Success-Response-Single:
 *      HTTP/1.1 200 OK
 *      {
 *          id:String,
 *          title:String,
 *          location:{
 *              long:Number,
 *              lat:Number
 *          },
 *          type:String,
 *          votes:[{
 *              profileId:String,
 *              date:String,
 *              vote:Boolean
 *          }],
 *          description:String,
 *          nearReports:[{
 *              reportId:String
 *          }],
 *          reportLog:[{
 *              profileId:String,
 *              date:String,
 *              report:Boolean
 *          }],
 *          weatherData:{
 *              temperature:Number,
 *              seaTemperature:Number,
 *              wind:Number
 *          },
 *          radius: Number
 *      }
 *
 * @apiSuccess {String} id Place id
 * @apiSuccess {String} title Title of the place
 * @apiSuccess {Object} location Json object containing information about the place location
 * @apiSuccess {Number} location.long Longitude of the place
 * @apiSuccess {Number} location.lat Latitude of the place
 * @apiSuccess {String} type Type of the place
 * @apiSuccess {Array} votes Array of json objects containing votes
 * @apiSuccess {String} votes[].profileId Id of the user who voted on this report
 * @apiSuccess {String} votes[].date Date when the vote was made
 * @apiSuccess {Boolean} votes[].vote Vote - true if heart, false if flag.
 * @apiSuccess {String} description Description of the place
 * @apiSuccess {Array} nearReports Array of reports that are made withing the area of this place
 * @apiSuccess {String} nearReports[].reportId Id of the report as a reference
 * @apiSuccess {Array} reportLog Array containing visiting log of users
 * @apiSuccess {String} reportLog.profileId Id of the user who visited the place
 * @apiSuccess {String} reportLog.date Date when the place was visited by this user
 * @apiSuccess {Boolean} reportLog.report If true, user made submission in the area
 * @apiSuccess {Object} weatherData Json object containing current weather data about the place
 * @apiSuccess {Number} weatherData.temperature Temperature at the place
 * @apiSuccess {Number} weatherData.seaTemperature Sea tempereature if the area provides such information
 * @apiSuccess {Number} weatherData.wind Wind speed at the place
 * @apiSuccess {Number} radius Radius of the area around the place
 *
 * @apiDescription
 * Creates place using provided parameters. Title required. Returns created place.
 *
 * @apiExample Example URL:
 * //POST REQUEST EXAMPLE
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse authError
 * @apiUse roleAdmin
 * @apiUse roleAdv
 * @apiErrorExample Missing title:
 *      HTTP/1.1 422
 *      {
 *          error:"Missing title"
 *      }
 */
router.post("/create", jwtCheck, authConverter, requiresOneOfRoles(["admin", "advanced", "researcher"]), function (req, res) {
    var data = req.body;
    if (data.title) {
        var place = new PlaceModel();

        for (var key in place.schema.paths) {
            if (Utility.allowKey(key)) {
                place[key] = data[key];
            }
        }
        var id = mongoose.Types.ObjectId();
        place.id = id;
        place._id = id;
        place.save(function (err, result) {
            if (err)throw err;
            var resultV = new PlaceModel();
            for (var key in PlaceModel.schema.paths) {
                resultV[key] = result[key];
            }
            res.status(200).json(resultV);
        });
    } else {
        res.status(422).json({error: "Missing title"});
    }
});
/**
 * @api {post} /lukeB/place/update Update
 * @apiName Update
 * @apiGroup Place
 *
 * @apiParam {String} id Id of the place to be updated
 * @apiParam {String} [title] Title of the place
 * @apiParam {Object} [location Json] object containing location of the place
 * @apiParam {Number} [location.long] Longitude of the place
 * @apiParam {Number} [location.lat] Latitude of the place
 * @apiParam {String} [type] Type of the place
 * @apiParam {String} [description] Description of the place
 * @apiParam {Number} [radius] Radius of the place
 *
 * @apiSuccessExample Success-Response-Single:
 *      HTTP/1.1 200 OK
 *      {
 *          id:String,
 *          title:String,
 *          location:{
 *              long:Number,
 *              lat:Number
 *          },
 *          type:String,
 *          votes:[{
 *              profileId:String,
 *              date:String,
 *              vote:Boolean
 *          }],
 *          description:String,
 *          nearReports:[{
 *              reportId:String
 *          }],
 *          reportLog:[{
 *              profileId:String,
 *              date:String,
 *              report:Boolean
 *          }],
 *          weatherData:{
 *              temperature:Number,
 *              seaTemperature:Number,
 *              wind:Number
 *          },
 *          radius: Number
 *      }
 *
 * @apiSuccess {String} id Place id
 * @apiSuccess {String} title Title of the place
 * @apiSuccess {Object} location Json object containing information about the place location
 * @apiSuccess {Number} location.long Longitude of the place
 * @apiSuccess {Number} location.lat Latitude of the place
 * @apiSuccess {String} type Type of the place
 * @apiSuccess {Array} votes Array of json objects containing votes
 * @apiSuccess {String} votes[].profileId Id of the user who voted on this report
 * @apiSuccess {String} votes[].date Date when the vote was made
 * @apiSuccess {Boolean} votes[].vote Vote - true if heart, false if flag.
 * @apiSuccess {String} description Description of the place
 * @apiSuccess {Array} nearReports Array of reports that are made withing the area of this place
 * @apiSuccess {String} nearReports[].reportId Id of the report as a reference
 * @apiSuccess {Array} reportLog Array containing visiting log of users
 * @apiSuccess {String} reportLog.profileId Id of the user who visited the place
 * @apiSuccess {String} reportLog.date Date when the place was visited by this user
 * @apiSuccess {Boolean} reportLog.report If true, user made submission in the area
 * @apiSuccess {Object} weatherData Json object containing current weather data about the place
 * @apiSuccess {Number} weatherData.temperature Temperature at the place
 * @apiSuccess {Number} weatherData.seaTemperature Sea tempereature if the area provides such information
 * @apiSuccess {Number} weatherData.wind Wind speed at the place
 * @apiSuccess {Number} radius Radius of the area around the place
 *
 * @apiDescription
 * Updates place by id, using parameters provided. Returns updated place.
 *
 * @apiExample Example URL:
 * //POST REQUEST EXAMPLE
 *
 * @apiUse error
 * @apiUse updateStatus
 */
router.post("/update", jwtCheck, authConverter, requiresOneOfRoles(["admin", "advanced", "researcher"]), function (req, res) {
    Utility.update(PlaceModel, req.body, res);
});
/**
 * @api {get} /lukeB/place/remove Remove
 * @apiName Remove
 * @apiGroup Place
 *
 * @apiParam {String} id Id of the place to be updated
 *
 * @apiDescription
 * Remove place by id.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeB/place/remove?id=e2921y8998e1
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse roleAdmin
 * @apiUse roleAdv
 * @apiUse removeStatus
 */
router.get("/remove", jwtCheck, authConverter, requiresOneOfRoles(["admin", "advanced", "researcher"]), function (req, res) {
    Utility.remove(PlaceModel, req.query.id, res);
});
/**
 * @api {get} /lukeB/place/upvote Upvote
 * @apiName Upvote
 * @apiGroup Place
 *
 * @apiParam {String} id Id of the place to be upvoted
 *
 * @apiDescription
 * Upvote place by id
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeB/place/upvote?id=28h2e82818210u
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse voteStatus
 * @apiUse banned
 */
router.get("/upvote", jwtCheck, authConverter, restrictBanned, function (req, res) {
    Utility.vote(PlaceModel, req, res, true);
});
/**
 * @api {get} /lukeB/place/downvote Downvote
 * @apiName Downvote
 * @apiGroup Place
 *
 * @apiParam {String} id Id of the place to be upvoted
 *
 * @apiDescription
 * Downvote place by id
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeB/place/downvote?id=28h2e82818210u
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse voteStatus
 * @apiUse banned
 */
router.get("/downvote", jwtCheck, authConverter, restrictBanned, function (req, res) {
    Utility.vote(PlaceModel, req, res, false);
});
/**
 * @api {get} /lukeB/place/vote vote
 * @apiName Vote
 * @apiGroup Place
 *
 * @apiParam {String} id Id of the place to be upvoted
 * @apiParam {Boolean} vote If true - upvote, if false - downvote
 * @apiDescription
 * Vote place by id using vote parameter.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeB/place/vote?id=28h2e82818210u&vote=false
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse voteStatus
 * @apiUse missingVote
 * @apiUse banned
 */
router.get("/vote", jwtCheck, authConverter, restrictBanned, function (req, res) {
    Utility.vote(PlaceModel, req, res, req.query.vote);
});
/**
 * @api {get} /lukeA/place/downvote-count Downvote count
 * @apiName DownvoteCount
 * @apiGroup Place
 *
 * @apiParam {String} id Id of the place
 *
 * @apiDescription
 * Returns count of downvotes of the place by id.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeB/place/downvote-count?id=y892128121u08
 *
 * @apiUse error
 * @apiUse voteCountStatus
 */
router.get("/downvote-count", function (req, res) {
    Utility.voteCount(PlaceModel, req.query.id, res, false);
});
/**
 * @api {get} /lukeA/place/upvote-count Upvote count
 * @apiName UpvoteCount
 * @apiGroup Place
 *
 * @apiParam {String} id Id of the place
 *
 * @apiDescription
 * Returns count of upvotes of the place by id.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeB/place/upvote-count?id=y892128121u08
 *
 * @apiUse error
 * @apiUse voteCountStatus
 */
router.get("/upvote-count", function (req, res) {
    Utility.voteCount(PlaceModel, req.query.id, res, true);
});


/*
router.get("/start-weather-update", jwtCheck, authConverter, requiresOneOfRoles(["admin", "superadmin"]), function (req, res) {

    PlaceModel.find({}, {location: 1, id: 1}, function (err, places) {
        if (err) {
            console.log(err);
            res.status(500).json({error: "BEWARE THE WRATH OF A QUIET MAN!"})
        } else {
            WEATHER_UPDATE_PERIOD = places.length * 2000;
            places.forEach(function (item) {
                WEATHER_UPDATE[item.id] = setInterval(function () {
                    var options = {
                        hostname: 'api.openweathermap.org',
                        port: 80,
                        path: "data/2.5/weather?lat=" + item.location.lat + "&lon=" + item.location.long,
                        method: 'GET'
                    };
                    http.get(options, function (res) {
                        var buffer = new Buffer(0)
                        res.on('readable', function () {
                            return buffer += this.read().toString('utf8');
                        });
                        return res.on('end', function () {
                            ////RAKANISHU!!
                            return callback(buffer);
                        });
                    });

                }, WEATHER_UPDATE_PERIOD);

            });
            res.status(200).json({status: "Started"});
        }
    });
});
//*/
router.get("/stop-weather-update", jwtCheck, authConverter, requiresOneOfRoles(["admin", "superadmin"]), function (req, res) {
    if (WEATHER_UPDATE.length != 0) {
        WEATHER_UPDATE.forEach(function (item) {
            clearInterval(WEATHER_UPDATE);
            WEATHER_UPDATE = null;
        });
        res.status(200).json({status: "Stopped"});
    } else {
        res.status(200).json({status: "Nothing was running"});
    }
});

module.exports = router;