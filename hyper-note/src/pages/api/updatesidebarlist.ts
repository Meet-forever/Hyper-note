import clientPromise from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'
import { authenticated } from "../../utils/secure";
import { JwtPayload } from "jsonwebtoken";


export default authenticated(async function handler(req: NextApiRequest, res: NextApiResponse, optional: { decoded: JwtPayload }) {
    const notelistdb = (await clientPromise).db('testing').collection('notelist')
    const {notelist} = req.body
    if(!notelist){
        res.status(400).end()
        return
    }
    await notelistdb.updateOne({email: optional.decoded.email}, {
        $set: {notes: notelist}
    })
    res.status(201)
})


// To Turn off useless Warning: 
// API resolved without sending a response for /api/notelist, this may result in stalled requests.
export const config = {
    api: {
        externalResolver: true,
    },
}