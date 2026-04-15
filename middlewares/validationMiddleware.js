const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }
  next();
};

const validateRegister = [
  body('username')
    .notEmpty()
    .withMessage('El nombre de usuario es obligatorio')
    .isString()
    .withMessage('El nombre de usuario debe ser una cadena de texto'),
  body('email')
    .notEmpty()
    .withMessage('El correo electrónico es obligatorio')
    .isEmail()
    .withMessage('Debe proporcionar un correo electrónico válido'),
  body('password')
    .notEmpty()
    .withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
  handleValidationErrors
];

const validateLogin = [
  body('email')
    .notEmpty()
    .withMessage('El correo electrónico es obligatorio')
    .isEmail()
    .withMessage('Debe proporcionar un correo electrónico válido'),
  body('password')
    .notEmpty()
    .withMessage('La contraseña es obligatoria'),
  handleValidationErrors
];

module.exports = {
  validateRegister,
  validateLogin
};
