import { fetchPostBySlug } from "@/lib";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Extract the slug from the request URL
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { message: "Slug is required" },
        { status: 400 }
      );
    }

    // Fetch the post by slug
    const post = await fetchPostBySlug(slug);

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
