import { fetchPosts } from "@/lib";

const baseUrl = "https://www.den.digital";

export default async function sitemap(params) {
  const posts = await fetchPosts();
  const postEntries = posts.map((post) => ({
    url: `${baseUrl}/post/${post.currentSlug}`,
    lastModified: new Date(post._updatedAt),
    // changeFrequeny:""
    // priority:""
  }));
  return [
    {
      url: `${baseUrl}/blog`,
    //   lastModified: new Date(),
    },
    {
      url: `${baseUrl}/data-news`,
    //   lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
    //   lastModified: new Date(),
    },
    ...postEntries,
  ];
}
