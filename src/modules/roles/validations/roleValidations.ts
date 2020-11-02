import * as Joi from '@hapi/joi';

export const postRoleValidationSchema = Joi.object({
  role: Joi.string().required(),
});

export const updateRoleValidationSchema = Joi.object({
  id: Joi.number().required(),
  role: Joi.string().required(),
});

export const deleteRoleValidationSchema = Joi.object({
  id: Joi.number().required(),
});