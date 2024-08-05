import { body } from 'express-validator';

export const validateSignup = [
  body('username')
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be at least 3 or maximum 20 characters long')
    .isAlphanumeric()
    .withMessage('Username must contain only letters and numbers'),

  body('email')
    .isEmail()
    .withMessage('Must be a valid email address')
    .normalizeEmail(),

  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[A-Z])/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/^(?=.*[a-z])/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/^(?=.*\d)/)
    .withMessage('Password must contain at least one number')
    .matches(/^(?=.*[@$!%*?&])/)
    .withMessage(
      'Password must contain at least one special character (@$!%*?&)',
    ),
];
