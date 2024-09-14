import { NextResponse } from "next/server";
import { Resend } from "resend";

import KoalaWelcomeEmail from "@/components/emails/welcome-emails";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req, res) {

  try {
    const data = await resend.emails.send({
      from: process.env.SENDER_EMAIL,
      to: process.env.SEND_EMAIL,
      subject: "New User Subscribed",
      react: KoalaWelcomeEmail(),
    });

    console.log(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to Subscribe" });
  }
  return NextResponse.json({ message: "News Letter Subscribed" });
}
