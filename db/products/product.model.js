import Joi from "joi";

export const productModel = Joi.object({
  id: Joi.number(),
  // .required(),

  name: Joi.string()
    .required(),

  stock: Joi.number()
    .required()
})

export const createProductModel = Joi.object({
  name: Joi.string()
    .required(),
  stock: Joi.number()
    .default(0)
})
