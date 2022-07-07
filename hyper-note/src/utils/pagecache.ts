import axios from "axios"
import { getSession } from "next-auth/react"


export const pagecache = async(file:string) => {
    const session = await getSession()
    const result = await axios.post("/api/getpage",{
        ptr: file,
        provider: session?.provider
    }).then(res => res.data)
    return result
}