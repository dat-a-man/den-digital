// schemas/code.js
export default {
  name: "code",
  title: "Code",
  type: "object",
  fields: [
    {
      name: "language",
      title: "Language",
      type: "string",
      options: {
        list: [
          { title: "JavaScript", value: "javascript" },
          { title: "Python", value: "python" },
          { title: "HTML", value: "html" },
          // Add more languages as needed
        ],
      },
    },
    {
      name: "code",
      title: "Code",
      type: "text",
      rows: 5,
    },
  ],
};
