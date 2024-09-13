import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

const BlogLoaderSkeleton = () => {
  return (
    <div className="flex flex-col gap-5 mt-4">
      {/* Loop for displaying multiple skeletons */}
      <div className="flex items-center space-x-4">
        <Skeleton className="h-[30px] w-[100px]" />
        <Skeleton className="h-[30px] w-[100px]" />
        <Skeleton className="h-[30px] w-[100px]" />
      </div>
      <div className="flex items-center gap-4 mt-2">
        <Skeleton className="h-[30px] w-full rounded-md" />
        <Separator />
      </div>
      {[...Array(2)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          {/* Text and summary loader */}
          <div className="w-[70%] space-y-2">
            <Skeleton className="w-full h-[20px] rounded-md" />
            <Skeleton className="w-[80%] h-[15px] rounded-md" />
            <Skeleton className="w-[50%] h-[15px] rounded-md" />
          </div>
          {/* Image loader */}
          <div className="w-[30%] h-28 relative rounded-md overflow-hidden">
            <Skeleton className="w-full h-full rounded-md" />
          </div>
        </div>
      ))}
      <div className="flex items-center gap-4 mt-2">
        <Skeleton className="h-[30px] w-full rounded-md" />
        <Separator />
      </div>
      {[...Array(2)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          {/* Text and summary loader */}
          <div className="w-[70%] space-y-2">
            <Skeleton className="w-full h-[20px] rounded-md" />
            <Skeleton className="w-[80%] h-[15px] rounded-md" />
            <Skeleton className="w-[50%] h-[15px] rounded-md" />
          </div>
          {/* Image loader */}
          <div className="w-[30%] h-28 relative rounded-md overflow-hidden">
            <Skeleton className="w-full h-full rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogLoaderSkeleton;
