import Joi from "joi";

const signUpSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z\s]+$/)
    .min(3)
    .max(30)
    .required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  age: Joi.number().integer(),
  gender: Joi.string().valid("male", "female"),
  phone: Joi.string().min(7).max(14),
});

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});

const changePasswordSchema = Joi.object({
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});

const updateSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z\s]+$/)
    .min(3)
    .max(30)
    .required(),
  age: Joi.number().integer(),
  phone: Joi.string().min(7).max(14),
});

export { signUpSchema, signInSchema, updateSchema, changePasswordSchema };
