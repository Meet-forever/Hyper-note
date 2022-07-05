import { useReducer } from "react"

export type Page = {
    ptr: string,
    heading: string,
    icon: string,
    cover: string,
    notes: any[]
}

export const initialPage:Page = {
    ptr: '',
    heading: '',
    icon: '',
    cover: '',
    notes: []
} 


export const pageReducerFunction = (state:Page, action:any):Page => {
    switch(action){
        case "": {
            return state
        }
        default: state
    }
    return state
}

export const pageReducer = useReducer(pageReducerFunction, initialPage)