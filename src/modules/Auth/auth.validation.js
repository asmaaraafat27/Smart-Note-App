import joi from "joi";
import { generalFields } from "../../middlewares/validation.middleware.js";

export const registerSchema = joi.object({
    userName: generalFields.userName.required(),
    email: generalFields.email.required(),
    password: generalFields.password.required(),
    confirmPassword: generalFields.confirmPassword.required(),
    role: generalFields.role,
}).required();

export const loginSchema = joi.object({
  email: generalFields.email.required(),
  password: generalFields.password.required(),
}).required();

export const confirmEmailSchema = joi.object({
  email: generalFields.email.required(),
  code: generalFields.code.required(),
}).required();

export const forgetPasswordSchema = joi.object({
  email: generalFields.email.required(),
}).required();

export const resetPasswordSchema = joi.object({
  email: generalFields.email.required(),
  code: generalFields.code.required(),
  newPassword: generalFields.password.required(),
}).required();

export const logoutSchema = joi.object({
  email: generalFields.email.required(),
  password: generalFields.password.required()
}).required();
