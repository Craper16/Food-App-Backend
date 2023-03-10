import { check } from 'express-validator';

export const signUpValidation = [
  check('email')
    .isEmail()
    .withMessage('Invalid email')
    .notEmpty()
    .withMessage('Email must not be empty')
    .toLowerCase()
    .trim(),
  check('password')
    .isString()
    .withMessage('Password must be a string')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
    )
    .withMessage(
      'Password must contain 8 or more characters, with 1 upper case, 1 lower case and a special character'
    )
    .notEmpty()
    .withMessage('Password must not be empty'),
  check('firstName')
    .isString()
    .withMessage('First name must be a string')
    .notEmpty()
    .withMessage('First name must not be empty')
    .isLength({ min: 3, max: 30 })
    .withMessage('First name must be between 3 and 30 characters')
    .trim()
    .toLowerCase(),
  check('lastName')
    .isString()
    .withMessage('Last name must be a string')
    .notEmpty()
    .withMessage('Last name must not be empty')
    .isLength({ min: 3, max: 30 })
    .withMessage('Last name must be between 3 and 30 characters')
    .trim()
    .toLowerCase(),
  check('phoneNumber')
    .isNumeric()
    .withMessage('Phone number must be a number')
    .notEmpty()
    .withMessage('Phone number must not be empty')
    .isLength({ max: 8 })
    .withMessage('Phone number must not exceed 8 numbers'),
];

export const signInValidation = [
  check('email')
    .isEmail()
    .withMessage('Invalid email entered')
    .notEmpty()
    .withMessage('Email must not be empty')
    .toLowerCase()
    .trim(),
  check('password')
    .isString()
    .withMessage('Password must be a string')
    .notEmpty()
    .withMessage('Password must not be empty'),
];

export const updateUserValidation = [
  check('firstName')
    .isString()
    .withMessage('First name must be a string')
    .notEmpty()
    .withMessage('First name must not be empty')
    .isLength({ min: 3, max: 30 })
    .withMessage('First name must be between 3 and 30 characters')
    .trim()
    .toLowerCase(),
  check('lastName')
    .isString()
    .withMessage('Last name must be a string')
    .notEmpty()
    .withMessage('Last name must not be empty')
    .isLength({ min: 3, max: 30 })
    .withMessage('Last name must be between 3 and 30 characters')
    .trim()
    .toLowerCase(),
  check('phoneNumber')
    .isNumeric()
    .withMessage('Phone number must be a number')
    .notEmpty()
    .withMessage('Phone number must not be empty')
    .isLength({ max: 8 })
    .withMessage('Phone number must not exceed 8 numbers'),
  check('address')
    .isString()
    .withMessage('Address must be a string')
    .isLength({ max: 400 })
    .withMessage('Address must not exceed 400 characters'),
];
