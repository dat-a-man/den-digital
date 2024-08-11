import { fetchEmail } from "@/lib";
import { sanityClient } from "@/lib/sanity";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ message: "Please Enter Email" });
  }

  const isEmialExist = await fetchEmail(email);

  if (isEmialExist) {
    return NextResponse.json({ message: "Email already Subscribed" });
  }

  try {
    await sanityClient.create({
      _type: "userEmail",
      email,
    });
  } catch (error) {
    return NextResponse.json({ message: "Failed to Subscribe" });
  }
  return NextResponse.json({ message: "News Letter Subscribed" });
}
