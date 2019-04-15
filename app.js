var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cons = require("consolidate")

var clientSessions = require("client-sessions");

var app = express();
global.admin = "fukan";
// view engine setup
app.engine("html",cons.swig)
app.set('views', path.join(__dirname, 'views'));
//connect myGameApp
//app.set('views', path.join(__dirname, 'apps/myGameApp/views'));
//connect login app
//app.set('views', path.join(__dirname, 'apps/login/views_login'));
app.set('view engine', 'html');



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//middleware for session
app.use(clientSessions({
  secret: '0GBlJZ9EKBt2Zbi2seRPvztczCewBxXK' // CHANGE THIS!
}));


app.use(express.static(path.join(__dirname, 'public')));
//connect myGameApp
//app.use(express.static(path.join(__dirname, 'apps/myGameApp/public')));
//connect login app
//app.use(express.static(path.join(__dirname, 'apps/login/public_login')));
//------------------------------------------------------------------
//settingup the urls for myGameApp
var login = require('./routes/apps/ng-login/ng-login_r');
var games = require('./routes/apps/games/games_r');
var success = require("./routes/apps/ng-success/ng-success_r");
var userprofile = require("./routes/apps/ng-userprofile/ng-userprofile_r");
var admin = require("./routes/apps/ng-admin/ng-admin_r");
app.use('/', login);
app.use('/games', games);
app.use("/success",success);
app.use("/userprofile",userprofile);
app.use("/admin",admin);
//-----------------------------------------------------

//----------------------------------------------------
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
