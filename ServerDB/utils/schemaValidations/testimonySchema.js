const { check } = require('express-validator');

const testimonyParamsToValidate = [
	check('name').isLength({ min: 3 }).withMessage('El nombre debe contener 3 o más caracteres.'),
	// check('image').isLength({ min: 3 }).withMessage('La URL de la imagen debe contener 3 o más carácteres.'),
	check('content').isLength({ min: 3 }).withMessage('El contenido debe contener 3 o más caracteres.').notEmpty(),
];

module.exports = testimonyParamsToValidate;
