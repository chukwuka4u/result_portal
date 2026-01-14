import type {Account, User} from "next-auth"
import { authHandler, getUser } from "../app/api/users/auth-handler"
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
        if (account!.provider === "google") {
          if (!(user.email)) return false
          const usr = await getUser(user.email!)
          if (usr)
            return true
          else
            return false
        }
        return true
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async jwt({ token, user } : {token : any, user : User}) {
    if (user) {
      const usr = await getUser(user.email!)
      token.role = usr.role; // stored in DB
      token.name = usr.firstName + " " + usr.lastName;
    }
    return token;
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async session({ session, token } : { session : any , token : any}) {
    if (session.user) {
      session.user.role = token.role; // expose to client
      if (!session.user.name)
        session.user.name = token.name
    }
    return session;
  },
}
}