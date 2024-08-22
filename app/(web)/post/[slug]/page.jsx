import React from "react";
import BlogPost from "./_components/BlogPost";
import { urlFor } from "@/lib/sanity";
import { fetchPostBySlug, fetchPosts } from "@/lib";

export async function generateStaticParams({ params }) {
  const posts = await fetchPosts();
  return posts
    .map((post) => ({
      slug: post.currentSlug,
    }))
    .slice(0, 5);
}

export const generateMetadata = async ({ params }) => {
  const post = await fetchPostBySlug(params.slug);
  // console.log("img url", post.mainImage && urlFor(post.mainImage).url());
  return {
    title: post.title,
    description: post.summary,
    image: post.mainImage && urlFor(post.mainImage).url(),
    openGraph: {
      images: [
        {
          url: post.mainImage && urlFor(post.mainImage).url(),
        },
      ],
    },
  };
};

const page = async () => {
  return <BlogPost />;
};

export default page;
