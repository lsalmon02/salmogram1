import { connectToDatabase } from "../lib/db";

export async function getAllUsers() {
  const client = await connectToDatabase();
  const db = client.db();

  const users = await db.collection("users").find().toArray();

  return users;
}
