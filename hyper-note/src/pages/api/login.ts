import clientPromise from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

type Data = {
    authToken: any
    // name: string,
    // email: string,
    // avatar: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400)
        return
    }
    const userdb = (await clientPromise).db('testing').collection('users')
    const user = await userdb.findOne({ email: email })
    if (!user) {
        res.status(401);
        return;
    }
    const result = await compare(password, user.password)
    if(!result){
        res.status(401)
        return
    }
    const claim = {name: user.firstname, email: user.email, avatar: user.avatar}
    const jws = sign(claim, process.env.SECRET!, {expiresIn: '1h'})
    res.status(200).json({authToken: jws})
}