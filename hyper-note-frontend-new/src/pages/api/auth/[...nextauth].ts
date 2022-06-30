import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: String(process.env.GOOGLE_CLIENT_ID),
            clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
            profile: async (profile, token) => {
                const db = (await clientPromise).db().collection('users')
                const user: any = await db.findOne({ email: profile.email })
                let data;
                if (!user) {
                    db.insertOne({
                        firstname: profile.name,
                        lastname: '',
                        email: profile.email,
                        password: "",
                        saltrounds: 0,
                        avatar: 'default',
                        userlist: [],
                        joined: new Date(),
                        provider: "google"
                    })
                    data = { avatar: 'default' }
                }
                else {
                    data = { avatar: user.avatar }
                }
                return { id: profile.sub, email: profile.email, name: profile.name, avatar: data.avatar }
            }
        }),
        GithubProvider({
            clientId: String(process.env.GITHUB_ID),
            clientSecret: String(process.env.GITHUB_SECRET),
            profile: async (profile, token) => {
                const db = (await clientPromise).db().collection('users')
                const user: any = await db.findOne({ email: profile.email })
                let data;
                if (!user) {
                    db.insertOne({
                        firstname: profile.name,
                        lastname: '',
                        email: profile.email,
                        password: "",
                        saltrounds: 0,
                        avatar: 'default',
                        userlist: [],
                        joined: new Date(),
                        provider: "github"
                    })
                    data = { avatar: 'default' }
                }
                else {
                    data = { avatar: user.avatar }
                }
                return { id: profile.id.toString(), email: profile.email, name: profile.name.split(" ")[0] || profile.login, avatar: data.avatar }
            }
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {},
            async authorize(credentials) {
                const dev = process.env.NODE_ENV != "production"
                const url = dev ? "http://localhost:3000" : ""
                const res = await fetch(`${url}/api/login`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()
                if (res.ok && user) {
                    return user
                }
                return null
            }
        })
    ],
    // adapter: MongoDBAdapter(clientPromise),
    pages: {
        signIn: "/auth/login"
    },
    callbacks: {
        jwt: async ({ token, account, profile, user }) => {
            // Persist the OAuth access_token to the token right after signin
            if (account?.access_token) {
                token.accessToken = account.access_token
            }
            return token
        },
        session: async ({ session, token, user }) => {
            if (token?.access_token) {
                session.accessToken = token.accessToken;
            }
            return session
        }
    },
    secret: String(process.env.SECRET)
})