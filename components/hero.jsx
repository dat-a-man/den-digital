"use client";
import { useLayout } from "@/lib/LayoutContext";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  const data = useLayout();
  return (
    <div className="mt-5 rounded-md max-w-4xl w-full mx-auto">
      {/* <Link href="/"> */}
      {data?.homePageBanner && (
        <div className="grid grid-cols-1 items-center">
          <div className="aspect-auto">
            <Image
              src={urlFor(data.homePageBanner).url()}
              width={800}
              height={700}
              alt="blog"
              className="rounded-md"
            />
          </div>
        </div>
      )}
      {/* </Link> */}
    </div>
  );
};

export default Hero;
