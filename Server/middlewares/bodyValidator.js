const { validationResult } = require('express-validator');
const { Response } = require('../utils');

const bodyValidator = (arrayOfChecks) => async (req, res, next) => {
	await Promise.all(arrayOfChecks.map((paramsToValidate) => paramsToValidate.run(req)));

	const errors = validationResult(req);

	if (!errors.isEmpty()) return Response.error(res, errors.array()[0].msg, errors.array()[0].msg, 400);

	next();
};

module.exports = bodyValidator;
