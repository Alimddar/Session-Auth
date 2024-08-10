import { body, param } from 'express-validator';

export const createUserValidator = [
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('is_admin')
    .optional()
    .isBoolean().withMessage('is_admin must be a boolean value'),
];

export const getUserValidator = [
  param('id')
    .isInt().withMessage('User ID must be an integer'),
];

export const updateUserValidator = [
  param('id')
    .isInt().withMessage('User ID must be an integer'),
  body('username')
    .optional()
    .trim()
    .isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters'),
  body('password')
    .optional()
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('is_admin')
    .optional()
    .isBoolean().withMessage('is_admin must be a boolean value'),
];

export const deleteUserValidator = [
  param('id')
    .isInt().withMessage('User ID must be an integer'),
];