import { connectToDatabase } from "../../../lib/db";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const { creator, imagePath, caption, location, date } = data;

    // add more validation later

    if (!creator || !imagePath || !caption || !location || !date) {
      res.status(422).json({ message: "Invalid Input" });
      return;
    }


    const client = await connectToDatabase();
    const db = client.db();

    const result = await db.collection("posts").insertOne({
        creator: creator,
        imagePath: imagePath,
        caption: caption,
        location: location,
        date: date
    });

    res.status(201).json({ message: "Created Post"})
    client.close()
  }
}


export default handler;