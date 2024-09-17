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
  Copy,
  CopyCheck,
  ExternalLink,
  Heart,
  Loader2,
  MessageCircle,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import PostLoader from "@/components/PostLoader";
import { Button } from "@/components/ui/button";
import axios from "axios";
import dayjs from "dayjs";
import CommentList from "./CommentList";
import CommentLoader from "@/components/CommentLoader";
import EnterNameModal from "./EnterNameModal";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import { useLayout } from "@/lib/LayoutContext";
import LikeButton from "@/components/ui/LikeButton";

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
    try {
      const response = await fetch(`/api/posts?slug=${slug}`);

      if (!response.ok) {
        throw new Error(`Error fetching post: ${response.statusText}`);
      }

      const data = await response.json();

      setPost(data);
      setComments(data.comments);
      setLoading(false);
      // setUserIp(response.ip);
    } catch (error) {
      console.error("Error fetching post data:", error);
      setLoading(false);
    }
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
      code: ({ value }) => {
        const [copied, setCopied] = useState(false);
        useEffect(() => {
          Prism.highlightAll();
        }, []);
        const handleCopy = () => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        };

        return (
          <div style={{ position: "relative" }}>
            <CopyToClipboard text={value.code} onCopy={handleCopy}>
              <div
                variant="outline"
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  color: "white",
                  border: "none",
                  borderRadius: "3px",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
              >
                {copied ? (
                  <CopyCheck className="text-black" />
                ) : (
                  <Copy className="text-black" />
                )}
              </div>
            </CopyToClipboard>
            <pre data-language={value.language}>
              <code className={`language-${value.language}`}>{value.code}</code>
            </pre>
          </div>
        );
      },
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
          <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 dark:text-gray-100">
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
                {dayjs(post.publishedAt).format("MMMM DD, YYYY")}
              </p>
            </div>
            <div className="flex items-center gap-4 my-2">
              <Link href={`/post/${post.currentSlug}/comment`}>
                <MessageCircle
                  className="text-xs text-gray-500 dark:text-gray-400"
                  size={18}
                />
              </Link>
              <LikeButton post={post} />
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
                loading="lazy"
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
