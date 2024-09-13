import React, { Suspense } from "react";
import BlogSection from "@/components/BlogSection";
import { fetchPosts } from "@/lib";
import Hero from "@/components/hero";
import { Skeleton } from "@/components/ui/skeleton";

async function Home() {
  const data = await fetchPosts();
  return (
    <div className="max-w-6xl w-full m-auto min-h-[60vh]">
      <Hero />
      <BlogSection posts={data} />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <Home />
    </Suspense>
  );
}

const Loader = () => {
  return (
    <div className="max-w-6xl w-full m-auto">
      <Skeleton className="h-[400px]" />
    </div>
  );
};
