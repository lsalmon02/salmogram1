import { connectToDatabase } from "../lib/db";

export async function getAllPosts(sort) {
  const client = await connectToDatabase();
  const db = client.db();

  const posts = await db
    .collection("posts")
    .find()
    .sort(sort)
    .toArray();

  return posts;
}

export async function getUsersPosts(name) {
  const client = await connectToDatabase();
  const db = client.db();

  const usersPosts = await db
    .collection("posts")
    .find({ creator: name })
    .toArray();

    return usersPosts;
}
