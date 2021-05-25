const { check } = require('express-validator');

const categoryParamsToValidate = [
	check('name').isLength({ min: 2 }).withMessage('El nombre debe contener 2 o más caracteres.').notEmpty()
];

module.exports = {
	categoryParamsToValidate,
};