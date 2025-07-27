import { EventEmitter } from "events";
import { sendEmail, subject } from "./sendEmail.js";
import {template, forgetPasswordTemplate } from "./generateHTML.js";
import jwt from "jsonwebtoken";
import { customAlphabet } from "nanoid";
import { hash } from "../Hashing/hash.js";
import userModel from "../../DB/models/user.model.js";
export const emailEmitter = new EventEmitter();

emailEmitter.on("sendEmail", async(email,userName)=>{

    // nanoid
    const otp = customAlphabet("1234567890",5)();
    const hashOTP = hash({plainText: otp}); 
    await userModel.updateOne({email}, {confirmEmailOTP: hashOTP});
    
    await sendEmail({
      to: email,
      subject: subject.register,
      html: template(otp, userName),
    });
})

// Forget password email listener
emailEmitter.on("forgetPassword", async (email, userName) => {
    const otp = customAlphabet("1234567890", 5)();

    const otpData = {
      code: otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
      used: false,
    };

    await userModel.updateOne({ email }, { otp: otpData });

    await sendEmail({
      to: email,
      subject: subject.forgetPassword,
      html: forgetPasswordTemplate(otp, userName),
    });
});

