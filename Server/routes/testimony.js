const express = require('express');
const testimoniesRouter = express.Router();
const { controllerWithTryCatch } = require('../utils');

const { bodyValidator } = require('../middlewares');
const { testimonySchema } = require('../utils/schemaValidations');

const { authenticateJWT, isAdmin } = require('../middlewares');
const { testimoniesController } = require('../controllers');

testimoniesRouter.get(
	'/',
	controllerWithTryCatch({
		callback: testimoniesController.getAllTestimonials,
		statusSuccess: 200,
		statusError: 400,
	})
);

testimoniesRouter.post(
	'/',
	[ authenticateJWT, isAdmin ],
	bodyValidator(testimonySchema),
	controllerWithTryCatch({
		callback: testimoniesController.createTestimony,
		statusSuccess: 201,
		statusError: 400,
	})
);

testimoniesRouter.put(
	'/:id',
	[ authenticateJWT, isAdmin ],
	bodyValidator(testimonySchema),
	controllerWithTryCatch({
		callback: testimoniesController.updateTestimony,
		statusSuccess: 202,
		statusError: 404,
	})
);

testimoniesRouter.delete(
	'/:id',
	[ authenticateJWT, isAdmin ],
	controllerWithTryCatch({
		callback: testimoniesController.deleteTestimony,
		statusSuccess: 202,
		statusError: 404,
	})
);

module.exports = testimoniesRouter;
