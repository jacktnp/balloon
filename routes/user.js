var express = require('express');
var router = express.Router();
const userController = require("../controllers/user-con");



const catchAsync = require("../utils/catchAsync")
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });


router.route('/')
    .post(upload.array('image'), userController.createUser)
    .get(catchAsync(userController.getAllUser))
router.route('/:id')
    .get(catchAsync(userController.getUserById))
    .put(upload.array('image'), catchAsync(userController.updateUser))
    .delete(catchAsync(userController.deleteUser))
router.route('/email/:id')
    .get(catchAsync(userController.getUserByEmail))
    router.route('/support/check')
    .get(catchAsync(userController.getRoleSupport))

module.exports = router;
