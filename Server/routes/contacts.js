const express = require('express');

const { bodyValidator } = require('../middlewares');
const { contactParamsToValidate } = require('../utils/schemaValidations/contactSchema');

const { authenticateJWT, isAdmin } = require('../middlewares');
const { controllerWithTryCatch } = require('../utils');
const { contactsController } = require('../controllers');

const contactsRouter = express.Router();

contactsRouter.get('/', authenticateJWT, isAdmin, controllerWithTryCatch({
   callback: contactsController.getAllContacts,
   statusSuccess: 200,
   statusError: 404,
}));

contactsRouter.post(
	'/',
	bodyValidator(contactParamsToValidate),
	controllerWithTryCatch({
		callback: contactsController.createContact,
		statusSuccess: 201,
		statusError: 400,
	})
);

module.exports = contactsRouter;