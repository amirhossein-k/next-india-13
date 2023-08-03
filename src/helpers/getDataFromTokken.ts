import {NextRequest} from "next/server";
import jwt from "jsonwebtoken";
import {ObjectId} from "mongoose";
import type {JwtPayload} from "jsonwebtoken";

interface TOKKEN {
  id: ObjectId;
  username: string;
  email: string;
}

export const getDataFromTokken = (req: NextRequest) => {
  try {
    const tokken = req.cookies.get("tokken")?.value || "";
    const decodedTokken: TOKKEN | JwtPayload = jwt.verify(
      tokken,
      process.env.TOKEN_SECTET!
    ) as TOKKEN;
    return decodedTokken.id;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
