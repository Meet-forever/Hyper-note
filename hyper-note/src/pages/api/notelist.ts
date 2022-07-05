import clientPromise from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'
import { authenticated } from "../../utils/secure";
import { JwtPayload } from "jsonwebtoken";


export default authenticated(async function handler(req: NextApiRequest, res: NextApiResponse, optional: { decoded: JwtPayload }) {
    const note_list = (await clientPromise).db('testing').collection('notelist')
    const email = optional.decoded.email
    if (!email) {
        res.status(400).json({})
        res.end()
        return
    }
    const note = await note_list.findOne({ email: email })
    if (!note) {
        res.status(400).json({})
        res.end()
        return
    }
    res.status(200).json({ notes: note.notes })
    res.end()
})


// To Turn off useless Warning: 
// API resolved without sending a response for /api/notelist, this may result in stalled requests.
export const config = {
    api: {
        externalResolver: true,
    },
}