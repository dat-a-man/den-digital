"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { fetchComments, fetchPostBySlug } from "@/lib";
import axios from "axios";
import dayjs from "dayjs";
import { ExternalLink, Heart, Loader2, Share } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import CommentLoader from "@/components/CommentLoader";
import EnterNameModal from "../_components/EnterNameModal";
import CommentList from "../_components/CommentList";

const Comments = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null); // Initialize as null to better handle loading state
  const [loading, setLoading] = useState(false);
  const [commentUser, setCommentUser] = useState(null);
  const [comment, setComment] = useState("");
  const { toast } = useToast();
  const [comments, setComments] = useState([]);
  const [postLoader, setPostLoader] = useState(true);
  const [commentLoader, setCommentLoader] = useState(true);

  const getComments = async () => {
    setCommentLoader(true);
    const comments = await fetchComments(post._id);
    setComments(comments);
    setCommentLoader(false);
  };

  const getPostData = async () => {
    setPostLoader(true);
    const post = await fetchPostBySlug(slug);
    setPost(post);
    setPostLoader(false);
  };

  useEffect(() => {
    getPostData();
  }, []);

  useEffect(() => {
    if (post) getComments();
  }, [post]);

  const handleSubmit = () => {
    if (!commentUser)
      return toast({
        variant: "destructive",
        description: "Please enter your name",
      });
    if (!comment)
      return toast({
        variant: "destructive",
        description: "Please enter a comment",
      });
    setLoading(true);
    axios
      .post("/api/comment", {
        comment,
        name: commentUser,
        _id: post._id,
      })
      .then(() => {
        getComments();
        setComment("");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-[60vh]">
      <div className="mt-2 my-2">
        {postLoader ? (
          <div className="flex flex-col gap-2">
            <Skeleton className="w-full h-[30px] rounded-md" />
            <Skeleton className="w-[200px] h-[30px] rounded-md" />
          </div>
        ) : (
          <>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              {post?.title}
            </h3>
            <div className="flex items-center gap-5 mt-2">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {post?.authorName} •{" "}
                {dayjs(post?.publishedAt).format("MMMM DD, YYYY")}
              </p>
            </div>
          </>
        )}
      </div>
      <div className="flex items-center justify-between mt-5">
        <h2 className="text-3xl font-bold text-gray-800">
          Comments ({comments.length})
        </h2>
        <div className="flex items-center gap-4 mt-5">
          <Button variant="outline">
            <ExternalLink className="text-gray-600" />
          </Button>
        </div>
      </div>
      <div className="mt-3">
        <Textarea
          placeholder="Write a comment..."
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        <div className="flex items-center justify-end mt-2">
          {commentUser === null ? (
            <EnterNameModal
              setCommentUser={setCommentUser}
              commentUser={commentUser}
            />
          ) : (
            <Button onClick={handleSubmit}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Posting" : "Post"}
            </Button>
          )}
        </div>
      </div>
      <Separator className="my-2" />
      {commentLoader ? <CommentLoader /> : <CommentList comments={comments} />}
    </div>
  );
};

export default Comments;
