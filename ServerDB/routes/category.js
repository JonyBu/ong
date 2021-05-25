const express = require('express');

const { bodyValidator, authenticateJWT, isAdmin } = require('../middlewares');
const { categoryParamsToValidate } = require('../utils/schemaValidations/categorySchema');

const { controllerWithTryCatch } = require('../utils');
const { categoriesController } = require('../controllers');

const categoriesRouter = express.Router();

categoriesRouter.post(
	'/',
	authenticateJWT,
	isAdmin,
	bodyValidator(categoryParamsToValidate),
	controllerWithTryCatch({
		callback: categoriesController.createCategory,
		statusSuccess: 201,
		statusError: 400,
	})
);

categoriesRouter.get('/', controllerWithTryCatch({
	callback: categoriesController.getAllCategories,
	statusSuccess: 200,
	statusError: 400,
}));

 categoriesRouter.patch('/:id',
 	authenticateJWT,
	isAdmin,	
 	controllerWithTryCatch({
		callback: categoriesController.updateCategory,
		statusSuccess: 200,
		statusError: 404,
 	})
);
 
 categoriesRouter.delete('/:id',
 	authenticateJWT,
 	isAdmin,	
	controllerWithTryCatch({
		callback: categoriesController.deleteCategory,
		statusSuccess: 202,
		statusError: 404,
 	})
);

module.exports = categoriesRouter;