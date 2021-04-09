const express = require('express');

const { bodyValidator } = require('../middlewares');
const { newsParamsToValidate } = require('../utils/schemaValidations/newsSchema');

const { authenticateJWT, isAdmin } = require('../middlewares');
const { controllerWithTryCatch } = require('../utils');
const { newsController } = require('../controllers');

const newsRouter = express.Router();

newsRouter.post('/',
	authenticateJWT,
	isAdmin,
	bodyValidator(newsParamsToValidate),
	controllerWithTryCatch({
		callback: newsController.createEntryNews,
		statusSuccess: 201,
		statusError: 400,
	})
);

newsRouter.get('/:id', controllerWithTryCatch({
	callback: newsController.newsDetail,
	statusSuccess: 200,
	statusError: 404,
}));

newsRouter.get('/', controllerWithTryCatch({
	callback: newsController.getAllNews,
	statusSuccess: 200,
	statusError: 400,
}));

newsRouter.put('/:id',
	authenticateJWT,
	isAdmin,
	bodyValidator(newsParamsToValidate),
	controllerWithTryCatch({
		callback: newsController.updateEntryNews,
		statusSuccess: 200,
		statusError: 400,
	})
);

newsRouter.delete('/:id',
	authenticateJWT,
	isAdmin,
	controllerWithTryCatch({
		callback: newsController.deleteNew,
		statusSuccess: 202,
		statusError: 404,
	})
);

module.exports = newsRouter;
