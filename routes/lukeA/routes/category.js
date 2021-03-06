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
    "image_url"
]);
const MONGO_PROJECTION = {
    _id: 0,
    __v: 0
};
/**
 * @api {get} /lukeA/category Get category(ies)
 * @apiName GetAll
 * @apiGroup Category
 *
 * @apiParam {String} [id] Id of an experience pattern to be fetched
 *
 * @apiSuccessExample Success-Response-Single:
 *      HTTP/1.1 200 OK
 *      {
 *           id:String
 *           title:String
 *           description:String,
 *           image_url:String,
 *           positive:Boolean
 *      }
 * @apiSuccessExample Success-Response-All:
 *      HTTP/1.1 200 OK
 *      [{
 *           id:String
 *           title:String
 *           description:String,
 *           image_url:String,
 *           positive:Boolean
 *      }]
 *
 * @apiSuccess {String} id Id of the category
 * @apiSuccess {String} title Title of the category
 * @apiSuccess {String} description Description of the category
 * @apiSuccess {String} image_url Url of image/icon used by category
 * @apiSuccess {Boolean} positive Indicates if category is positive or negative
 *
 * @apiDescription
 * Returns single category based on specified id - json.
 * Returns all categories if id was not specified - array of json.
 *
 * @apiExample Example:
 * http://balticapp.fi/lukeA/category?id=190j31de90u13
 *
 * @apiUse error
 * @apiUse loginError
 */
router.get('/',function(req,res){
    Utility.get(ReportCategoryModel,req.query.id,res);
});
/**
 * @api {post} /lukeA/category/create Create
 * @apiName Create
 * @apiGroup Category
 *
 * @apiParam {String} title Title of the category
 * @apiParam {String} [description] Description of the category
 * @apiParam {File} [image] Image file that is to be used by category
 * @apiParam {Boolean} [positive] Indicates if category is positive or negative
 *
 * @apiSuccessExample Success-Response-Single:
 *      HTTP/1.1 200 OK
 *      {
 *           id:String
 *           title:String
 *           description:String,
 *           image_url:String,
 *           positive:Boolean
 *      }
 *
 * @apiSuccess {String} id Id of the category
 * @apiSuccess {String} title Title of the category
 * @apiSuccess {String} description Description of the category
 * @apiSuccess {String} image_url Url of image/icon used by category
 * @apiSuccess {Boolean} positive Indicates if category is positive or negative
 *
 * @apiDescription
 * Creates category with specified parameters. Title is required. Returns created category as json.
 * Requires admin role.
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse authError
 * @apiUse roleAdmin
 * @apiErrorExample Missing title:
 *      HTTP/1.1 422
 *      {
 *          error:"Category title required"
 *      }
 */
router.post('/create',jwtCheck,authConverter,requiresRole('admin'),function(req,res){
    var data = req.body;
    var id = mongoose.Types.ObjectId();
    if(data.title) {
        ReportCategoryModel.findOne({title: data.title}, function (err, doc) {
            if(err) console.log(err);
            if (doc) {
                res.status(200).json({error: "Report Category with such name already exists!"});
            } else {
                var reportCategory = new ReportCategoryModel();
                for (var key in reportCategory.schema.paths) {
                    if (Utility.allowKey(key)) {
                        reportCategory[key] = data[key] || reportCategory[key];
                    }
                }
                reportCategory.id = id;
                reportCategory._id = id;
                reportCategory.image_url = Utility.saveImageBase64(data.image,"lukeA/category/",id);
                reportCategory.save(function (err, result) {
                    if (err)console.log(err);

                    res.status(200).json(Utility.filter(result));
                });
            }
        });
    }else{
        res.status(422).json({error:"Category title required"})
    }
});
/**
 * @api {post} /lukeA/category/update Update
 * @apiName Update
 * @apiGroup Category
 *
 * @apiParam {String} id Id of the category
 * @apiParam {String} [title] Title of the category
 * @apiParam {String} [description] Description of the category
 * @apiParam {File} [image] Image file used by category
 * @apiParam {Boolean} [positive] Indicates if category is positive or negative
 *
 * @apiSuccessExample Success-Response-Single:
 *      HTTP/1.1 200 OK
 *      {
 *           id:String
 *           title:String
 *           description:String,
 *           image_url:String,
 *           positive:Boolean
 *      }
 *
 * @apiSuccess {String} id Id of the category
 * @apiSuccess {String} title Title of the category
 * @apiSuccess {String} description Description of the category
 * @apiSuccess {String} image_url Url of image/icon used by category
 * @apiSuccess {Boolean} positive Indicates if category is positive or negative
 *
 * @apiDescription
 * Updates category with specified parameters. Returns updated category as json.
 * Requires admin role.
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse authError
 * @apiUse roleAdmin
 * @apiErrorExample Missing id:
 *      HTTP/1.1 422
 *      {
 *          error:"Category id was not provided"
 *      }
 * @apiErrorExample Wrong id:
 *      HTTP/1.1 422
 *      {
 *          error:"Report Category with such id doesn't exists"
 *      }
 */
router.post("/update",jwtCheck,authConverter,requiresRole("admin"),function(req,res){
    var data = req.body;
    if(data.id) {
        ReportCategoryModel.findOne({id: data.id}, function (err, doc) {
            if (doc) {
                var reportCategory = new ReportCategoryModel();
                for (var key in reportCategory.schema.paths) {
                    if (Utility.allowKey(key)) {
                        doc[key] = data[key] || doc[key];
                    }
                }
                doc.image_url = Utility.saveImageBase64(data.image,"lukeA/category/",doc.id) || doc.image_url;
                doc.save(function (err, result) {
                    if (err) console.log(err);

                    res.status(200).json(Utility.filter(result));
                });
            } else {
                res.status(404).json({error: "Report Category with such id doesn't exists"});

            }
        });
    }else{
        res.status(422).json({error: "Category id was not provided"});
    }
});
/**
 * @api {get} /lukeA/category/remove Remove
 * @apiName Remove
 * @apiGroup Category
 *
 * @apiParam {String} id Id of the category
 *
 * @apiSuccessExample Success-Response-Single:
 *      HTTP/1.1 200 OK
 *      {
 *           success:"Removed N items"
 *      }
 *
 * @apiSuccess {String} success Indicates how many categories were removed. Should be 1.
 *
 * @apiDescription
 * Removes category by id. Returns success message on successful deletion.
 * Requires admin role.
 *
 * @apiExample Example:
 * http://www.balticapp.fi/lukeA/category/remove?id=19021e9u2190u2190u
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse authError
 * @apiUse roleAdmin
 * @apiErrorExample Wrong or Missing id:
 *      HTTP/1.1 404
 *      {
 *          error:"No category with such id"
 *      }
 */
router.get("/remove",jwtCheck,authConverter,requiresRole("admin"),function(req,res){
    var data = req.query;
    var id = data.id;
    ReportCategoryModel.find({id:id},function(err,doc){
        if(err) console.log(err);
        if(doc.length!=0) {
            Utility.deleteImage(doc.image_url);
        }
    }).remove(function(err,item) {
        if (err) console.log(err);

        if (item.result.n != 0) {
            res.status(200).json({success:"Removed " + item.result.n + " items"});
        } else {
            res.status(404).json({error:"No category with such id"});
        }
    });
});
module.exports = router;