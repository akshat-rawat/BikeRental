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

const UpdateUserSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  isManager: Joi.boolean().required(),
});

const BikeSchema = Joi.object({
  model: Joi.string().min(3).required(),
  color: Joi.string().min(3).required(),
  location: Joi.string().min(3).required(),
  isAvailable: Joi.boolean().required(),
});

const GetBikeSchema = Joi.object({
  page: Joi.number().min(1),
  model: Joi.string().allow(null, ''),
  color: Joi.string().allow(null, ''),
  location: Joi.string().allow(null, ''),
  rating: Joi.number().min(0),
  isAvailable: Joi.boolean(),
  fromDateTime: Joi.date().iso(),
  toDateTime: Joi.date().iso(),
});

const ReservationSchema = Joi.object({
  bikeId: Joi.number().min(1).required(),
  fromDateTime: Joi.date().iso().required(),
  toDateTime: Joi.date().iso().min(Joi.ref('fromDateTime')).required(),
});

const RatingSchema = Joi.object({
  id: Joi.number().min(1).required(),
  rate: Joi.number().min(1).max(5).required(),
});

export const loginValidate = (data: Record<string, unknown>) =>
  validate(LoginSchema, data);
export const signupValidate = (data: Record<string, unknown>) =>
  validate(SignupSchema, data);
export const userValidate = (data: Record<string, unknown>) =>
  validate(UserSchema, data);
export const updateUserValidate = (data: Record<string, unknown>) =>
  validate(UpdateUserSchema, data);
export const bikeValidate = (data: Record<string, unknown>) =>
  validate(BikeSchema, data);
export const getBikeValidate = (data: Record<string, unknown>) =>
  validate(GetBikeSchema, data);
export const reservationValidate = (data: Record<string, unknown>) =>
  validate(ReservationSchema, data);
export const ratingValidate = (data: Record<string, unknown>) =>
  validate(RatingSchema, data);
