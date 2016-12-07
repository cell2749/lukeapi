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
var UtModule = require("../../utility");
var Utility = new UtModule([
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
 * @api {get} /lukeB/category Get category(ies)
 * @apiName GetAll
 * @apiGroup Category
 *
 * @apiParam {String} [id] Id of a category to be viewed
 *
 * @apiSuccessExample Success-Response-Multiple:
 *      HTTP/1.1 200
 *      [{
 *          id:String,
 *          title:String,
 *          description:String,
 *          image_url:String
 *      }]
 * @apiSuccessExample Success-Response-Single:
 *      HTTP/1.1 200
 *      {
 *          id:String,
 *          title:String,
 *          description:String,
 *          image_url:String
 *      }
 *
 * @apiSuccess {String} id Category id
 * @apiSuccess {String} title Title of the category
 * @apiSuccess {String} description Description of the category
 * @apiSuccess {String} image_url Link to image/icon that category uses
 *
 * @apiDescription
 * Returns All categories or category by provided id. Open to all.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeB/category
 */
router.get("/", function (req, res) {
    Utility.get(CategoryModel, req.query.id, res);
});
/**
 * @api {post} /lukeB/category/create Create
 * @apiName Create
 * @apiGroup Category
 *
 * @apiParam {String} title Title of the category
 * @apiParam {String} [description] Description of the category
 * @apiParam {File} [image] Image file that is to be used as categories image/icon
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200
 *      {
 *          id:String,
 *          title:String,
 *          description:String,
 *          image_url:String
 *      }
 *
 * @apiSuccess {String} id Category id
 * @apiSuccess {String} title Title of the category
 * @apiSuccess {String} description Description of the category
 * @apiSuccess {String} image_url Link to image/icon that category uses
 *
 * @apiDescription
 * Creates category using provided parameters. Title required. Returns created category.
 *
 * @apiExample Example URL:
 * //POST REQUEST EXAMPLE
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse authError
 * @apiUse roleAdmin
 * @apiErrorExample Missing title:
 *      HTTP/1.1 422
 *      {
 *          error:"Missing title"
 *      }
 */
router.post("/create", jwtCheck, authConverter, requiresRole("admin"), function (req, res) {
    var data = req.body;
    if (data.title) {
        var category = new CategoryModel();

        for (var key in CategoryModel.schema.paths) {
            if (Utility.allowKey(key)) {
                var value = Utility.getKey(data, key) || Utility.getKey(doc, key);
                Utility.setKey(doc, key, value);
            }
        }
        var id = mongoose.Types.ObjectId();
        category.id = id;
        category._id = id;
        category.image_url = Utility.saveImage(req, "lukeB/category/", id);
        category.save(function (err, result) {
            if (err)throw err;
            res.status(200).json({success: true});
        });
    } else {
        res.status(422).json({error: "Missing title"});
    }

});
/**
 * @api {post} /lukeB/category/update Update
 * @apiName Update
 * @apiGroup Category
 *
 * @apiParam {String} id Category id
 * @apiParam {String} [title] Title of the category
 * @apiParam {String} [description] Description of the category
 * @apiParam {File} [image] Image file that is to be used as categories image/icon
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200
 *      {
 *          id:String,
 *          title:String,
 *          description:String,
 *          image_url:String
 *      }
 *
 * @apiSuccess {String} id Category id
 * @apiSuccess {String} title Title of the category
 * @apiSuccess {String} description Description of the category
 * @apiSuccess {String} image_url Link to image/icon that category uses
 *
 * @apiDescription
 * Updates category by id, using parameters provided. Returns updated category. *Image update requires testing.
 *
 * @apiExample Example URL:
 * //POST REQUEST EXAMPLE
 *
 * @apiUse error
 * @apiUse updateStatus
 */
router.post("/update", jwtCheck, authConverter, requiresRole("admin"), function (req, res) {
    var data = req.body;
    if (data.id) {
        CategoryModel.findOne({id: data.id}, function (err, doc) {
            if (doc) {
                for (var key in CategoryModel.schema.paths) {
                    if (Utility.allowKey(key)) {
                        var value = Utility.getKey(data, key) || Utility.getKey(doc, key);
                        Utility.setKey(doc, key, value);
                    }
                }
                doc.image_url = Utility.saveImage(req, "lukeB/category/", doc.id) || doc.image_url;
                doc.save(function (err, item) {
                    if (err) console.log(err);
                    res.status(200).json(Utility.filter(item));
                });

            } else {
                res.status(404).json({error: "No such id"});
            }
        });
    } else {
        res.status(422).json({error: "Missing id"});
    }
});
/**
 * @api {get} /lukeB/category/remove Remove
 * @apiName Remove
 * @apiGroup Category
 *
 * @apiParam {String} id Id of the category to be updated
 *
 * @apiDescription
 * Remove category by id.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeB/category/remove?id=e2921y8998e1
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse roleAdmin
 * @apiUse roleAdv
 * @apiUse removeStatus
 */
router.get("/remove", jwtCheck, authConverter, requiresRole("admin"), function (req, res) {
    var id = req.query.id;
    CategoryModel.findOne({id: id}, function (err, doc) {
        if (err) throw err;

        if (doc) {
            Utility.deleteImage(doc.image_url);
            Utility.remove(CategoryModel, id, res);
        }
    });

});

module.exports = router;