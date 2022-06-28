import clientPromise from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'
import {hash} from 'bcrypt'

type Data = {
    name: string,
    email: string,
    avatar: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const {email, password} = req.body;
    if (!email || !password){
        res.status(400)
        return
    }
    const userdb =  (await clientPromise).db('testing').collection('users')
    const user = await userdb.findOne({email: email})
    if(!user){
        res.status(400);
        return;
    }
    res.status(200).json({ name: user.name, email: user.email, avatar: user.avatar })
}