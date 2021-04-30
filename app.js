
require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var passport = require('passport');
require('./config/passport')(passport);

// myimport --------------------
// const listEndpoints = require("express-list-endpoints");
const ExpressError = require('./utils/ExpressError');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
var mongoose = require('mongoose');
// var bodyParser = require('body-parser');
var cors = require('cors')

app.use(cors())

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var typeRouter = require('./routes/type');
var borrowRouter = require('./routes/borrow');
var deviceRouter = require('./routes/device');
var loginRouter = require('./routes/login');







// -------------------------------
// app.use(express.json());
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());
// --------------------------------

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// ------connect DB------
var configDB = require('./config/database.js');
mongoose.connect(process.env.MONGODB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log("--------------- Database Connected!  --------------");
})
    .catch(() => {
        console.log("--------- Can not Connect to Database!!!! --------");
    });
// ---------

app.use(mongoSanitize({
    replaceWith: '_'
}))
app.use(helmet());


const requireJWTAuth = passport.authenticate("jwt", {
    // successRedirect: '/',
    // failureRedirect: '/hello',
    session: false
  });

app.use('/', indexRouter);
app.use('/user',usersRouter);
app.use('/type',requireJWTAuth, typeRouter);
app.use('/borrow', borrowRouter);
app.use('/device',requireJWTAuth, deviceRouter);
app.use('/login', loginRouter);

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'ERRORRRRRRRRRRr'
    res.status(statusCode).json({ error: err })
})
// console.log(listEndpoints(app));


var server = app.listen(8080, function () {
    console.log('Ready on port %d', server.address().port);
});




module.exports = app;
