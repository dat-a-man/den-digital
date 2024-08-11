import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dayjs from "dayjs";

const CommentList = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment._id} className="mt-5">
          <div className="flex items-start gap-4 my-2 mt-4">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>
                {comment.name && comment.name[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-3 w-full">
              <div className="flex items-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
                  {comment.name} •{" "}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 ml-1">
                  {dayjs(comment?.publishedAt).format("MMMM DD, YYYY")}
                </p>
              </div>
              <p className="text-sm text-gray-600">{comment?.comment}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
