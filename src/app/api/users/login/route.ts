import {ConnectDb} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server";
import bcryptjs from "bcryptjs";
import {error} from "console";
import {ObjectId} from "mongoose";
import jwt from "jsonwebtoken";
ConnectDb();

interface REQBODY {
  email: string;
  password: string;
}
interface USER {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
  isVerfied: boolean;
  isAdmin: boolean;
}

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const {email, password}: REQBODY = reqBody;

    // check exist
    const user: USER | null = await User.findOne({email});
    if (!user) {
      return NextResponse.json({error: "User Not Exist "}, {status: 404});
    }
    // check password currect
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({error: "Invalid password"}, {status: 400});
    }
    // create tokken data
    const tokkenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    // create tokken
    const tokken = await jwt.sign(tokkenData, process.env.TOKEN_SECTET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      {
        message: "Login Successful",
        success: true,
      },
      {status: 201}
    );

    response.cookies.set("tokken", tokken, {httpOnly: true});

    return response;
  } catch (err: any) {
    return NextResponse.json({error: err.message}, {status: 500});
  }
};
