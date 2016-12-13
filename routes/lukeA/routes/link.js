/**
 * Created by nikitak on 13.12.2016.
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
var LinkModel = require("../../../models/lukeA/LinkModel");
/* UTILITY */
var UtModule = require("../../utility");
var Utility = new UtModule([
    //Omit Keyes to be updated by user
    "id",
    "_id",
    "__v",
    "done"
]);
const MONGO_PROJECTION = {
    _id: 0,
    __v: 0
};
/**
 * @api {get} /lukeA/link Get
 * @apiName Get
 * @apiGroup Link
 *
 * @apiParam {String} [id] Id of the link to retrieve
 * @apiParam {Boolean} [active] Active indicates that if the link is active to present
 *
 * @apiSuccessExample Success-Response-Single:
 *      HTTP/1.1 200 OK
 *      [{
 *          id:String,
 *          link: String,
 *          description: String,
 *          title: String,
 *          active: Boolean,
 *          done: [String]
 *      }]
 *
 * @apiSuccess {String} id Id of the Link
 * @apiSuccess {String} link Third party link to specific site, or survey
 * @apiSuccess {String} description Description of the link
 * @apiSuccess {String} title Title of the link
 * @apiSuccess {Boolean} active Indicates if the link is good to present
 * @apiSuccess {Array} done Array containing ids of users who clicked the link, visited it
 *
 * @apiDescription
 * Link get request. Normal users and public get only active true by default. Super admins get everything by default.
 * Super admins can specify parameter active in the request in order to get one or the other.
 * If no id is specified, all the reports are delivered based on the active rules. Reports are active by default upon creation.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeA/link?id=e2921y8998e1
 */
router.get("/", function (req, res) {
    var data = req.query;
    var id = data.id || {$ne:null};
    var active = {$ne:false};
    if (req.user != null) {
        if (req.user.profile != null) {
            var appMetadata = req.user.profile._json.app_metadata || {};
            var roles = appMetadata.roles || [];
            if (roles.indexOf("superadmin") != -1) {
                active = data.active||{$ne:null};
            }
        }
    }
    LinkModel.find({active:active,id:id},MONGO_PROJECTION,function(err,doc){
       if(err) console.log(err);

        res.status(200).json(doc);
    });
});
/**
 * @api {get} /lukeA/link Create
 * @apiName Create
 * @apiGroup Link
 *
 * @apiParam {String} link Link of the link to create
 * @apiParam {String} [title] Title of the link to create
 * @apiParam {String} [description] Description of the link to create
 * @apiParam {Boolean} [active=true] Active indicates that if the link is active to present
 *
 * @apiSuccessExample Success-Response-Single:
 *      HTTP/1.1 200 OK
 *      {
 *          id:String,
 *          link: String,
 *          description: String,
 *          title: String,
 *          active: Boolean,
 *          done: [String]
 *      }
 *
 * @apiSuccess {String} id Id of the Link
 * @apiSuccess {String} link Third party link to specific site, or survey
 * @apiSuccess {String} description Description of the link
 * @apiSuccess {String} title Title of the link
 * @apiSuccess {Boolean} active Indicates if the link is good to present
 * @apiSuccess {Array} done Array containing ids of users who clicked the link, visited it
 *
 * @apiDescription
 * Create Link, link parameter is required. All other parameters are optional with active being true by default.
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse authError
 * @apiUse roleSuper
 * @apiErrorExample Missing Link
 *      HTTP/1.1 422
 *      {
 *          error:"Missing Link"
 *      }
 *
 */
router.post("/create", jwtCheck, authConverter, requiresRole("superadmin"), function (req, res) {
    var data = req.body;
    if (data.link == null) {
        res.status(422).json({error: "Missing link"});
    } else {
        var link = new LinkModel();
        for (var key in LinkModel.schema.paths) {
            if (Utility.allowKey(key)) {
                var value = Utility.getKey(data, key) || Utility.getKey(link, key);
                Utility.setKey(link, key, value);
            }
        }
        var id = mongoose.Types.ObjectId();
        link.id = id;
        link._id = id;
        if (link.active == null) {
            link.active = true;
        }
        link.save(function (err, result) {
            if (err) console.log(err);

            res.status(200).json(Utility.filter(result));
        });
    }
});/**
 * @api {get} /lukeA/link Update
 * @apiName Update
 * @apiGroup Link
 *
 * @apiParam {String} id Id of the link to be updated
 * @apiParam {String} [link] Link of the link to Update
 * @apiParam {String} [title] Title of the link to Update
 * @apiParam {String} [description] Description of the link to Update
 * @apiParam {Boolean} [active] Active indicates that if the link is active to present
 *
 * @apiSuccessExample Success-Response-Single:
 *      HTTP/1.1 200 OK
 *      {
 *          id:String,
 *          link: String,
 *          description: String,
 *          title: String,
 *          active: Boolean,
 *          done: [String]
 *      }
 *
 * @apiSuccess {String} id Id of the Link
 * @apiSuccess {String} link Third party link to specific site, or survey
 * @apiSuccess {String} description Description of the link
 * @apiSuccess {String} title Title of the link
 * @apiSuccess {Boolean} active Indicates if the link is good to present
 * @apiSuccess {Array} done Array containing ids of users who clicked the link, visited it
 *
 * @apiDescription
 * Update Link, id is required. All other parameters are optional.
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse authError
 * @apiUse roleSuper
 * @apiUse updateStatus
 *
 */
router.post("/update", jwtCheck, authConverter, requiresRole("superadmin"), function (req, res) {
    Utility.update(LinkModel, req.body, res);
});
/**
 * @api {get} /lukeA/link/remove Remove
 * @apiName Remove
 * @apiGroup Link
 *
 * @apiParam {String} id Id of the link to be updated
 *
 * @apiDescription
 * Remove Link by id.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeA/link/remove?id=e2921y8998e1
 *
 * @apiUse error
 * @apiUse loginError
 * @apiUse roleSuper
 * @apiUse removeStatus
 */
router.get("/remove", jwtCheck, authConverter, requiresRole("superadmin"), function (req, res) {
    Utility.remove(LinkModel, req.query.id, res);
});
/**
 * @api {get} /lukeA/link/visit Visit
 * @apiName Visit
 * @apiGroup Link
 *
 * @apiParam {String} id Id of the link to be updated
 *
 * @apiDescription
 * Used in order to register that user has clicked on the link.
 *
 * @apiExample Example URL:
 * http://balticapp.fi/lukeA/link/visit?id=e2921y8998e1
 *
 * @apiUse error
 * @apiUse loginError
 * @apiErrorExample Missing id:
 *      HTTP/1.1 422
 *      {
 *          error:"Missing Id"
 *      }
 * @apiErrorExample Wrong id:
 *      HTTP/1.1 422
 *      {
 *          error:"No such Link"
 *      }
 */
router.get("/visit",jwtCheck, authConverter,function(req,res){
   var data = req.query;
   if(data.id == null){
       res.status(422).json({error:"Missing Id"});
   }else{
       LinkModel.findOne({id:data.id},MONGO_PROJECTION,function(err,doc){
          if(err)console.log(err);
          if(doc==null){
              res.status(422).json({error:"No such Link"});
          }else{
              if(doc.done.indexOf(req.user.profile.id)==-1) {
                  doc.done.push(req.user.profile.id);
              }
              res.status(200).json({success:true});
          }
       });
   }
});
module.exports = router;