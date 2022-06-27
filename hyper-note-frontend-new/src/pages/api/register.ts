import clientPromise from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'
import {hash} from 'bcrypt'

type Data = {
    name: string,
    email: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    // TODO: 
    // const {email, password, firstname, lastname } = req.body;
    // if (!email || !password){
    //     res.status(404)
    //     return
    // }
    // const userdb =  (await clientPromise).db('testing').collection('users')
    // const user = await userdb.findOne({email: email})
    // if(!user){
    //     res.status(404);
    //     return;
    // }
    // console.log(user.email)

    res.status(200).json({ name: 'John Doe', email: "john@doe.com" })
}