import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"
import CredentialsProvider from "next-auth/providers/credentials"
import { verify } from "jsonwebtoken"

let userAccount: any = null;
export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: String(process.env.GOOGLE_CLIENT_ID),
            clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
            profile: async (profile, token) => {
                const db = (await clientPromise).db()
                const db_user = db.collection('users')
                const user: any = await db_user.findOne({ email: profile.email })
                let data;
                if (!user) {
                    const db_notelist = db.collection('notelist')
                    db_notelist.insertOne({
                        email: profile.email,
                        notes: []
                    })
                    db_user.insertOne({
                        firstname: profile.name,
                        lastname: '',
                        email: profile.email,
                        password: "",
                        saltrounds: 0,
                        avatar: 'default',
                        joined: new Date(),
                        provider: "github"
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
                const db = (await clientPromise).db()
                const db_user = db.collection('users')
                const user: any = await db_user.findOne({ email: profile.email })
                let data;
                if (!user) {
                    const db_notelist = db.collection('notelist')
                    db_notelist.insertOne({
                        email: profile.email,
                        notes: []
                    })
                    db_user.insertOne({
                        firstname: profile.name,
                        lastname: '',
                        email: profile.email,
                        password: "",
                        saltrounds: 0,
                        avatar: 'default',
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
            async authorize(credentials, req) {
                const dev = process.env.NODE_ENV != "production"
                const url = dev ? "http://localhost:3000" : ""
                const res: any = await fetch(`${url}/api/login`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const userres = await res.json()
                if (res.ok && userres) {
                    const userinfo = verify(userres.authToken, process.env.SECRET!)
                    if (typeof userinfo === "object") {
                        userAccount = { token: userres.authToken }
                        return userinfo
                    }
                }
                return null
            }
        })
    ],
    session: {
        strategy: 'jwt'
    },
    // adapter: MongoDBAdapter(clientPromise),
    pages: {
        signIn: "/auth/login"
    },
    callbacks: {
        jwt: async ({ token, account, profile, user }) => {
            // Persist the OAuth access_token to the token right after signin
            if (account && userAccount?.token) account.access_token = userAccount.token
            if (account?.access_token) {
                token.accessToken = account.access_token
            }
            return Promise.resolve(token)
        },
        session: async ({ session, token, user }) => {
            if (token?.accessToken) {
                session.accessToken = token.accessToken;
            }
            return Promise.resolve(session)
        }
    },
    secret: String(process.env.SECRET)
})



// Extra: Token
// if (typeof user !== typeof undefined) {
//     // if(userAccount?.token) token.accessToken = userAccount.token

//     token.user = user;
// }

// Extra: Session
// if (userAccount !== null) {
        //     session.user = userAccount;
        // }
        // else if (typeof token !== typeof undefined) {
        //     session.token = token;
        // }