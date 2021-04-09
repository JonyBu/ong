const { Response } = require('../utils');
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) return Response.error(res, 'No token - Unauthorized.', 'No autorizado.', 401);

	jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
		if (err) return Response.error(res, '403 Forbidden', 'Forbidden', 403);

		req.user = user;
		next();
	});
};

module.exports = authenticateJWT;
