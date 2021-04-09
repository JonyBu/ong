const Response = require('./Response');

const controllerWithTryCatch = ({ callback, statusSuccess, statusError }) => async (req, res, ...restParams) => {
	try {
		const data = await callback(req, res, ...restParams);

		Response.success(res, data, statusSuccess);
	} catch (errors) {
		Response.error(res, errors, errors.message, statusError);
	}
};

module.exports = controllerWithTryCatch;
