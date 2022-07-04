import clientPromise from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'
import { hash } from 'bcrypt'

type Data = {
    status: number
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { method } = req
    switch (method) {
        case "POST": {
            const { email, password, firstname, lastname } = req.body;
            if (!email || !password || !firstname || !lastname) {
                res.status(400).json({ status: 400 })
            }
            const db = (await clientPromise).db('testing')
            const db_users = db.collection('users')
            const user = await db_users.findOne({ email: email })
            if (user) {
                console.log("User already exists!")
                res.status(400).json({ status: 400 })
            } else {
                const hpass = await hash(password, 12);
                const db_notelist = db.collection('notelist')
                db_notelist.insertOne({
                    email: email,
                    notes: []
                })
                db_users.insertOne({
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    password: hpass,
                    saltrounds: process.env.SALTROUNDS,
                    avatar: 'default',
                    joined: new Date(),
                    provider: ""
                })
                res.status(201).json({ status: 201 })
            }
        }
            break;
        default:
            res.status(405).json({ status: 405 })
    }
}