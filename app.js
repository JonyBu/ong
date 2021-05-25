const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();


// Middlewares
const { handlerNotFound, unless } = require('./ServerDB/middlewares');
const { upload } = require('./ServerDB/middlewares/multer');

// Routes
const router = require('./ServerDB/routes');

const app = express();

app.use(cors());
app.use(logger('dev', { skip: () => process.env.NODE_ENV === 'test' }));
app.use(express.json());

//HEROKU
const path = require('path');
const bodyParser = require("body-parser");

if (process.env.NODE_ENV !== 'production') require('dotenv').config()

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'cliente/build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'Client/build', 'index.html'));
});

if (process.env.NODE_ENV === "production") {
	// Set static folder
	app.use(express.static("cliente/build"));
  
	app.get("*", (req, res) => {
	  res.sendFile(path.resolve(__dirname, "cliente", "build", "index.html"));
	});
  }

/* IMAGES MIDDLEWARES */
app.use(unless('/organizations/1/public/1', upload));

app.use(router);

// catch 404 and forward to error handler
app.use(handlerNotFound);

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
});


module.exports = app;
