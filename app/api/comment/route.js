import { sanityClient } from "@/lib/sanity";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const { comment, name, _id } = await req.json();
  if (!comment || !_id) {
    return NextResponse.json({ message: "Comment not posted" });
  }
  try {
    const newComment = await sanityClient.create({
      _type: "comment",
      name,
      comment,
      post: {
        _type: "reference",
        _ref: _id,
      },
    });
  } catch (error) {
    return NextResponse.json({ message: "Failed to post comment" });
  }
  return NextResponse.json({ message: "Comment posted" });
}
