import { sanityClient } from "@/lib/sanity";
import { NextResponse } from "next/server";

export async function PATCH(req, res) {
  const { _id } = await req.json();
  try {
    const increaseLikes = await sanityClient
      .patch(_id)
      .setIfMissing({ likes: 0 })
      .inc({ likes: 1 })
      .commit();
    return NextResponse.json({ message: "Likes incremented" });
  } catch (error) {
    return NextResponse.json({ message: "Failed to update comment" });
  }
}
