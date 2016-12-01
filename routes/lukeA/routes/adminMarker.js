/**
 * Created by nikitak on 28.11.2016.
 */
/**
 * Created by nikitak on 1.11.2016.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongodb = require('../../../mongodb/lukeAdb');
/* SECURITY */
var requiresRole = require('../../../security/requiresRole');
var requiresRoles = require('../../../security/requiresRoles');
var restrictBanned = require('../../../security/restrictBanned');
var jwtCheck = require('../../../security/jwtCheck');
var authConverter = require('../../../security/authConverter');
/* MODELS */
var AdminMarkerModel = require("../../../models/lukeA/AdminMarkerModel");
/* UTILITY */
var UtModule = require("../../utility");
var Utility = new UtModule([
    //Omit Keyes to be updated by user
    "id",
    "_id",
    "__v",
    "date"
], 1);
const MONGO_PROJECTION = {
    _id: 0,
    __v: 0
};
/**
 * @api {get} /lukeA/marker Get marker(s)
 * @apiName Get
 * @apiGroup AdminMarker
 *
 * @apiParam {String} [id] Id of the marker. If specified return only single marker.
 * @apiParam {String} [owner] Name of the owner of the marker (Third party user). Returns all markers belonging to the owner.
 * @apiParam {Number} [limit] Limit the amount of returned objects.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      [{
 *          id: {type: String, required: '{PATH} is required!'},
 *          longitude: Number,
 *          latitude: Number,
 *          title: String,
 *          description: String,
 *          date: String,
 *          owner: String
 *      }]
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          id: {type: String, required: '{PATH} is required!'},
 *          longitude: Number,
 *          latitude: Number,
 *          title: String,
 *          description: String,
 *          date: String,
 *          owner: String
 *      }
 *
 * @apiSuccess {String} id Marker unique id
 * @apiSuccess {Number} longitude Longitude of a marker
 * @apiSuccess {Number} latitude Latitude of a marker
 * @apiSuccess {String} title Title of marker
 * @apiSuccess {String} description Description of marker
 * @apiSuccess {String} date Date when marker was made
 * @apiSuccess {String} owner Third party owner of the marker
 *
 * @apiDescription
 * Open to everyone
 * Location filter is available for public. Returns single marker in case id is specified.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeA/marker?owner=Cthulhu&limit=10
 *
 */
router.get('/', function (req, res) {
    var data = req.query;
    var returnResult = [];
    var limit = data.limit || 0;

    var location = {
        long: data.long,
        lat: data.lat
    };
    var distance = data.distance || 5000;

    var query;
    if(data.owner){
        query = {
            id: data.id || {$ne: null},
            owner: data.owner
        }
    }else{
        query = {
            id: data.id || {$ne: null}
        }
    }
    AdminMarkerModel.find(query, MONGO_PROJECTION).sort({"date": -1}).limit(parseInt(limit)).exec(function (err, collection) {
        if (err) console.log(err);
        var result = collection;

        if (distance && location.long && location.lat) {
            for (var i = 0; i < result.length; i++) {

                if (result[i].latitude != null && result[i].longitude != null) {
                    if (Utility.getCrow(location.lat, location.long, result[i].latitude, result[i].longitude) <= distance) {
                        returnResult.push(result[i]);
                    }
                }
                if (i == result.length - 1) {
                    res.status(200).json(Utility.filter(returnResult));
                }
                //might require improvement right here
            }
        } else {
            res.status(200).json(Utility.filter(result));
        }
    });
});
/**
 * @api {post} /lukeA/marker/create Create
 * @apiName Create
 * @apiGroup AdminMarker
 *
 * @apiParam {Number} longitude Longitude of a marker
 * @apiParam {Number} latitude Latitude of a marker
 * @apiParam {String} title Title of marker
 * @apiParam {String} description Description of marker
 * @apiParam {String} [owner] Third party owner of the marker
 *
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          id: {type: String, required: '{PATH} is required!'},
 *          longitude: Number,
 *          latitude: Number,
 *          title: String,
 *          description: String,
 *          date: String,
 *          owner: String
 *      }
 *
 * @apiSuccess {String} id Marker unique id
 * @apiSuccess {Number} longitude Longitude of a marker
 * @apiSuccess {Number} latitude Latitude of a marker
 * @apiSuccess {String} title Title of marker
 * @apiSuccess {String} description Description of marker
 * @apiSuccess {String} date Date when marker was made
 * @apiSuccess {String} owner Third party owner of the marker
 *
 * @apiDescription
 * Creates marker with specified parameter. Some parameters are restricted from user to manage them.
 * Returns the created marker.
 *
 * @apiUse roleAdmin
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse authError
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
 * @apiErrorExample Missing title:
 *      HTTP/1.1 422
 *      {
 *          error:"Missing title"
 *      }
 */
router.post('/create', jwtCheck, authConverter, requiresRole("admin"), function (req, res) {
    var data = req.body;
    var id = mongoose.Types.ObjectId();

    if (data.longitude == null) {
        res.status(422).json({error: "Missing longitude"});
    } else if (data.latitude == null) {
        res.status(422).json({error: "Missing latitude"});
    } else if (data.description == null) {
        res.status(422).json({error: "Missing description"});
    } else if (data.title == null) {
        res.status(422).json({error: "Missing title"});
    } else {
        var marker = new AdminMarkerModel();

        for (var key in AdminMarkerModel.schema.paths) {
            if (Utility.allowKey(key)) {
                marker[key] = data[key] || marker[key];
            }
        }
        marker._id = id;
        marker.id = id;
        marker.date = new Date().toISOString();

        marker.save(function (err, marker) {
            if (err)console.log(err);

            res.status(200).json(Utility.filter(marker));
        });
    }
});
/**
 * @api {post} /lukeA/marker/update Update
 * @apiName Update
 * @apiGroup AdminMarker
 *
 * @apiParam {String} id Id of the marker
 * @apiSuccess {Number} [longitude] Longitude of a marker
 * @apiSuccess {Number} [latitude] Latitude of a marker
 * @apiSuccess {String} [title] Title of marker
 * @apiSuccess {String} [description] Description of marker
 * @apiSuccess {String} [owner] Third party owner of the marker
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          id: {type: String, required: '{PATH} is required!'},
 *          longitude: Number,
 *          latitude: Number,
 *          title: String,
 *          description: String,
 *          date: String,
 *          owner: String
 *      }
 *
 * @apiSuccess {String} id Marker unique id
 * @apiSuccess {Number} longitude Longitude of a marker
 * @apiSuccess {Number} latitude Latitude of a marker
 * @apiSuccess {String} title Title of marker
 * @apiSuccess {String} description Description of marker
 * @apiSuccess {String} date Date when marker was made
 * @apiSuccess {String} owner Third party owner of the marker
 *
 * @apiDescription
 * Updates the marker with new values. Certain properties are forbidden from being updated.
 * All allowed are listed in parameters list.
 *
 * @apiUse roleAdmin
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse authError
 *
 * @apiErrorExample Id is missing or wrong:
 *      HTTP/1.1 404
 *      {
 *          error:"No marker with such id"
 *      }
 */
router.post("/update", jwtCheck, authConverter, restrictBanned, function (req, res) {
    var data = req.body;
    AdminMarkerModel.findOne({id: data.id}, function (err, doc) {
        if (err)console.log(err);
        if (doc) {
            for (var key in AdminMarkerModel.schema.paths) {
                if (Utility.allowKey(key)) {
                    doc[key] = data[key] || doc[key];
                }
            }
            doc.save(function (err, result) {
                if (err)console.log(err);
                res.status(200).json(Utility.filter(result));
            });

        } else {
            res.status(404).json({error: "No marker with such id"});
        }
    });
});
/**
 * @api {get} /lukeA/marker/remove Remove
 * @apiName Remove
 * @apiGroup AdminMarker
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
 * Removes the specified marker.
 *
 * @apiExample Example:
 * http://balticapp.fi/lukeA/marker/remove?id=e1921e921e9219
 *
 * @apiUse roleAdmin
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse authError
 *
 * @apiErrorExample Id is missing or wrong:
 *      HTTP/1.1 404
 *      {
 *          error:"No marker with such id"
 *      }
 */
router.get("/remove", jwtCheck, authConverter,requiresRole("admin"), function (req, res) {
    var data = req.query;
    var id = data.id;

    AdminMarkerModel.find({id: id}).remove(function (err, item) {
        if (err) console.log(err);

        if (item.result.n != 0) {
            res.status(200).json({success: "Removed " + item.result.n + " items"});
        } else {
            res.status(404).json({error: "No marker with such id"});
        }
    });

});

module.exports = router;
