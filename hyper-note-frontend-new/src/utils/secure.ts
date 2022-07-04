import { verify } from "jsonwebtoken"
import { NextApiRequest, NextApiResponse } from "next"


type NextApiHandlerWithOptional = (req:NextApiRequest, res:NextApiResponse, optional:any) => Promise<any> 

export const authenticated = (fn: NextApiHandlerWithOptional) => (req: NextApiRequest, res: NextApiResponse) =>{
    const auth = req.headers["authorization"]?.split(" ")[1]
    verify(auth!, process.env.SECRET!, async(err, decoded)=>{
        if(!err && decoded){
            fn(req, res, {decoded:decoded})
        }
        else{
            res.status(401).json({error: "You are not authenticated!"})
        }
    })
}