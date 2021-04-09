const express = require('express');
const authRouter = express.Router();
const { controllerWithTryCatch } = require('../utils');

const { bodyValidator, authenticateJWT } = require('../middlewares');
const { registerParamsToValidate, loginParamsToValidate } = require('../utils/schemaValidations/authSchema');

const { authController } = require('../controllers');
const { createUser, loginUser, getMe } = authController;

authRouter.post(
	'/register',
	bodyValidator(registerParamsToValidate),
	controllerWithTryCatch({
		callback: createUser,
		statusSuccess: 201,
		statusError: 400,
	})
);

authRouter.post(
	'/login',
	bodyValidator(loginParamsToValidate),
	controllerWithTryCatch({
		callback: loginUser,
		statusSuccess: 200,
		statusError: 400,
	})
);

authRouter.get(
	'/me',
	authenticateJWT,
	controllerWithTryCatch({
		callback: getMe,
		statusSuccess: 200,
		statusError: 400,
	})
);

module.exports = authRouter;
