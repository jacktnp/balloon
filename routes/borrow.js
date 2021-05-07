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
router.route('/device/history-user-borrow/:id')
    .get(catchAsync(borrowController.historyUserBorrow))
router.route('/support/history-all-borrow')
    .get(catchAsync(borrowController.historyAllBorrow))

router.route('/device/alert-return')
    .get(borrowController.alertReturn)

router.route('/device/alert-return-by-email/:id')
    .post(borrowController.alertReturnByEmail)

router.route('/device/history-user-status-borrow/:id')
    .get(catchAsync(borrowController.historyUserBorrowStatusBorrow))

var cron = require('node-cron');
const axios = require('axios');
cron.schedule(' 0 9 * * *', () => {
    axios.get('https://websitedesignit1.herokuapp.com/borrow/device/alert-return').then(resp => {
        console.log("---------user alert------------");
        console.log(resp.data);
    });
});





module.exports = router;
