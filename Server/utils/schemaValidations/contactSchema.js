const { check } = require('express-validator');

const contactParamsToValidate = [
        check('name').notEmpty().withMessage('El campo Nombre es obligatorio'),    
        check('email').isEmail().withMessage('El campo debe ser un Email.').notEmpty().normalizeEmail(),
        check('phone').isInt().withMessage('El campo Teléfono debe ser un numero').notEmpty().toInt(),
        check('message').notEmpty().withMessage('El campo Mensaje es obligatorio')       	
];

module.exports = {
	contactParamsToValidate,
};