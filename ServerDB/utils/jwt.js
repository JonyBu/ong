const jwt = require('jsonwebtoken');

const generateJWT = ({ id, firstName, lastName, email, roleId, organizationId, image }) => {
	const payload = { id, firstName, lastName, email, roleId, organizationId, image };
	const options = { expiresIn: '2h' };

	return jwt.sign(payload, process.env.JWT_SECRET_KEY, options);
};

const decodeJWT = (token) => jwt.decode(token, process.env.JWT_SECRET_KEY)

module.exports = { generateJWT , decodeJWT }
