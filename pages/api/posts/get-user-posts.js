import { getSession, useSession } from "next-auth/react";
import { getUsersPosts } from "../../../helpers/posts-util";
import { connectToDatabase } from "../../../lib/db";

const handler = async (req, res) => {
  const session = await getSession({ req });
  let client;
  try {
    client = connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: "connecting to db failed" });
    return;
  }

  if (req.method === "GET") {
    try {
      const posts = await getUsersPosts(session.user.name);
      res.status(200).json({ posts: posts });
      (await client).close()
    } catch (error) {
      res.status(500).json({ message: "Getting posts failed" });
    }
  }
  (await client).close();
};

export default handler;
