import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const PostLoader = () => {
  return (
    <div className="w-full flex flex-col gap-3">
      <Skeleton className="w-full h-[40px] rounded-md" />
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 full" />
        </div>
      </div>
      <Skeleton className="w-full h-[40px] rounded-md" />
      <Skeleton className="w-full h-[100px] rounded-md" />
      <Skeleton className="w-full h-[40px] rounded-md" />
      <Skeleton className="w-full h-[80px] rounded-md" />
    </div>
  );
};

export default PostLoader;
