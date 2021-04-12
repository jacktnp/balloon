var express = require('express');
var router = express.Router();
const borrowController = require("../controllers/borrow-con");


const catchAsync = require("../utils/catchAsync")
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });


router.route('/')

    .post(borrowController.createBorrow)
    .get(catchAsync(borrowController.getAllBorrow))
router.route('/id/:id')
    .get(catchAsync(borrowController.getBorrowById))
    .put(catchAsync(borrowController.updateBorrow))
    .delete(catchAsync(borrowController.deleteBorrow))
router.route('/device/return-one-device')
    .post(catchAsync(borrowController.updateOneDeviceInBorrow))
router.route('/device/return-all-device')
    .post(catchAsync(borrowController.updateAllDeviceInBorrow))

module.exports = router;
