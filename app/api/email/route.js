import { fetchEmail } from "@/lib";
import { sanityClient } from "@/lib/sanity";
import { NextResponse } from "next/server";
import { Resend } from "resend";

import { Button, Html } from "@react-email/components";
import KoalaWelcomeEmail from "@/components/emails/welcome-emails";

export const MyEmail = () => {
  return (
    <Html>
      <Button
        href="https://example.com"
        style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
      >
        Click me
      </Button>
    </Html>
  );
};

const resend = new Resend("re_NKtBgakr_AF6yqzZpvvGn7n1wfTAUq6MQ");

export async function POST(req, res) {
  try {
    const data = await resend.emails.send({
      from: "newsletter@den.digital",
      to: "cotsec14@gmail.com",
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
