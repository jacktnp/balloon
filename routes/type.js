var express = require('express');
var router = express.Router();
const typeController = require("../controllers/type-con");
// const jwtAuthMiddle = require("../middlewares/jwt-auth-middle");
// const permitAuthMiddle = require("../middlewares/permit-middle");
// const authMiddle = require("../middlewares/auth-middle");
// const { validateTypeSchema } = require("../middlewares/joi-middle");



const catchAsync = require("../utils/catchAsync")
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });


router.route('/')
    .post(upload.array('image'), typeController.createType)
    .get(catchAsync(typeController.getAllType))
router.route('/id/:id')
    .get(catchAsync(typeController.getTypeById))
    .put(upload.array('image'), catchAsync(typeController.updateType))
    .delete(catchAsync(typeController.deleteType))

router.route('/type-and-device')
    .get( typeController.getTypeAndDevice)

module.exports = router;
