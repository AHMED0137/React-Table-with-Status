/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Joi from 'joi';

export const isRequired = (
  path: string | string[],
  schema: Joi.Schema
): boolean => {
  return schema?.extract(path).$_getFlag('presence') === 'required';
};

export const validateProperty = (value: any, schema: Joi.Schema) => {
  const { error } = schema.validate(value);
  return error?.details[0].message;
};

export const isValid = <T, P>(
  value: T,
  schema: Joi.Schema<P> | null | undefined
): boolean => {
  return !schema?.validate(value, {
    abortEarly: false,
  }).error;
};
