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
var RankModel = require("../../../models/lukeA/RankModel");
/* UTILITY */
var UtModule = require("../../utility");
var Utility = new UtModule([
    //Omit Keyes to be updated by user
    "id",
    "_id",
    "__v",
    "image_url"
]);
const MONGO_PROJECTION = {
    _id: 0,
    __v: 0
};
/**
 * @api {post} /lukeA/rank/create Create
 * @apiName Create
 * @apiGroup Rank
 *
 * @apiParam {String} title Title of rank
 * @apiParam {String} [description] Description of the rank
 * @apiParam {File} [image] Image file that is to be used as Rank icon
 * @apiParam {Number} [score] Required score/experience for a user to get this rank
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          id:String,
 *          title:String,
 *          description:String,
 *          image_url: String,
 *          score: Number
 *      }
 *
 * @apiSuccess {String} id Id of the rank
 * @apiSuccess {String} title Title of the rank
 * @apiSuccess {String} description Description of the rank
 * @apiSuccess {String} image_url Url to an image(icon) of the rank*
 * @apiSuccess {Number} score Score required to achieve this rank
 *
 * @apiDescription
 * Creates Rank with specified parameters. Title is required. Returns the created rank.
 * Requires admin role.
 *
 * @apiExample Example:
 * //POST REQUEST EXAMPLE
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse authError
 * @apiUse roleAdmin
 * @apiErrorExample Title is missing:
 *      HTTP/1.1 422
 *      {
 *          error:"Missing title"
 *      }
 */
router.post('/create', jwtCheck, authConverter, requiresRole('admin'), function (req, res, next) {
    var data = req.body;
    var id = mongoose.Types.ObjectId();

    if (data.title != null) {
        var rank = new RankModel();
        for (var key in rank.schema.paths) {
            if (Utility.allowKey(key)) {
                rank[key] = data[key] || rank[key];
            }
        }
        rank.id = id;
        rank._id = id;
        rank.image_url = Utility.saveImageBase64(data.image, "lukeA/rank/", id);
        rank.save(function (err, rank) {
            if (err) console.log(err);

            res.status(200).json(Utility.filter(rank));
        });
    } else {
        res.status(422).json({error: "Missing title"});
    }
});
/**
 * @api {post} /lukeA/rank/update Update
 * @apiName Update
 * @apiGroup Rank
 *
 * @apiParam {String} id Id of a rank to be updated
 * @apiParam {String} [title] Title of rank
 * @apiParam {String} [description] Description of the rank
 * @apiParam {File} [image] Image file that is to be used as rank icon/image
 * @apiParam {Number} [score] Required score/experience for a user to get this rank
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          id:String,
 *          title:String,
 *          description:String,
 *          image_url: String,
 *          score: Number
 *      }
 *
 * @apiSuccess {String} id Id of the rank
 * @apiSuccess {String} title Title of the rank
 * @apiSuccess {String} description Description of the rank
 * @apiSuccess {String} image_url Url to an image(icon) of the rank*
 * @apiSuccess {Number} score Score required to achieve this rank
 *
 * @apiDescription
 * Updates Rank with specified parameters. Returns the updated rank.
 * Requires admin role.
 *
 * @apiExample Example:
 * //POST REQUEST EXAMPLE
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse authError
 * @apiUse roleAdmin
 * @apiErrorExample Id is missing:
 *      HTTP/1.1 422
 *      {
 *          error:"Id was not specified"
 *      }
 * @apiErrorExample Wrong id:
 *      HTTP/1.1 404
 *      {
 *          error:"Rank with such id doesn't exist"
 *      }
 */
router.post("/update", jwtCheck, authConverter, requiresRole("admin"), function (req, res) {
    var data = req.body;
    if (data.id) {
        RankModel.findOne({id: data.id}, function (err, doc) {
            if (doc) {
                var rank = new RankModel();
                for (var key in rank.schema.paths) {
                    if (Utility.allowKey(key)) {
                        doc[key] = data[key] || doc[key];
                    }
                }
                doc.image_url = Utility.saveImageBase64(data.image, "lukeA/rank/", doc.id) || doc.image_url;
                doc.save(function (err, result) {
                    if (err) console.log(err);

                    res.status(200).json(Utility.filter(result));
                });
            } else {
                res.status(404).json({error: "Rank with such id doesn't exist"});
            }
        });
    } else {
        res.status(422).json({error: "Id was not specified"});
    }
});
/**
 * @api {get} /lukeA/rank/remove Remove
 * @apiName Remove
 * @apiGroup Rank
 *
 * @apiParam {String} id Id of a rank to be updated
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          success:"Removed N items"
 *      }
 *
 * @apiSuccess {String} success Indicates amount of ranks removed. Should be 1.
 *
 * @apiDescription
 * Deletes rank with specified id.
 * Requires admin role.
 *
 * @apiExample Example:
 * http://balticapp.fi/lukeA/rank/remove?id=2121ge921ed123d1
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse authError
 * @apiUse roleAdmin
 * @apiErrorExample Id is missing:
 *      HTTP/1.1 422
 *      {
 *          error:"Id was not specified"
 *      }
 * @apiErrorExample Wrong id:
 *      HTTP/1.1 404
 *      {
 *          error:"No rank with such id"
 *      }
 */
router.get("/remove", jwtCheck, authConverter, requiresRole("admin"), function (req, res) {
    var data = req.query;
    var id = data.id;
    if (id) {

        RankModel.find({id: id}, function (err, doc) {
            if (err) console.log(err);
            if (doc.length != 0) {
                Utility.deleteImage(doc.image_url);
            }
        }).remove(function (err, item) {
            if (err) console.log(err);

            if (item.result.n != 0) {
                res.status(200).json({success: "Removed " + item.result.n + " items"});
            } else {
                res.status(404).json({error: "No rank with such id"});
            }
        });
    } else {
        res.status(404).json({error: "Id was not specified"});
    }
});
/**
 * @api {get} /lukeA/rank Get rank(s)
 * @apiName GetAll
 * @apiGroup Rank
 *
 * @apiParam {String} [id] Id of a rank to be fetched
 *
 * @apiSuccessExample Success-Response-Single:
 *      HTTP/1.1 200 OK
 *      {
 *          id:String,
 *          title:String,
 *          description:String,
 *          image_url: String,
 *          score: Number
 *      }
 * @apiSuccessExample Success-Response-All:
 *      HTTP/1.1 200 OK
 *      [{
 *          id:String,
 *          title:String,
 *          description:String,
 *          image_url: String,
 *          score: Number
 *      }]
 *
 * @apiSuccess {String} id Id of the rank
 * @apiSuccess {String} title Title of the rank
 * @apiSuccess {String} description Description of the rank
 * @apiSuccess {String} image_url Url to an image/icon of a rank
 * @apiSuccess {Number} score Score required to get this rank
 *
 * @apiDescription
 * Returns single rank based on specified id - json. Returns all ranks if id was not specified - array of json.
 *
 * @apiExample Example:
 * http://balticapp.fi/lukeA/rank?id=2121ge921ed123d1
 *
 * @apiUse error
 * @apiUse loginError
 */
router.get("/", function (req, res) {
    var id = req.query.id || null;
    Utility.get(RankModel, id, res);
});
module.exports = router;