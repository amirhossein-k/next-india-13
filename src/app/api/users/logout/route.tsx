import {ConnectDb} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server";

ConnectDb();

export const GET = async () => {
  try {
    const response = NextResponse.json({
      message: "Logout successful",
      succes: true,
    });
    response.cookies.set("tokken", "", {httpOnly: true, expires: new Date(0)});

    return response;
  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 500});
  }
};
