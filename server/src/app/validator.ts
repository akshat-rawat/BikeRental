import * as Joi from 'joi';
import { ObjectSchema } from 'joi';
import { HttpException } from '@nestjs/common';

const LoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const SignupSchema = LoginSchema.append({
  name: Joi.string().min(3).required(),
});

const validate = (schema: ObjectSchema, data: Record<string, unknown>) => {
  const { value, error } = schema.validate(data);
  if (error) throw new HttpException(error, 400);
  else return value;
};

export const loginValidate = (data) => validate(LoginSchema, data);
export const signupSchema = (data) => validate(SignupSchema, data);
