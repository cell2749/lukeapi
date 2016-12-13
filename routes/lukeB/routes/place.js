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
var WEATHER_UPDATE = null;
var WEATHER_UPDATE_PERIOD = 5000;
var WEATHER_UPDATE_LOOP_COUNTER = 0;
var UtModule = require("../../utility");
var Utility = new UtModule([
    "id",
    "_id",
    "__v",
    "rating",
    "profileId",
    "nearReports",
    "votes",
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
 *          visitLog:[{
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
 *          visitLog:[{
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
 * @apiSuccess {Array} visitLog Array containing visiting log of users
 * @apiSuccess {String} visitLog.profileId Id of the user who visited the place
 * @apiSuccess {String} visitLog.date Date when the place was visited by this user
 * @apiSuccess {Boolean} visitLog.report If true, user made submission in the area
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
 * @apiParam {Object} location Json object containing location of the place
 * @apiParam {Number} location.long Longiture of the place
 * @apiParam {Number} location.lat Latitude of the place
 * @apiParam {String} [type] Type of the place
 * @apiParam {String} [description] Description of the place
 * @apiParam {Number} radius Radius of the place
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
 *          visitLog:[{
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
 * @apiSuccess {Array} visitLog Array containing visiting log of users
 * @apiSuccess {String} visitLog.profileId Id of the user who visited the place
 * @apiSuccess {String} visitLog.date Date when the place was visited by this user
 * @apiSuccess {Boolean} visitLog.report If true, user made submission in the area
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
 * @apiErrorExample Missing location:
 *      HTTP/1.1 422
 *      {
 *          error:"Missing location"
 *      }
 * @apiErrorExample Missing radius:
 *      HTTP/1.1 422
 *      {
 *          error:"Missing radius"
 *      }
 */
router.post("/create", jwtCheck, authConverter, requiresOneOfRoles(["admin", "advanced"]), function (req, res) {
    var data = req.body;
    if (data.title == null) {
        res.status(422).json({error: "Missing title"});
    } else if (data.location == null || data.location.lat == null || data.location.long == null) {
        res.status(422).json({error: "Missing location"});
    } else if (data.radius == null) {
        res.status(422).json({error: "Missing radius"});
    } else {
        var place = new PlaceModel();

        for (var key in PlaceModel.schema.paths) {
            if (Utility.allowKey(key)) {
                var value = Utility.getKey(data, key) || Utility.getKey(place, key);
                Utility.setKey(place, key, value);
            }
        }
        var id = mongoose.Types.ObjectId();
        place.id = id;
        place._id = id;
        place.save(function (err, result) {
            if (err)console.log(err);

            res.status(200).json(Utility.filter(result));
        });
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
 *          visitLog:[{
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
 * @apiSuccess {Array} visitLog Array containing visiting log of users
 * @apiSuccess {String} visitLog.profileId Id of the user who visited the place
 * @apiSuccess {String} visitLog.date Date when the place was visited by this user
 * @apiSuccess {Boolean} visitLog.report If true, user made submission in the area
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
/**
 * @api {get} /lukeA/place/start-weather-update Starts the weather update of places
 * @apiName WeatherUpdateStart
 * @apiGroup Place
 *
 * @apiDescription
 * Initiated by admin or superadmin if server crashes.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeB/place/start-weather-update
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200
 *      {
 *          success: Started
 *      }
 * @apiSuccess {String} success Started indicated the initiation of the weather update.
 */
router.get("/start-weather-update", jwtCheck, authConverter, requiresOneOfRoles(["admin", "superadmin"]), function (req, res) {
    if (WEATHER_UPDATE != null) {
        clearInterval(WEATHER_UPDATE);
    }
    WEATHER_UPDATE = setInterval(function () {
        PlaceModel.find({}, function (err, collection) {
            if (err) console.log(err);

            var options = {
                hostname: 'api.openweathermap.org',
                path: "/data/2.5/weather?lat=" + collection[WEATHER_UPDATE_LOOP_COUNTER].location.lat + "&lon=" + collection[WEATHER_UPDATE_LOOP_COUNTER].location.long + "&APPID=" + process.env.OPEN_WEATHER_API_KEY,
                method: 'GET'
            };
            http.request(options, function (response) {
                var str = "";
                response.on('data', function (chunk) {
                    str = str + chunk;
                });
                response.on("end", function () {
                    try {
                        var weatherData = JSON.parse(str);
                        //console.log(weatherData);
                        var weatherDataM = {
                            temperature: weatherData.main.temp - 273.15,
                            wind: weatherData.wind.speed
                        };
                        PlaceModel.update({id: collection[WEATHER_UPDATE_LOOP_COUNTER].id}, {$set: {weatherData: weatherDataM}}, function (err, res) {
                            if (err) console.log(err);
                            //console.log("WEATHER UPDATE : " + res);
                        });
                    } catch (e) {
                        console.log("JSON parse ? ", e);
                    }
                    WEATHER_UPDATE_LOOP_COUNTER++;
                    if (WEATHER_UPDATE_LOOP_COUNTER >= collection.length) {
                        WEATHER_UPDATE_LOOP_COUNTER = 0;
                    }
                });

            }).end();
        });
    }, WEATHER_UPDATE_PERIOD);
    res.status(200).json({status: "Started"});
});
/**
 * @api {get} /lukeA/place/stop-weather-update stops the weather update of places
 * @apiName WeatherUpdateStop
 * @apiGroup Place
 *
 * @apiDescription
 * Admin or superadmin can stop weather-update in case of errors/unexpected fees from http://openweathermap.org
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeB/place/stop-weather-update
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200
 *      {
 *          success: Stopped
 *      }
 * @apiSuccess {String} success Stopped indicated the termination of the weather update.
 */
router.get("/stop-weather-update", jwtCheck, authConverter, requiresOneOfRoles(["admin", "superadmin"]), function (req, res) {
    if (WEATHER_UPDATE != null) {
        clearInterval(WEATHER_UPDATE);
        WEATHER_UPDATE = null;
        res.status(200).json({status: "Stopped"});
    } else {
        res.status(200).json({status: "Nothing was running"});
    }
});
/**
 * @api {post} /lukeB/place/visit Visit Place
 * @apiName VisitPlace
 * @apiGroup Place
 *
 * @apiParam {Number} lat Latitude of users current position
 * @apiParam {Number} long Longitude of users current position
 * @apiParam {Boolean} report True if user made the report at the position.
 *
 * @apiSuccessExample Success-Visited:
 *      HTTP/1.1 200
 *      {
 *          visited: true
 *          place: {
 *              id:String,
 *              title:String,
 *              location:{
 *                  long:Number,
 *                  lat:Number
 *              },
 *              type:String,
 *              votes:[{
 *                  profileId:String,
 *                  date:String,
 *                  vote:Boolean
 *              }],
 *              description:String,
 *              nearReports:[{
 *                  reportId:String
 *              }],
 *                  visitLog:[{
 *                  profileId:String,
 *                  date:String,
 *                  report:Boolean
 *              }],
 *              weatherData:{
 *                  temperature:Number,
 *                  seaTemperature:Number,
 *                  wind:Number
 *              },
 *              radius: Number
 *          }
 *      }
 * @apiSuccessExample Success-NotVisited:
 *      HTTP/1.1 200
 *      {
 *          visited: false
 *      }
 * @apiSuccess {Boolean} visited If true, user has visited the place
 * @apiSuccess {Boolean} [place] returns place that was visited. Only appears if place was visited.
 * @apiDescription
 * Checks if user coordinates are in range of place and records the visit in the user profile and place.
 * If user has visited the place & made a report there,
 * the report value won't be overwritten for user later on to a false if he visits the place again and doesn't make a report.
 * User data has record of a single visit to a place.
 * Place model contains records of each visit from a user to a place, if the user has made a report on that visit and
 * date when visit was made.
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse authError
 *
 * @apiErrorExample No places:
 *      HTTP/1.1 404
 *      {
 *          error: "No places in DB"
 *      }
 */
router.post("/visit", jwtCheck, authConverter, function (req, res) {
    var data = req.body;
    var visited = 0;
    if (data.longitude == null) {
        res.status(422).json({error: "Longitude is missing"});
    } else if (data.latitude == null) {
        res.status(422).json({error: "Latitude is missing"});
    } else {
        PlaceModel.find({}, function (err, places) {
            if (err) console.log(err);
            if (places.length > 0) {
                for (var i = 0; i < places.length; i++) {
                    if (places[i].radius >= Utility.getCrow(places[i].location.lat, places[i].location.long, data.lat, data.long)) {
                        //record visit
                        if (visited != 2) {
                            visited = 1;
                        }
                        PlaceModel.findOne({id: places[i]}, function (err, place) {
                            if (err) console.log(err);
                            UserModel.findOne({id: req.user.profile.id}, function (err, user) {
                                if (err) console.log(err);
                                user.visitedPlaces = user.visitedPlaces || [];
                                place.visitLog = place.visitLog || [];

                                place.visitLog.push({
                                    profileId: req.user.profile.id,
                                    date: new Date().toISOString(), //.replace(/T/, ' ').replace(/\..+/, '')
                                    report: data.report || false
                                });
                                var userHasPlace = -1;
                                for (var k = 0; k < user.visitedPlaces.length; k++) {
                                    if (user.visitedPlaces[k].placeId == place.id) {
                                        userHasPlace = k;
                                    }
                                    if (k == user.visitedPlaces.length - 1) {
                                        if (userHasPlace != -1) {
                                            user.visitedPlaces[userHasPlace].report = user.visitedPlaces[userHasPlace].report || data.report;
                                        } else {
                                            user.visitedPlaces.push({
                                                placeId: place.id,
                                                report: data.report
                                            });
                                        }
                                        place.save(function (err, placeSaved) {
                                            if (err) console.log(err);
                                            if (visited != 2) {
                                                visited = 2;
                                                res.status(200).json({visited: true, place: placeSaved});
                                            }
                                            user.save(function (err, userSaved) {
                                                if (err) console.log(err);
                                            });
                                        });
                                    }
                                }
                            });
                        });
                    }
                    if (i == places.length - 1 && visited == 0) {
                        res.status(200).json({visited: false});
                    }
                }
            } else {
                res.status(404).json({error: "No places in DB"});
            }
        });
    }
});
module.exports = router;