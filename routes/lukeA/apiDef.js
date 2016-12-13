/**
 * @apiDefine error
 * @apiError (Error) 4xx Status Code of the error
 * @apiError (Error) error Error message
 * */
/**
 * @apiDefine roleReg
 * @apiParam (Required Role) regular
 * */
/**
 * @apiDefine roleAdmin
 * @apiParam (Required Role) admin
 * */
/**
 * @apiDefine roleSuper
 * @apiParam (Required Role) superadmin
 * */
/**
 * @apiDefine roleAdv
 * @apiParam (Required Role) advanced
 * */
/**
 * @apiDefine specialAdmin
 * @apiParam (Special Access Roles) admin
 * */
/**
 * @apiDefine specialAdv
 * @apiParam (Special Access Roles) advanced
 * */
/**
 * @apiDefine loginError
 * @apiErrorExample Login Error:
 *      HTTP/1.1 401
 *      {
 *          error:"Authentication required",
 *          login:true
 *      }
 * */
/**
 * @apiDefine authError
 * @apiErrorExample Authorization Error:
 *      HTTP/1.1 401
 *      {
 *          error:'Proper authorization required',
 *          auth:true
 *      }
 * */
/**
 * @apiDefine banned
 * @apiErrorExample Banned:
 *      HTTP/1.1 401
 *      {
 *          error: 'You are banned from the service',
 *          ban: true
 *      }
 * */
/**
 * @apiDefine noUser
 * @apiErrorExample Invalid id:
 *      HTTP/1.1 404
 *      {
 *          error: 'No user with such id'
 *      }
 * */
/**
 * @apiDefine removeStatus
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200
 *      {
 *          success: "Removed N items"
 *      }
 * @apiSuccess {String} success Indicates amount of removed items.
 *
 * @apiErrorExample Missing id:
 *      HTTP/1.1 422
 *      {
 *          success: "Missing id"
 *      }
 * @apiErrorExample Wrong id:
 *      HTTP/1.1 404
 *      {
 *          success: "No such id"
 *      }
 * */
/**
 * @apiDefine updateStatus
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200
 *      {
 *          success: true
 *      }
 * @apiSuccess {Boolean} success True if update was successful
 *
 * @apiErrorExample Missing id:
 *      HTTP/1.1 422
 *      {
 *          success: "Missing id"
 *      }
 * @apiErrorExample Wrong id:
 *      HTTP/1.1 404
 *      {
 *          success: "No such id"
 *      }
 * */
/**
 * @apiDefine voteStatus
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200
 *      {
 *          success: true
 *      }
 * @apiSuccess {Boolean} success True if voting was successful
 *
 * @apiErrorExample Missing id:
 *      HTTP/1.1 422
 *      {
 *          success: "Missing id"
 *      }
 * @apiErrorExample Wrong id:
 *      HTTP/1.1 404
 *      {
 *          success: "No such id"
 *      }
 * */
/**
 * @apiDefine missingVote
 * @apiErrorExample Missing Vote:
 *      HTTP/1.1 422
 *      {
 *          success: "Missing vote:true or false"
 *      }
 * */
/**
 * @apiDefine voteCountStatus
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200
 *      {
 *          count: Number
 *      }
 * @apiSuccess {Number} count Vote count
 * @apiErrorExample Missing id:
 *      HTTP/1.1 422
 *      {
 *          success: "Missing id"
 *      }
 * @apiErrorExample Wrong id:
 *      HTTP/1.1 404
 *      {
 *          success: "No such id"
 *      }
 * */