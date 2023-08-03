import {ConnectDb} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server";
import bcryptjs from "bcryptjs";


ConnectDb()

export const  POST =async(req:NextRequest)=>{
    try{}catch(err){
        
    }
}