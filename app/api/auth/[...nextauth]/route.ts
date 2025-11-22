import NextAuth from "next-auth"
import type {Account, User} from "next-auth"
import { authHandler } from "../../users/route"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
    providers: [
        //call the callback route, check if user already exists in db,
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
    name: 'Email',
    credentials: {
      email: { label: "Email", type: "text", placeholder: "johndoe@example.com" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      // e.g., validate email and password against a database
      const user = await authHandler({email: credentials!.email, password: credentials!.password})
      // Return null if user data could not be retrieved
      if (user)
        return user
      return null
    }
  })
    ],
    secret: process.env.NEXTAUTH_SECRET as string,
    callbacks: {
      async signIn({ user, account } : {user: User, account: Account | null}) {
        console.log(account!.provider, user)
      return true
    }
    }
}
const handler =  NextAuth(authOptions)
export {handler as GET, handler as POST} 