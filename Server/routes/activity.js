const express = require('express');

const { bodyValidator, authenticateJWT, isAdmin } = require('../middlewares');
const { activityParamsToValidate } = require('../utils/schemaValidations/activitySchema');

const { controllerWithTryCatch } = require('../utils');
const { activitiesController } = require('../controllers');

const activitiesRouter = express.Router();

activitiesRouter.post('/',
	authenticateJWT,
	isAdmin,
	bodyValidator(activityParamsToValidate),
	controllerWithTryCatch({
		callback: activitiesController.createActivity,
		statusSuccess: 201,
		statusError: 400,
	})
);

activitiesRouter.get('/:id', controllerWithTryCatch({
	callback: activitiesController.getActivityDetails,
	statusSuccess: 200,
	statusError: 404,
}));

activitiesRouter.get(
	'/',
	controllerWithTryCatch({
		callback: activitiesController.getAllActivities,
		statusSuccess: 200,
		statusError: 400,
	})
);

activitiesRouter.put(
	'/:id',
	authenticateJWT,
	isAdmin,
	bodyValidator(activityParamsToValidate),
	controllerWithTryCatch({
		callback: activitiesController.updateActivity,
		statusSuccess: 200,
		statusError: 400,
	})
);

activitiesRouter.delete(
	'/:id',
	authenticateJWT,
	isAdmin,
	controllerWithTryCatch({
		callback: activitiesController.deleteActivity,
		statusSuccess: 202,
		statusError: 404,
	})
);

module.exports = activitiesRouter;
