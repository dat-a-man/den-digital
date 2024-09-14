import { useLayout } from "@/lib/LayoutContext";
import React, { useState } from "react";
import { useLikePostMutation } from "../likes/mutations";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";

const isLiked = (likes, userIp) => {
  return likes.map((like) => like.ipAddress).includes(userIp);
};

const LikeButton = ({ post }) => {
  const { userIp } = useLayout();
  const mutation = useLikePostMutation();
  const [liked, setLiked] = useState(false);
  const [animate, setAnimate] = useState(false); // For handling animation

  const handleLike = (postId) => {
    setAnimate(true);
    setLiked(true);
    mutation.mutate({ _id: postId, userIp });

    // Reset animation state after 500ms (same as animation duration)
    setTimeout(() => setAnimate(false), 200);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2">
            {post?.likes && (isLiked(post.likes, userIp) || liked) ? (
              <Image
                src="/assets/unclap.svg"
                alt="clap"
                width={23}
                height={23}
                className={`cursor-pointer transition-transform duration-500 ${
                  animate ? "scale-125" : ""
                }`}
                onClick={() => handleLike(post?._id)}
              />
            ) : (
              <Image
                src="/assets/claped.svg"
                alt="clap"
                width={23}
                height={23}
                className={`cursor-pointer transition-transform duration-500 ${
                  animate ? "scale-125" : ""
                }`}
                onClick={() => handleLike(post?._id)}
              />
            )}
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {post?.likes?.length || 0}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{liked ? "Unclap" : "Clap"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default LikeButton;
