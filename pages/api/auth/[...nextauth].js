import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

export default NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
        // id: "username-login",
        name: "credentials",
      authorize: async (credentials) => {
        const nextAuthUrl = new URL(process.env.NEXTAUTH_URL)
        const client = await connectToDatabase();
        const { username, password } = credentials;

        if (!username || !password) {
            client.close()
          throw new Error("Invalid credentials");
        }

        const userCollection = client.db().collection("users");

        const user = await userCollection.findOne({
          username: username,
        });

        if (!user) {
          client.close();
          throw new Error("No User Found");
          
          
        }

        const isValid = await verifyPassword(password, user.password);

        if (!isValid) {
          client.close();
          throw new Error("Could not Log you in, as password is incorrect!");
        }

        client.close();
        return {
          username: user.username,
          email: user.email,
          name: user.name,
          username: user.username,
          id: user._id
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET
});
