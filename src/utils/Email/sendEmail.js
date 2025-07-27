import nodemailer from "nodemailer";
export const sendEmail = async({to, subject, html})=>{
    //sender
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth:{
            user: process.env.EMAIL,
            pass: process.env.PASSWORD, //app password
        },
    });

    const info = await transporter.sendMail({
        from: `"Smart Note App" ${process.env.EMAIL}`,
        to, 
        subject,
        html,
    });
    return info.rejected.length === 0 ? true : false;
};
export const subject ={
    register:"Activate Account",
    resetPassword: "Reset Password",
    forgetPassword: "Forget Password",
};

//export default sendEmail;


