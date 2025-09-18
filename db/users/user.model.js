import Joi from "joi";

export const user = Joi.object({
  id: Joi.number()
    .required(),

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
    .pattern(new RegExp('[a-zA-Z0-9]')),

  jwt: Joi.string(),

  refresh_token: Joi.string()
})

  .xor("password", "jwt")
  .with("jwt", "refresh_token")

export const createUser = Joi.object({
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

  repeat_password: Joi.ref('password')
    .required(),
})
