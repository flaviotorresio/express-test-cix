require('./repositories/database')
const createError = require('http-errors');
const express = require('express');
const { json, urlencoded } = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');

var app = express();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', indexRouter);
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  switch (err.status) {
      case 500:
          res.status(500).json({
              "success": false,
              "code": 4001,
              "error": err.message || "Server Error"
          });
          break;
      case 404:
          res.status(404).json({
              "success": false,
              "code": 4001,
              "error": err.message || "Resource not found"
          });
          break;
      case 401:
          res.status(401).json({
              "success": false,
              "code": 2001,
              "error": err.message || "Unauthorized"
          });
          break;
      case 403:
          res.status(403).json({
              "success": false,
              "code": 2002,
              "error": err.message || "Forbidden"
          });
          break;

      default:
          res.status(404).json({
              "success": false,
              "code": 4001,
              "error": err.message || "Resource not found"
          });
          break;
  }
});
module.exports = app;
