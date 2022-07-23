import clientPromise from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'
import { authenticated } from "../../utils/secure";
import { JwtPayload } from "jsonwebtoken";


export default authenticated(async function handler(req: NextApiRequest, res: NextApiResponse, optional: { decoded: JwtPayload }) {
    const pages = (await clientPromise).db('testing').collection('pages')
    const { ptr, notes } = req.body
    if (!ptr) {
        return res.status(400).json({})
    }
    const result = await pages.findOneAndUpdate({ptr: `${optional.decoded.email}-${ptr}`}, {
        $set: {notes: notes}
    })
    return result? res.status(201).json({}): res.status(422).json({})
})


// // To Turn off useless Warning: 
// // API resolved without sending a response for /api/notelist, this may result in stalled requests.
// export const config = {
//     api: {
//         externalResolver: true,
//     },
// }