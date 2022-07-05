import clientPromise from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'
import { authenticated } from "../../utils/secure";
import { JwtPayload } from "jsonwebtoken";


export default authenticated(async function handler(req: NextApiRequest, res: NextApiResponse, optional: { decoded: JwtPayload }) {
    const pages = (await clientPromise).db('testing').collection('pages')
    const { ptr } = req.body
    if (!ptr) {
        res.end()
        return
    }
    let page = null;
    page = await pages.findOne({ptr:ptr})
    if(page){
        res.json({})
        res.end();
        return
    }
    await pages.insertOne({
        ptr: ptr,
        heading: 'Untitled',
        icon: '📄',
        cover: '/images/themes/test2.jpg',
        notes: []
    })
    page = await pages.findOne({ptr: ptr})
    res.json({page_id: page?._id})
    res.end()
})


// To Turn off useless Warning: 
// API resolved without sending a response for /api/notelist, this may result in stalled requests.
export const config = {
    api: {
        externalResolver: true,
    },
}