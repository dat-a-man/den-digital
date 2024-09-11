"use client";
import { useLayout } from "@/lib/LayoutContext";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogHero = () => {
  const { layoutData: data } = useLayout();
  return (
    <div className="mt-5 rounded-md max-w-4xl w-full mx-auto">
      {/* <Link href="/blog"> */}
      {data?.blogPageBanner && (
        <div className="grid grid-cols-1 items-center">
          <div className="aspect-[5/3]">
            <Image
              src={urlFor(data?.blogPageBanner)?.url()}
              width={800}
              height={400} // Reduced height
              alt="blog"
              className="rounded-md object-cover" // Ensures the image covers the container
            />
          </div>
        </div>
      )}
      {/* </Link> */}
    </div>
  );
};

export default BlogHero;
