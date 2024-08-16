"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import { fetchComments, fetchPostBySlug } from "@/lib";
import { sanityClient, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Heart,
  Loader2,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import PostLoader from "@/components/PostLoader";
import { Button } from "@/components/ui/button";
import axios from "axios";
import dayjs from "dayjs";
import CommentList from "./_components/CommentList";
import CommentLoader from "@/components/CommentLoader";
import EnterNameModal from "./_components/EnterNameModal";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

const MAX_COMMENT = 10;

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null); // Initialize as null to better handle loading state
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentUser, setCommentUser] = useState(null);
  const [comment, setComment] = useState(null);
  const { toast } = useToast();
  const [commentLoader, setCommentLoader] = useState(true);
  const [commentPostLoader, setCommentPostLoader] = useState(false);

  const getPostData = async () => {
    const post = await fetchPostBySlug(slug);
    setPost(post);
    setLoading(false);
    setComments(post.comments);
  };

  const getComments = async () => {
    setCommentLoader(true);
    const comments = await fetchComments(post._id);
    setComments(comments);
    setCommentLoader(false);
  };

  useEffect(() => {
    if (post) {
      getComments();
    }
  }, [post]);

  useEffect(() => {
    getPostData();
  }, [slug]);

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
    setCommentPostLoader(true);
    axios
      .post("/api/comment", {
        comment,
        name: commentUser,
        _id: post._id,
      })
      .then(() => {
        getComments();
        setComment(null);
      })
      .finally(() => setCommentPostLoader(false));
  };

  const components = {
    types: {
      image: ({ value }) => (
        <img
          src={urlFor(value)?.width(800)?.url()} // Adjust size as needed
          alt={value.alt || "Image"}
          style={{ maxWidth: "100%", height: "auto" }} // Responsive styling
        />
      ),
    },
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] md:min-h-[60vh] h-full">
        <PostLoader />
      </div>
    );
  }

  if (!post) {
    return <div>No post found</div>; // Handle case where post is null
  }

  return (
    <>
      <div className="mx-auto w-full min-h-[80vh] h-full">
        <div className="mt-2 my-2">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            {post.title}
          </h3>
        </div>
        <div className="flex items-center gap-4 my-2 mt-4">
          <Avatar>
            {post.author?.image ? (
              <AvatarImage src={urlFor(post.author.image).url()} />
            ) : (
              <AvatarFallback>CN</AvatarFallback>
            )}
          </Avatar>
          <div className="flex justify-between items-center w-full">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {post.author.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {dayjs(post._createdAt).format("MMMM DD, YYYY")}
              </p>
            </div>
            <div className="flex items-center gap-4 my-2">
              <Link href={`/post/${post.currentSlug}/comment`}>
                <MessageCircle
                  className="text-xs text-gray-500 dark:text-gray-400"
                  size={18}
                />
              </Link>
            </div>
          </div>
        </div>
        <Separator />
        <div className="my-4 text-sm space-y-3 w-full mt-2">
          {post.mainImage && (
            <div className="rounded-md">
              <Image
                src={urlFor(post.mainImage).url()}
                width={800}
                height={400}
                objectFit="cover"
                alt={post.title}
                className="rounded-md"
              />
            </div>
          )}
          <div className="mt-5 w-full">
            <div className="prose w-full max-w-none">
              <PortableText value={post.body} components={components} />
            </div>
          </div>
        </div>
        <div>
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
              value={comment || ""}
            />
            <div className="flex items-center justify-end mt-2">
              {commentUser === null ? (
                <EnterNameModal
                  setCommentUser={setCommentUser}
                  commentUser={commentUser}
                />
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={comment === null || commentUser === null}
                >
                  {commentPostLoader && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {commentPostLoader ? "Posting" : "Post"}
                </Button>
              )}
            </div>
          </div>
          <Separator className="my-2" />
          {commentLoader ? (
            <CommentLoader />
          ) : (
            <CommentList comments={comments.slice(0, MAX_COMMENT)} />
          )}

          {comments.length > MAX_COMMENT && (
            <div className="flex items-center justify-center mt-5">
              <Link
                href={`/post/${post.currentSlug}/comment`}
                className="flex gap-3 items-center"
              >
                Show All <ArrowRight />
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogPost;
