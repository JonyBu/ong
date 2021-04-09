const { check } = require('express-validator');

const registerParamsToValidate = [
	check('firstName').isLength({ min: 3 }).withMessage('El nombre debe contener 3 o más caracteres.'),
	check('lastName').isLength({ min: 3 }).withMessage('El apellido debe contener 3 o más caracteres.'),
	check('email').isEmail().withMessage('Email inválido.'),
	check('password').isLength({ min: 6 }).withMessage('La contraseña debe contener 6 o más caracteres.'),
];

const loginParamsToValidate = [
	check('email').isEmail().withMessage('Email inválido.'),
	check('password').isLength({ min: 6 }).withMessage('La contraseña debe contener 6 o más caracteres.'),
]

module.exports = {
	registerParamsToValidate,
	loginParamsToValidate,
};
