import Link from "next/link";
import React from "react";
import { Separator } from "./ui/separator";
const siteMetadata = {
  description:
    "All the previous edition of the Data News, a free weekly data engineering newsletter.",
  locale: "en-US",
};

const posts = [
  {
    slug: "how-to-learn-react",
    date: "2024-07-01",
    title: "How to Learn React",
    summary:
      "This article provides a comprehensive guide on how to get started with React and master it efficiently.",
    tags: ["React", "JavaScript", "Frontend"],
  },
  {
    slug: "understanding-nodejs",
    date: "2024-06-15",
    title: "Understanding Node.js",
    summary:
      "In this post, we dive deep into the fundamentals of Node.js and how it powers modern web applications.",
    tags: ["Node.js", "JavaScript", "Backend"],
  },
  {
    slug: "devops-best-practices",
    date: "2024-05-30",
    title: "DevOps Best Practices",
    summary:
      "Explore the best practices in DevOps to streamline your development and operations processes.",
    tags: ["DevOps", "CI/CD", "Best Practices"],
  },
  {
    slug: "css-in-js",
    date: "2024-05-15",
    title: "CSS-in-JS: Pros and Cons",
    summary:
      "An in-depth look at CSS-in-JS, its advantages, and drawbacks in modern web development.",
    tags: ["CSS", "JavaScript", "Styling"],
  },
];

const MAX_DISPLAY = 2; // Number of posts to display

const DataBlog = () => {
  return (
    <div className=" mt-10 max-w-4xl mx-auto overflow-hidden">
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-4xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Data News
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        <>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {!posts.length && "No posts found."}
            {posts.slice(0, MAX_DISPLAY).map((post) => {
              const { slug, date, title, summary, tags } = post;
              return (
                <li key={slug} className="py-12">
                  <article>
                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                          <time dateTime={date}>
                            {/* {formatDate(date, siteMetadata.locale)} */}
                            {date}
                          </time>
                        </dd>
                      </dl>
                      <div className="space-y-5 xl:col-span-3">
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-2xl font-bold leading-8 tracking-tight">
                              <Link
                                href={`/blog/${slug}`}
                                className="text-gray-900 dark:text-gray-100"
                              >
                                {title}
                              </Link>
                            </h2>
                            <div className="flex flex-wrap">
                              {tags.map((tag) => (
                                //   <Tag key={tag} text={tag} />
                                <div
                                  key={tag}
                                  className="text-sm text-gray-500 dark:text-gray-400 mr-2"
                                >
                                  {tag}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                            {summary}
                          </div>
                        </div>
                        <div className="text-base font-medium leading-6">
                          <Link
                            href={`/blog/${slug}`}
                            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            aria-label={`Read more: "${title}"`}
                          >
                            Read more &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </>
      </div>
    </div>
  );
};

export default DataBlog;
