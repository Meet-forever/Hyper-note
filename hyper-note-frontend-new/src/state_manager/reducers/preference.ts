import { useReducer } from "react"

export type Preference = {
    theme: string,
    selected: any
    sidebar: boolean
}

export const initialPreference: Preference = {
    theme: "light",
    selected: {},
    sidebar: true,
}

export type PreferenceAction = {
    type: "CHANGE_THEME" | "SELECT_CURRENT_PAGE" | "CHANGE_SIDEBAR",
    payload?: undefined | {color: string, select: any}
}

export const preferenceReducerFunction = (state:Preference, action: PreferenceAction): Preference => {
    const {type, payload} = action
    switch(type){
        case "CHANGE_SIDEBAR" :{
            return {
                ...state,  
                sidebar: !state.sidebar
            }
        }
        case "CHANGE_THEME" : {
            return{
                ...state,
                theme: payload?.color ?? state.theme  
            }
        }
        case "SELECT_CURRENT_PAGE" : {
            return {
                ...state,
                selected: payload?.select ?? state.selected
            }
        }
        default: return state
    }
}