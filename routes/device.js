var express = require('express');
var router = express.Router();
const deviceController = require("../controllers/device-con");


const catchAsync = require("../utils/catchAsync")
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });

router.route('/')
    .post(deviceController.createDevice)
    .get(catchAsync(deviceController.getAllDevice))
router.route('/id/:id')
    .get(catchAsync(deviceController.getDeviceById))
    .put(catchAsync(deviceController.updateDevice))
    .delete(catchAsync(deviceController.deleteDevice))
router.route('/search')
    .post(deviceController.getManyDevice)



module.exports = router;
