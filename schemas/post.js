import blockContent from "./blockContent";
export default {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "summary",
      title: "Summary",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    },
    {
      name: "subCategories",
      title: "SubCategories",
      type: "array",
      of: [{ type: "reference", to: { type: "subCategory" } }],
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
    },
    {
      name: "comments",
      title: "Comments",
      type: "array",
      of: [{ type: "comment" }],
      description: "Comments on this post",
    },
    {
      name: "likes",
      title: "Likes",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "ipAddress",
              title: "IP Address",
              type: "string",
              description: "IP address of the system that liked the post",
            },
            {
              name: "likedAt",
              title: "Liked At",
              type: "datetime",
              description: "Date and time when the like was made",
              initialValue: () => new Date().toISOString(),
            },
          ],
        },
      ],
      description:
        "List of likes with the IP addresses of users who liked this post",
    },
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      });
    },
  },
};
