const express = require('express');
const serviceController = require('../controller/service.controller');
const router = express.Router()


router.route('user/').get(serviceController.user)
router.route('user/:id').get(serviceController.userDetails)
router.route('user/:id').patch(serviceController.userUpdate)
router.route('user/:id').delete(serviceController.userDeleted)
router.route('user/save').post(serviceController.serviceSave)

/* ___next use___ */
router.route('/test').get(serviceController.getTest)
router.route('/test').post(serviceController.test)


module.exports = router;



