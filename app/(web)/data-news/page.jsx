import React, { Suspense } from "react";
import BlogSection from "@/components/BlogSection";
import { fetchPosts } from "@/lib";
import { Skeleton } from "@/components/ui/skeleton";
import DataNewsHero from "@/components/DataNewsHero";

export const metadata = {
  title: "Data News",
};

async function Blog() {
  const data = await fetchPosts();

  return (
    <div className="max-w-6xl w-full m-auto min-h-[70vh] md:min-h-[60vh]">
      <DataNewsHero />
      <BlogSection posts={data} pageType="data-news" />
    </div>
  );
}

export default function Page() {
  return (
    <>
      <Suspense fallback={<HeroLoaer />}>
        <Blog />
      </Suspense>
    </>
  );
}

const HeroLoaer = () => {
  return (
    <div className="max-w-6xl w-full min-h-[70vh] md:min-h-[60vh] m-auto">
      <Skeleton className="h-[400px]" />
    </div>
  );
};
