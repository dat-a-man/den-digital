import { useLayout } from "@/lib/LayoutContext";
import axios from "axios";
import { ThumbsUp } from "lucide-react";
import React from "react";
import { useLikePostMutation } from "../likes/mutations";

const LikeButton = ({ post }) => {
  const { userIp } = useLayout();
  const mutation = useLikePostMutation();

  const handleLike = () => {
    mutation.mutate({ _id: post._id, userIp });
    // axios
    //   .patch("/api/views", {
    //     _id: post._id,
    //     userIp,
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //   });
  };

  return (
    <div className="flex items-center gap-2">
      <ThumbsUp
        className="text-xs text-gray-500 dark:text-gray-400 cursor-pointer"
        size={18}
        onClick={() => handleLike(post?._id)}
        fill={
          post?.likes &&
          post?.likes.filter((like) => like.ipAddress === userIp).length > 0
            ? "#6b7280"
            : "none"
        }
      />
      <span className="text-xs text-gray-500 dark:text-gray-400">
        {post?.likes && post?.likes.length}
      </span>
    </div>
  );
};

export default LikeButton;
