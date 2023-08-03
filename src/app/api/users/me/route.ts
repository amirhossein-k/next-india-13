import {ConnectDb} from "@/dbConfig/dbConfig";
import {getDataFromTokken} from "@/helpers/getDataFromTokken";
import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server";
ConnectDb();

export const GET = async (req: NextRequest) => {
  try {
    const userID = await getDataFromTokken(req);
    const user = await User.findOne({_id: userID}).select("-password");
    return NextResponse.json({
      message: "User Found",
      data: user,
    });
  } catch (err: any) {
    return NextResponse.json({error: err.message}, {status: 400});
  }
};
