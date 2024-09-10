import { sanityClient } from "@/lib/sanity";
import { NextResponse } from "next/server";
import requestIp from "request-ip";

export async function PATCH(req, res) {
  const { _id, userIp } = await req.json(); // Expecting the post _id and user's IP from the request body
  console.log("User IP address: ", userIp, _id);
  try {
    // Fetch the post to check existing likes
    const post = await sanityClient.getDocument(_id);

    // Check if the user's IP already exists in the likes array
    const hasLiked = post.likes?.some((like) => like.ipAddress === userIp);

    if (hasLiked) {
      return NextResponse.json({
        message: "You have already liked this post",
        status: 400,
      });
    }

    // Add new like (IP address and timestamp) to the likes array
    const newLike = {
      _key: Math.random().toString(36).substr(2, 9), // Generate a random unique key for the object
      ipAddress: userIp,
      likedAt: new Date().toISOString(),
    };

    // Update the document in Sanity by pushing the new like to the 'likes' array
    const increaseLikes = await sanityClient
      .patch(_id)
      .setIfMissing({ likes: [] }) // Ensure likes array exists
      .append("likes", [newLike]) // Push the new like object to the likes array
      .commit();

    return NextResponse.json({
      message: "Like added",
      likes: increaseLikes.likes,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to update likes",
      error: error.message,
    });
  }
}
