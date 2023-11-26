import Joi from "joi";

export const validateProduct = Joi.object().keys({
  title: Joi.string().required(),
  price: Joi.number().required(),
  stock: Joi.number().required(),
  image: Joi.string().required(),
  category: Joi.string().required(),
  description: Joi.string().min(5).required(),
});

export const validateUpdateProduct = Joi.object().keys({
  title: Joi.string().required(),
  product_id: Joi.string().min(8).required(),
  price: Joi.number().required(),
  image: Joi.string().required(),
  category: Joi.string().required(),
  description: Joi.string().min(5).required(),
  stock: Joi.number().required(),
});

export const validateProductId = Joi.object().keys({
  product_id: Joi.string().min(8).required(),
});
