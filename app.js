var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
var sassMiddleware = require('node-sass-middleware');

var indexRouter = require('./routes/index');

var app = express();

/**
 * Case sensitive routing, restriguir acceso a rutas
 * cuando no son consultadas de forma absoluta
 */

app.enable("case sensitive routing");

/**
 * Disable 'X-Powered-By'
 */
app.disable('x-powered-by')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public/stylesheets'),
  indentedSyntax: false,
  sourceMap: false,
  outputStyle: "compressed",
  force: true,
  prefix: '/stylesheets',
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


/*
Validar errores
*/
app.use((req, res, next) => {
  next(createError(404));
});

/**
 * Gestionar errores
 */
app.use((err, req, res, next) => {
  switch (parseInt(err.status)) {
    case 404:
      res.status(404);
      res.render("404");
      break;
    default:
      res.status(500);
      console.log(err.message)
      res.render("error");
      break;
  }
});

module.exports = app;
