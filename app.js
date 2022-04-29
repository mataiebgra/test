var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var db = require('./routes/queries');

console.log(db)
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var corsOptions = {
origin: ["https://vega-chain-feature-drop-lypqcy.herokuapp.com","http://localhost:8100"],
optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/Filter', db.Filter);
app.use('/nftpage', db.nftpage);
app.use('/selector/:param',db.selector);
app.use('/attribute', db.tablename);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  next();
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
