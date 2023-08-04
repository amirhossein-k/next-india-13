import {ConnectDb} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server";
import bcryptjs from "bcryptjs";
import {sendEmail} from "@/helpers/mailer";

ConnectDb();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const {username, email, password} = reqBody;

    console.log(reqBody);

    // check if user aleady exist
    const user = await User.findOne({email});

    if (user) {
      return NextResponse.json({error: "User aleady exists"}, {status: 400});
    }

    // hash password

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser, "savedUser");

    // send veryfied email

    await sendEmail({email, emailType: "VERIFY", userID: savedUser._id});
    return NextResponse.json(
      {
        message: "User created successfuly",
        success: true,
        savedUser,
      },
      {status: 201}
    );
  } catch (err: any) {
    return NextResponse.json({error: err.message}, {status: 500});
  }
}
