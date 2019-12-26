import { check } from 'express-validator'

export const storeValidation = [
  check('name')
    .not()
    .isEmpty()
    .withMessage('Tag name is required')
    .isLowercase()
    .withMessage('Tag name should be lowercase')
    .isAlphanumeric()
    .withMessage('Tag name should only contain alphanumeric characters')
]

export const updateValidation = [...storeValidation]
