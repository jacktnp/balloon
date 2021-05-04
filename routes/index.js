var express = require('express');
var router = express.Router();

const borrowController = require("../controllers/borrow-con");
const permitAuthMiddle = require("../middlewares/permit-middle");


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/check-token', permitAuthMiddle.permit(['student', 'support']), function (req, res, next) {
  const user = req.user

  res.send({ "status": "authorize", "user": user })
});


// router.get('/test',userController.sendUrl)


// router.route('/test')
//     .get(borrowController.borrowItem)


module.exports = router;
