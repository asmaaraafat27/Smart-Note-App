import userModel from "../../DB/models/user.model.js";
import { emailEmitter } from "../../utils/Email/emailEvent.js";
import { compare, hash } from "../../utils/Hashing/hash.js"
import { sign } from "../../utils/tokens/token.js";
import { decoded_token } from "../../middlewares/Auth.middleware.js";
import * as DBService from "../../DB/DBService.js"


export const register = async (req, res, next) => {
    const {email, password} = req.body;

    const checkUser = await userModel.findOne({ email });
    if (checkUser) {
      return next(new Error("user already exists"), {cause: 409});
    }
    
    const user = await userModel.create({
      ...req.body,
      email,
      password
    });
    //send email confirmation
    emailEmitter.emit("sendEmail", user.email, user.userName);

    return res.status(201).json({success: true, message:"user created successfully!"});
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new Error("user not found!"), {cause: 404});
  }
  if (!user.confirmEmail) {
    return next(new Error("please confirm your Email!!!"), {cause: 401});
  }
  const match = compare({plainText: password , hash: user.password})//async to block code
  if (!match) {
    return next(new Error("incorrect password!"), {cause: 400});
  }
  const access_token = sign({
    payload: {id : user._id}, 
    signature:  process.env.USER_ACCESS_TOKEN ,
    options: {expiresIn: process.env.ACCESS_TOKEN_EXPIRES}
  });

  const refresh_token = sign({
    payload: {id : user._id}, 
    signature: process.env.USER_REFERESH_TOKEN,
    options: {expiresIn: process.env.REFRESH_TOKEN_EXPIRES}
  });

return res.status(200).json({success: true, message:"User logged in successfully!", tokens: {access_token, refresh_token}});
};

export const confirmEmail = async(req, res, next) => {
    const { code, email } = req.body;
    const user = await userModel.findOne({email});
    if(!user){
      return next(new Error("User not found", {cause: 404}));
    }
    if(user.confirmEmail === true){
      return next(new Error("email already verified", {cause: 409}));
    }

    if(!compare({plainText: code, hash: user.confirmEmailOTP})){
      return next(new Error("Invalid code", {cause: 400}));
    }

    await userModel.updateOne({email}, {confirmEmail: true, $unset: { confirmEmailOTP:""}});

    return res.status(200).json({success:true, message: "email verified successfully!!"});
}

export const refresh_token = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
      return res.status(401).json({ success: false, message: "Authorization header is missing" });
  }
  const user = await decoded_token({authorization, tokenType: tokenTypes.refresh, next});

  const access_token = sign({
      payload: {id : user._id}, 
      signature: process.env.USER_ACCESS_TOKEN,
      options: {expiresIn: process.env.ACCESS_TOKEN_EXPIRES}
  });

  const refresh_token = sign({
      payload: {id : user._id}, 
      signature: process.env.USER_REFERESH_TOKEN,
      options: {expiresIn: process.env.REFRESH_TOKEN_EXPIRES}
  });
  return res.status(200).json({success: true, message:"User logged in successfully!", tokens: {access_token, refresh_token}});
};

export const forgetPassword = async (req, res, next) => {
  const { email } = req.body;

  const user = await DBService.findOne({ model: userModel, filter: { email } });
  if (!user) {
    return next(new Error("user not found!"), {cause: 404});
  }
  emailEmitter.emit("forgetPassword", user.email, user.userName);
  
  return res.status(200).json({
    success: true,
    message: "If your email is associated with an account, you will receive a reset email shortly.",
  });
};

export const resetPassword = async (req, res, next) => {
  const { email, code, newPassword } = req.body;

  const user = await DBService.findOne({ model: userModel, filter: { email } });

  if (!user || !user.otp || user.otp.code !== code) {
    return next(new Error("Invalid email or OTP."), { cause: 400 });
  }

  if (user.otp.used) {
    return next(new Error("OTP has already been used."), { cause: 400 });
  }

  if (user.otp.expiresAt < new Date()) {
    return next(new Error("OTP has expired."), { cause: 400 });
  }

  await userModel.updateOne(
    { email },
    { $set: { password: hash({ plainText: newPassword }) } }
  );
  user.otp.used = true;

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Password has been reset successfully.",
  });
};

const revokedTokens = new Set(); // Simple in-memory store for revoked tokens

export const logout = async (req, res, next) => {
  const { email, password } = req.body;
  const token = req.headers.authorization?.split(" ")[1]; // Get Bearer token

  const user = await userModel.findOne({ email });
  if (!user) return next(new Error("User not found"), { cause: 404 });

  const isPasswordValid = compare({ plainText: password, hash: user.password });
  if (!isPasswordValid) return next(new Error("Invalid password"), { cause: 401 });

  if (!token) return next(new Error("No token provided"), { cause: 401 });

  revokedTokens.add(token); // Revoke the token

  return res.status(200).json({ success: true, message: "Logged out successfully" });
};
