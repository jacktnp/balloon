var express = require('express');
var router = express.Router();

const borrowController = require("../controllers/borrow-con");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



// router.get('/test',userController.sendUrl)


// router.route('/test')
//     .get(borrowController.borrowItem)


  module.exports = router;
