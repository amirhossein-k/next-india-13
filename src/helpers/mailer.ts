import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import {ObjectId} from "mongoose";

interface SENDEMAIL {
  email: string;
  emailType: string;
  userID: ObjectId | string;
}

export const sendEmail = async ({email, emailType, userID}: SENDEMAIL) => {
  try {
    // create a hashed token
    const hashedToken = await bcryptjs.hash(userID.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userID, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userID, {
        forgetPasswordToken: hashedToken,
        forgetPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "cb4dee7498163e",
        pass: "6d2f50d55e5dbd",
        //   TODO: add these credentails to .env file
      },
    });
    const mailOptions = {
      from: "haamir3030@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verfiy your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERFIY" ? "Verfiy your email" : "Reset your password"
      } or copy  <br> ${
        process.env.DOMIN
      }/verifyemail?token=${hashedToken}</p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);

    return mailresponse;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
