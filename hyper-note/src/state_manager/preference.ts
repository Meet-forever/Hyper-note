import { Page } from "./page"

export type Preference = {
    theme: string,
    selected: any
    sidebar: boolean
    token: string
}

export const initialPreference: Preference = {
    theme: "light",
    selected: {},
    sidebar: true,
    token: '' 
}

export type PreferenceAction = {
    type: "CHANGE_THEME" | "SET_CURRENT_PAGE" | "CHANGE_SIDEBAR" | "UPDATE_SIDEBAR",
    payload?: undefined | {color?: string, select?: Page, update?: any}
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
        case "SET_CURRENT_PAGE" : {
            return {
                ...state,
                selected: payload?.select ?? state.selected
            }
        }
        case "UPDATE_SIDEBAR" : {
            return {
                ...state,
                selected: {
                    ...state.selected,
                    ...(payload?.update)
                }
            }
        }
        default: return state
    }
}