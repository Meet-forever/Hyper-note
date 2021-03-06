import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"
import CredentialsProvider from "next-auth/providers/credentials"
import { verify } from "jsonwebtoken"

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: String(process.env.GOOGLE_CLIENT_ID),
            clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
            profile: async (profile, token) => {
                const db = (await clientPromise).db('testing')
                const db_user = db.collection('users')
                const user: any = await db_user.findOne({ email: profile.email })
                let data;
                if (!user) {
                    const db_notelist = db.collection('notelist')
                   await db_notelist.insertOne({
                        email: profile.email,
                        notes: []
                    })
                    await db_user.insertOne({
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
                const db = (await clientPromise).db('testing')
                const db_user = db.collection('users')
                const user: any = await db_user.findOne({ email: profile.email })
                let data;
                if (!user) {
                    const db_notelist = db.collection('notelist')
                    await db_notelist.insertOne({
                        email: profile.email,
                        notes: []
                    })
                    await db_user.insertOne({
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
                const url = dev ? "http://localhost:3000" : process.env.NEXTAUTH_URL
                const res: any = await fetch(`${url}/api/login`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const userres = await res.json()
                if (res.ok && userres) {
                    const userinfo = verify(userres.authToken, process.env.SECRET!)
                    if (typeof userinfo === "object") {
                        return {
                            ...userinfo,
                            access_token: userres.authToken,
                            provider: 'hypernote'
                        }
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
            if (account?.access_token) {
                // https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=
                console.log(account)
                token.accessToken = account.access_token
                token.provider = account.provider
            }
            if(user?.access_token){
                token.accessToken = user.access_token
                token.provider = user.provider
            }
            return token
        },
        session: async ({ session, token, user }) => {
            session.accessToken = token.accessToken;
            session.provider = token.provider    
            return session
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