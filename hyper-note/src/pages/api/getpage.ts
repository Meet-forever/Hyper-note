import clientPromise from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'
import { authenticated } from "../../utils/secure";
import { JwtPayload } from "jsonwebtoken";


export default authenticated(async function handler(req: NextApiRequest, res: NextApiResponse, optional: { decoded: JwtPayload }) {
    const pages = (await clientPromise).db('testing').collection('pages')
    const { ptr } = req.body
    if (!ptr) {
        return res.status(400).json({})
    }
    const page = await pages.findOne({ptr: `${optional.decoded.email}-${ptr}`}, {projection: { _id: 0}})
    if(page){
        return res.status(200).json({page: page.notes})
    }
    const newpage = {
        ptr: `${optional.decoded.email}-${ptr}`,
        notes: []
    }
    await pages.insertOne(newpage)
    return res.status(201).json({note: newpage.notes})
})


// To Turn off useless Warning: 
// API resolved without sending a response for /api/notelist, this may result in stalled requests.
export const config = {
    api: {
        externalResolver: true,
    },
}