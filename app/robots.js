const baseUrl = "https://www.den.digital";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/studio",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
