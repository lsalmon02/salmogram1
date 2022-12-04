import { getSession } from "next-auth/react";

async function handler(req, res) {

    const session = await getSession({ req: req});
    if (!session) {
        res.status(401).json({ message: 'Not Authenticated'});
        return;
    }

    const username = session.user.username;

    return { username }
}

export default handler;