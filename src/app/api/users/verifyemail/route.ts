import {ConnectDb} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server";

ConnectDb();

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const {tokken} = reqBody;
    console.log(tokken);

    const user = await User.findOne({
      verifyToken: tokken,
      verifyTokenExpiry: {$gt: Date.now()},
    });

    if (!user) {
      return NextResponse.json({error: "Invalid tokken"}, {status: 400});
    }

    console.log(user);

    user.isVerfied = true;
    user.verifyTokenExpiry = undefined;
    user.verifyToken = undefined;

    await user.save();

    return NextResponse.json({
      message: "Email is Verfied Successfull",
      success: true,
    });
  } catch (err: any) {
    return NextResponse.json({error: err.message}, {status: 500});
  }
};
