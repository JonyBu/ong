const { check } = require('express-validator');

const activityParamsToValidate = [
	check('name').notEmpty(),
	check('content').isLength({ min: 5 }).withMessage('El Contenido debe tener al menos 5 caracteres.').notEmpty(),
	// check('image')
	// 	.if(check('image').exists())
	// 	.isLength({ min: 3 })
	// 	.withMessage('La URL de la imagen debe contener 3 o más carácteres'),
];

module.exports = {
	activityParamsToValidate,
};
