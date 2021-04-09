const { check } = require('express-validator');

const createMemberSchema = [
  check('name').isString().withMessage('El nombre debe ser un string.'),
  check('name').trim().isLength({ min: 3 }).withMessage('El nombre debe contener 3 o más caracteres.'),
];

module.exports = createMemberSchema;
