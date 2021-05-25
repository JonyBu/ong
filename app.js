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
