import * as Joi from 'joi';
import { ObjectSchema } from 'joi';
import { HttpException } from '@nestjs/common';

const validate = (schema: ObjectSchema, data: Record<string, unknown>) => {
  const { value, error } = schema.validate(data);
  if (error) throw new HttpException(error, 400);
  else return value;
};


const LoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const SignupSchema = LoginSchema.append({
  name: Joi.string().min(3).required(),
});

const UserSchema = SignupSchema.append({
  isManager: Joi.boolean().required(),
});

export const loginValidate = (data: Record<string, unknown>) => validate(LoginSchema, data);
export const signupSchema = (data: Record<string, unknown>) => validate(SignupSchema, data);
export const userSchema = (data: Record<string, unknown>) => validate(UserSchema, data);


const BikeSchema = Joi.object({
  model: Joi.string().min(1).required(),
  color: Joi.string().min(1).required(),
  location: Joi.string().min(1).required(),
  isAvailable: Joi.boolean().required(),
});

export const bikeSchema = (data: Record<string, unknown>) => validate(BikeSchema, data);


const ReservationSchema = Joi.object({
  fromDateTime: Joi.date().iso().required(),
  toDateTime: Joi.date().iso().greater(Date.now()).min(Joi.ref('fromDateTime')).required(),
});

export const reservationSchema = (data: Record<string, unknown>) => validate(ReservationSchema, data);