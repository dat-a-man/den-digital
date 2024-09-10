import { NextResponse } from "next/server";

export async function GET(req) {
  const forwarded = req.headers.get("x-forwarded-for");
  const userIp = forwarded ? forwarded : req.socket.remoteAddress;

  console.log("User IP address: ", userIp);
  return NextResponse.json(userIp, { status: 200 });
}
