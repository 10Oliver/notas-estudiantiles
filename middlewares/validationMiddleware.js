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

const validateGrades = [
  body('grades')
    .isArray({ min: 3 })
    .withMessage('Se requiere un arreglo "grades" de al menos 3 notas'),
  body('grades.*')
    .isFloat({ min: 0, max: 10 })
    .withMessage('Cada nota debe ser un número entre 0 y 10')
    .custom((value) => {
      if (!/^\d+(\.\d{1,2})?$/.test(value.toString())) {
        throw new Error('Cada nota debe tener como máximo 2 decimales');
      }
      return true;
    }),
  handleValidationErrors
];

module.exports = {
  validateRegister,
  validateLogin,
  validateGrades
};
