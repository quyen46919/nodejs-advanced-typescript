import { NextFunction, Request, Response } from "express";

const Joi = require('joi');
const pick = require('../utils/pick');

const validate = (schema: Object) => (req: Request, res: Response, next: NextFunction) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details: any) => details.message).join(', ');
    return next(new Error(errorMessage));
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;
