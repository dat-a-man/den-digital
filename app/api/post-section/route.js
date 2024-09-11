import { fetchPosts } from "@/lib";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Fetch the post by slug
    const post = await fetchPosts();

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching post", error: error.message },
      { status: 500 }
    );
  }
}
