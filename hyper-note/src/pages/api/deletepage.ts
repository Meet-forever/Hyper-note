import clientPromise from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'
import { authenticated } from "../../utils/secure";
import { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongodb";


export default authenticated(async function handler(req: NextApiRequest, res: NextApiResponse, optional: { decoded: JwtPayload }) {
    const pages = (await clientPromise).db('testing').collection('pages')
    const {page_id} = req.body
    if(!page_id){
        return res.status(400).json({})
    }
    await pages.deleteOne({"_id": new ObjectId(page_id)})
    return res.status(201).json({})
})


// To Turn off useless Warning: 
// API resolved without sending a response for /api/deletepage, this may result in stalled requests.
export const config = {
    api: {
        externalResolver: true,
    },
}