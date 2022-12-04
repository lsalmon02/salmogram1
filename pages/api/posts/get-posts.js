import { getAllPosts } from "../../../helpers/posts-util";
import { connectToDatabase } from "../../../lib/db";


const handler = async (req, res) => {

    let client;

    try {
        client = await connectToDatabase();
    } catch (error) {
        res.status(500).json({message :"connecting to db failed"})
        return;
    }

    if (req.method === "GET") {
        try {
            const posts = await getAllPosts({ _id: -1});  
            res.status(200).json({ posts: posts });
            client.close()

        } catch (error) {
            res.status(500).json({ message: 'Getting posts failed'})
            client.close();
        }
    }
    client.close()
}

export default handler;