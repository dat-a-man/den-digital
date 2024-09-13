"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import dayjs from "dayjs";
import { MessageCircle, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLayout } from "@/lib/LayoutContext";
import axios from "axios";
import LikeButton from "./ui/LikeButton";
import TruncateText from "./TruncateText";
import { useQuery } from "@tanstack/react-query";
import BlogLoaderSkeleton from "./loaders/BlogLoaderSkeleton";

const getBlogPosts = (posts, tab) => {
  let topPosts = [];
  topPosts = posts?.filter((post) => post?.category?.includes("blog"));
  // topPosts = topPosts?.filter((post) => post?.subCategory?.includes(tab));
  if (tab === "top") {
    // Sort posts based on the number of likes (in descending order)
    topPosts = topPosts.sort((a, b) => {
      const likesA = a?.likes?.length || 0; // Default to 0 if likes is null/undefined
      const likesB = b?.likes?.length || 0; // Default to 0 if likes is null/undefined
      return likesB - likesA;
    });
  }

  return topPosts;
};

const getDataNews = (posts, tab) => {
  let topPosts = [];

  // Calculate the date 4 months ago
  const fourMonthsAgo = new Date();
  fourMonthsAgo.setMonth(fourMonthsAgo.getMonth() - 4);

  // Filter posts with category 'data-news' and published within the last 4 months
  if (posts && posts.length > 0) {
    topPosts = posts.filter(
      (post) =>
        post?.category?.includes("data-news") &&
        new Date(post.publishedAt) >= fourMonthsAgo
    );
  }

  if (posts && posts.length > 0 && tab === "top") {
    // Sort posts based on the number of likes (in descending order)
    topPosts = topPosts.sort((a, b) => {
      const likesA = a?.likes?.length || 0; // Default to 0 if likes is null/undefined
      const likesB = b?.likes?.length || 0; // Default to 0 if likes is null/undefined
      return likesB - likesA;
    });
  }

  return topPosts;
};

const getDiscussionPosts = (posts) => {
  let disscussionPosts = [];
  disscussionPosts = posts.filter(
    (post) =>
      post.latestComment.comment !== null && post.latestComment.comment !== ""
  );
  return disscussionPosts;
};

const BlogSection = ({ pageType = "all" }) => {
  const [tab, setTab] = useState("latest");
  const [blogPosts, setBlogPosts] = useState([]);
  const [dataNews, setDataNews] = useState([]);
  const [discussionPosts, setDiscussionPosts] = useState([]);
  const MAX_DISPLAY_BLOG = 4;
  const MAX_DISPLAY_DATA_NEWS = 9;
  const [posts, setPosts] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ["post-feed", "for-you"],
    queryFn: () => axios.get("/api/post-section"),
  });

  useEffect(() => {
    if (data) {
      setPosts(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (tab === "discussion") {
      setDiscussionPosts(getDiscussionPosts(posts));
    }
    setBlogPosts(getBlogPosts(posts, tab));
    setDataNews(getDataNews(posts, tab));
  }, [tab, posts]);

  if (isLoading) return <BlogLoaderSkeleton />;

  return (
    <div className=" mt-10 mx-auto overflow-hidden">
      <Separator />
      <div className="flex flex-col gap-5">
        <div className=" divide-gray-200 dark:divide-gray-700 w-full  overflow-hidden">
          <div className="w-full space-y-2 pb-8 pt-6 md:space-y-5">
            <Tabs
              defaultValue="latest"
              onValueChange={(value) => setTab(value)}
            >
              <TabsList>
                <TabsTrigger value="latest">Latest</TabsTrigger>
                <TabsTrigger value="top">Top</TabsTrigger>
                <TabsTrigger value="discussion">Discussion</TabsTrigger>
              </TabsList>
              <TabsContent value="latest">
                {(pageType === "all" || pageType === "blog") && (
                  <>
                    <div className="flex items-center gap-4 mt-5">
                      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 whitespace-nowrap">
                        Blogs
                      </h2>
                      <Separator />
                    </div>
                    <div className="flex flex-col gap-5 mt-4">
                      {blogPosts?.slice(0, MAX_DISPLAY_BLOG).map((post, i) => (
                        <>
                          <BlogCard key={post.currentSlug} post={post} />
                          {i === MAX_DISPLAY_BLOG - 1 ||
                          i === blogPosts.length - 1 ? null : (
                            <Separator />
                          )}
                        </>
                      ))}
                    </div>
                  </>
                )}

                {(pageType === "all" || pageType === "data-news") && (
                  <>
                    <div className="flex items-center gap-4 mt-7">
                      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 whitespace-nowrap">
                        Data News
                      </h2>
                      <Separator />
                    </div>
                    <div className="flex flex-col gap-5 mt-4">
                      {dataNews
                        .slice(0, MAX_DISPLAY_DATA_NEWS)
                        .map((post, i) => (
                          <>
                            <BlogCard key={post.slug} post={post} />
                            {i === MAX_DISPLAY_DATA_NEWS - 1 ||
                            i === dataNews.length - 1 ? null : (
                              <Separator />
                            )}
                          </>
                        ))}
                    </div>
                  </>
                )}
              </TabsContent>
              <TabsContent value="top">
                {(pageType === "all" || pageType === "blog") && (
                  <>
                    <div className="flex items-center gap-4 mt-5">
                      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 whitespace-nowrap">
                        Blogs
                      </h2>
                      <Separator />
                    </div>
                    <div className="flex flex-col gap-5 mt-4">
                      {blogPosts?.slice(0, MAX_DISPLAY_BLOG).map((post, i) => (
                        <>
                          <BlogCard key={post.currentSlug} post={post} />
                          {i === MAX_DISPLAY_BLOG - 1 ||
                          i === blogPosts.length - 1 ? null : (
                            <Separator />
                          )}
                        </>
                      ))}
                    </div>
                  </>
                )}

                {(pageType === "all" || pageType === "data-news") && (
                  <>
                    <div className="flex items-center gap-4 mt-7">
                      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 whitespace-nowrap">
                        Data News
                      </h2>
                      <Separator />
                    </div>
                    <div className="flex flex-col gap-5 mt-4">
                      {dataNews
                        .slice(0, MAX_DISPLAY_DATA_NEWS)
                        .map((post, i) => (
                          <>
                            <BlogCard key={post.slug} post={post} />
                            {i === MAX_DISPLAY_DATA_NEWS - 1 ||
                            i === dataNews.length - 1 ? null : (
                              <Separator />
                            )}
                          </>
                        ))}
                    </div>
                  </>
                )}
              </TabsContent>
              <TabsContent value="discussion">
                <div className="flex flex-col gap-5 mt-4">
                  {discussionPosts?.map((post, i) => (
                    <>
                      <CommentCard key={post.slug} post={post} />
                      {i === discussionPosts?.length - 1 ? null : <Separator />}
                    </>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;

const BlogCard = ({ post }) => {
  return (
    <div className="">
      <Link href={`/post/${post.currentSlug}`}>
        <div className="flex items-center space-x-4 ">
          <div className="w-[70%] space-y-2">
            <h3 className="text-[16px] lg:text-lg font-semibold text-gray-800 dark:text-gray-100">
              {post.title}
            </h3>
            <TruncateText text={post.summary} />
            {/* <p className="text-sm text-gray-600 dark:text-gray-400">
              {post.summary}
            </p> */}
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {dayjs(post.publishedAt).format("MMMM DD, YYYY")} •{" "}
              <span className="font-semibold text-gray-500">
                {post.author.name}
              </span>
            </p>
          </div>
          <div className="w-[30%] h-28 relative rounded-md overflow-hidden">
            {post?.mainImage && (
              <Image
                src={urlFor(post.mainImage).url()}
                layout="fill"
                objectFit="cover"
                alt={post.title}
                loading="lazy"
              />
            )}
          </div>
        </div>
      </Link>
      <div className="flex items-center gap-4 my-2">
        <Link
          href={`/post/${post.currentSlug}/comment`}
          className="flex items-center gap-2"
        >
          <MessageCircle
            className="text-xs text-gray-500 dark:text-gray-400"
            size={18}
          />
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {post?.commentsCount}
          </span>
        </Link>
        <LikeButton post={post} />
      </div>
    </div>
  );
};

const CommentCard = ({ post }) => {
  return (
    <div className="">
      <Link href={`/post/${post.currentSlug}/comment`}>
        <div className="flex items-center space-x-4 ">
          <div
            className={cn("space-y-2")}
            style={{
              width: post?.mainImage ? "70%" : "100%",
            }}
          >
            <h3 className="text-[16px] lg:text-lg font-semibold text-gray-800 dark:text-gray-100">
              <span> Commented on: </span> {post.title}
            </h3>
            <TruncateText text={post.summary} />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {dayjs(post.latestComment._createAt).format("MMMM DD, YYYY")} •{" "}
              <span className="font-semibold text-gray-500">
                {post.latestComment.name}
              </span>
            </p>
          </div>
          {post?.mainImage && (
            <div className="w-[30%] h-28 relative rounded-md overflow-hidden">
              <Image
                src={urlFor(post?.mainImage)?.url()}
                layout="fill"
                objectFit="cover"
                alt={post.title}
                loading="lazy"
              />
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};
