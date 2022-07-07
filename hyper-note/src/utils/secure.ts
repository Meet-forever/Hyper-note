import { verify } from "jsonwebtoken"
import { NextApiRequest, NextApiResponse } from "next"


type NextApiHandlerWithOptional = (req: NextApiRequest, res: NextApiResponse, optional: any) => Promise<any>

export const authenticated = (fn: NextApiHandlerWithOptional) => async (req: NextApiRequest, res: NextApiResponse) => {
    const { provider } = req.body
    const auth = String(req.headers.authorization?.split(" ")[1])
    switch (provider) {
        case "google": {
            const decoded = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${auth}`, {
                method: "GET"
            }).then(res => res.json())
            if ("error" in decoded) {
                return res.status(401).json({ error: "You are not authenticated!" })
            }
            else {
                return fn(req, res, { decoded: decoded })
            }
        }
        case "hypernote": {
            return verify(auth!, process.env.SECRET!, (err, decoded)=>{
                if(!err && decoded){
                    return fn(req, res, {decoded:decoded})
                }
                else{
                    return res.status(401).json({error: "You are not authenticated!"})
                }
            })
        }
        default: return res.status(401).json({})
    }
}