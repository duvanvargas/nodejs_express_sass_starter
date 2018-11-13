var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
var uglifyMiddleware = require('express-uglify-middleware');
var sassMiddleware = require('node-sass-middleware');
var reloadify = require('reloadify')(__dirname + '/views');
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
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//JS
app.use(uglifyMiddleware({ 
  src: path.join(__dirname, 'js'),
  dest: path.join(__dirname, 'public/js'),
  prefix: "/js",
  compress: true,
  force: false,
  debug: false
}));

//SASS
app.use(sassMiddleware({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public/css'),
  indentedSyntax: false,
  sourceMap: false,
  outputStyle: "compressed",
  force: true,
  prefix: '/css',
}));
//

app.use(reloadify);


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
