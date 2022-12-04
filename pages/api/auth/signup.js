import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const { email, username, name, password } = data;

    if (!email || !username || !name || !password) {
      res.status(422).json({
        message: "Invalid Input",
      });
      return;
    }

    const client = await connectToDatabase();

    const db = client.db();

    const existingName = await db.collection("users").findOne({ name: name });

    const existingEmail = await db
      .collection("users")
      .findOne({ email: email });

    const existingPassword = await db
      .collection("users")
      .findOne({ username: username });

    if (existingEmail || existingPassword || existingName) {
      res.status(422).json({
        message: "User alreading existing with this Email or Username!",
      });
      client.close();
      return;
    }

    const hashedPassword = await hashPassword(password);

    const result = await db.collection("users").insertOne({
      email: email,
      username: username,
      name: name,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User Created!" });
    client.close();
  }
}

export default handler;
