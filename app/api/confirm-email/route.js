import { NextResponse } from "next/server";
import { Resend } from "resend";

import ConfirmEmail from "@/components/emails/subscription-confirm";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req, res) {
  try {
    const data = await resend.emails.send({
      from: process.env.SENDER_EMAIL,
      to: process.env.SEND_EMAIL,
      subject: "Subscription Confirmed",
      react: ConfirmEmail(),
    });
    return NextResponse.json({ message: "Subscription Confirmed" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to Subscribe" });
  }
}
