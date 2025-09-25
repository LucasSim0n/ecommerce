import Joi from 'joi';

export const userModel = Joi.object({
  email: Joi.string()
    .email()
    .required(),

  fname: Joi.string()
    .required(),

  lname: Joi.string()
    .required(),

  is_admin: Joi.boolean()
    .required(),

  password: Joi.string()
    .required(),
})

export const createUserModel = Joi.object({
  fname: Joi.string()
    .required(),

  lname: Joi.string()
    .required(),

  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .pattern(new RegExp('[a-zA-Z0-9]'))
    .required(),
})
