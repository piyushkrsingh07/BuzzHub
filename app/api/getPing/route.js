import { connect } from "@/app/config/serverConfig";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        await connect()
        return NextResponse.json({
            message:'pong'
        },{status:StatusCodes.OK})
    }catch(error){
          return NextResponse.json(
                    { error: `Error Fetching Data: ${error.message}` },
                    { status:StatusCodes.error }
                  );
    }
}