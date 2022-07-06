import axios from "axios"


export const pagecache = async(file:string) => {
    const result = await axios.post("/api/getpage",{
        ptr: file
    }).then(res => res.data)
    return result
}