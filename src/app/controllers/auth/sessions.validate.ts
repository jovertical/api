import { check } from 'express-validator'

export const signinValidation = [
  check('email')
    .not()
    .isEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('You should enter a valid email'),
  check('password')
    .not()
    .isEmpty()
    .withMessage('Password is required')
]
