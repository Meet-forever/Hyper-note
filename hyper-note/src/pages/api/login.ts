import clientPromise from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

type Data = {
    authToken?: any
    // name: string,
    // email: string,
    // avatar: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({})
    }
    const userdb = (await clientPromise).db('testing').collection('users')
    const user = await userdb.findOne({ email: email })
    if (!user) {
        return res.status(401).json({});
    }
    const result = await compare(password, user.password)
    if(!result){
        return res.status(401).json({})
    }
    const claim = {name: user.firstname, email: user.email, avatar: user.avatar}
    const jws = sign(claim, process.env.SECRET!, {expiresIn: '1h'})
    return res.status(200).json({authToken: jws})
}