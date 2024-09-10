import { sanityClient } from "./sanity";

export async function fetchPosts() {
  const query = `*[_type == "post"]{
    title,
    "author": author->{
      name,
      image
    },
    "currentSlug": slug.current,
    "category": categories[]->slug.current,
    "subCategory": subCategories[]->slug.current,
    mainImage,
    publishedAt,
    summary,
    priority,
    _updatedAt,
    "commentsCount": count(*[_type == "comment" && post._ref == ^._id]),
    "latestComment": coalesce(
      *[_type == "comment" && post._ref == ^._id] | order(_createdAt desc)[0],
      { "name": null, "comment": null, "_createdAt": null }
    ){
      name,
      comment,
      _createdAt
    }
  }
`;
  const data = await sanityClient.fetch(
    query,
    {},
    {
      cache: "no-cache",
    }
  );
  return data;
}

export async function fetchPostBySlug(slug) {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    summary,
    "author": author->{
      name,
      image
    },
    "currentSlug":slug.current,
    "category": categories[]->slug.current,
    "subCategory": subCategories[]->slug.current,
    mainImage,
    _createdAt,
    publishedAt,
    _updatedAt,
    body,
    "comments": *[_type == "comment" && post._ref == ^._id] | order(_createdAt desc) {
    name,
    comment,
    _createdAt
    }
  }`;
  const data = await sanityClient.fetch(
    query,
    { slug },
    {
      cache: "no-cache",
    }
  );
  return data;
}

export async function incrementView(req, res) {
  const { slug } = req.query;

  if (req.method === "POST") {
    await client
      .patch(slug)
      .setIfMissing({ views: 0 })
      .inc({ views: 1 })
      .commit();

    res.status(200).json({ message: "View count incremented" });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

export async function fetchComments(id) {
  const query = `*[_type == "comment" && post._ref == $id] | order(_createdAt desc) {
    name,
    comment,
    'publishedAt': _updatedAt
  }`;

  const data = await sanityClient.fetch(
    query,
    { id },
    {
      cache: "no-cache",
    }
  );
  return data;
}

export async function fetchLayout() {
  const query = `*[_type=="layout"]`;
  const data = await sanityClient.fetch(
    query,
    {},
    {
      cache: "no-cache",
    }
  );
  return data[0];
}

export async function fetchAbout() {
  const query = `*[_type == "layout"]`;
  const data = await sanityClient.fetch(
    query,
    {},
    {
      cache: "no-cache",
    }
  );
  return data[0];
}

export async function fetchEmail(email) {
  const query = `*[_type == "userEmail" && email == $email]`;
  const data = await sanityClient.fetch(
    query,
    { email },
    {
      cache: "no-cache",
    }
  );
  return data.length > 0 ? true : false;
}
