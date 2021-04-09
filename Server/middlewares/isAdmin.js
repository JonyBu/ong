const { Response } = require('../utils');

const isAdmin = (req, res, next) => {
	const { roleId } = req.user;

	if (roleId === 2) return Response.error(res, '403 Forbidden', 'Forbidden', 403);

	next();
};

module.exports = isAdmin;
