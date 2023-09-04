import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async session({ session }) {
			const sessionUser = await User.findOne({ email: session.user.email });
			console.log("SESSION USER: ", session)
			session.user.id = sessionUser._id.toString();
			return session;
		},
		async signIn({ profile }) {
			try {
				await connectToDB(); // connect to MongoDB
				// check if user already exists
				const userExists = await User.findOne({ email: profile.email });
				// if user does not exist, create the user into MongoDB
				if (!userExists) {
					console.log("PICTURE: ", profile.picture)
					await User.create({
						email: profile.email,
						username: profile.name.replace(" ", "").toLowerCase(),
						image: profile.picture,
					});
				}
				return true;
			} catch (error) {
				console.log("SIGNING ERROR: ", error);
				return false;
			}
		},
	},
});

export { handler as GET, handler as POST };
