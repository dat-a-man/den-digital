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
      name: "priority",
      title: "Priority",
      type: "number",
      description: "Set the priority of the post",
      initialValue: 1,
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
      // of: [
      //   {
      //     type: "block",
      //     styles: [
      //       { title: "Normal", value: "normal" },
      //       { title: "H1", value: "h1" },
      //       { title: "H2", value: "h2" },
      //       { title: "H3", value: "h3" },
      //       { title: "H4", value: "h4" },
      //       { title: "H5", value: "h5" },
      //       { title: "H6", value: "h6" },
      //       { title: "Quote", value: "blockquote" },
      //     ],
      //   },
      //   {
      //     type: "image",
      //   },
      //   {
      //     type: "code",
      //   },
      // ],
    },
    {
      name: "comments",
      title: "Comments",
      type: "array",
      of: [{ type: "comment" }],
      description: "Comments on this post",
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
