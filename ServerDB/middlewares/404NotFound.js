const { Response } = require('../utils');

module.exports = (req, res, next) => {
	next(Response.error(res, '404 Not Found.', '404 Not Found', 404));
};
