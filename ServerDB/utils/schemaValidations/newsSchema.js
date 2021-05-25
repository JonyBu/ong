const { check } = require('express-validator');

const newsParamsToValidate = [
	check('categoryId').notEmpty().matches(/\d/).withMessage('La categoría debe ser un id válido.'),
	check('name').isLength({ min: 3 }).withMessage('El nombre debe contener 3 o más caracteres.').notEmpty(),
	check('content').isLength({ min: 3 }).withMessage('El contenido debe contener 3 o más caracteres.').notEmpty(),
	// check('image').isObject()
	// // .withMessage('La URL de la imagen debe contener 3 o más carácteres')
];

module.exports = {
	newsParamsToValidate,
};
