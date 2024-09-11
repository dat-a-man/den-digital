"use server";

import { sanityClient } from "@/lib/sanity";

export async function likePost({ _id, userIp }) {
  const post = await sanityClient.getDocument(_id);

  // Check if the user's IP already exists in the likes array
  const hasLiked = post.likes?.some((like) => like.ipAddress === userIp);

  if (hasLiked) {
    return {
      message: "You have already liked this post",
      status: 400,
    };
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

  return increaseLikes;
}
