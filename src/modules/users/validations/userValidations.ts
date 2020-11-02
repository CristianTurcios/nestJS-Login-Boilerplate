import * as Joi from '@hapi/joi';

export const postUserValidationSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
  acceptTerms: Joi.boolean().valid(true).required(),
  role: Joi.number().required(),
});

export const updateUserValidationSchema = Joi.object({
  id: Joi.string().required(),
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  email: Joi.string().email().optional(),
  acceptTerms: Joi.boolean().valid(true).optional(),
  role: Joi.number().optional(),
});

export const deleteUserValidationSchema = Joi.object({
  id: Joi.string().required(),
});
