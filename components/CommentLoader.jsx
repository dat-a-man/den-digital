import React from "react";
import { Skeleton } from "./ui/skeleton";

const CommentLoader = () => {
  return (
    <div className="flex flex-col gap-5 mt-5">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex w-full items-start ">
          <Skeleton className="w-[40px] h-[40px] rounded-full" />
          <div className="flex flex-col gap-3 w-full">
            <Skeleton className="h-[20px] w-[200px] rounded-md" />
            <Skeleton className="h-[20px] w-full rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentLoader;
