import React from "react";
import BlogPost from "./_components/BlogPost";
import { urlFor } from "@/lib/sanity";
import { fetchPostBySlug } from "@/lib";

export const generateMetadata = async ({ params }) => {
  const post = await fetchPostBySlug(params.slug);
  return {
    title: post.title,
    // description: post.excerpt,
    image: post.mainImage && urlFor(post.mainImage).url(),
  };
};

const page = () => {
  return <BlogPost />;
};

export default page;
