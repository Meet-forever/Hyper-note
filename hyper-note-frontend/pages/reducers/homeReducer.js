import {v4} from "uuid"
export const homeReducer = (state, action) =>{
    switch(action.type){
        case "ADD_PAGE" :
            return {
                ...state,
                notes : [...state.notes, {
                    id: v4(),
                    heading: "Untitled",
                    icon: '',
                    cover: ""
                }]
            }
        case "UPDATE_ICON":
            let i = state.notes.findIndex(index => action.payload === index.id)
            if (i === -1) return state
            action.setSelected(i => {
                return {
                    ...i,
                    icon: action.emoji 
                }
            })
            return {
                ...state,
                notes : [...state.notes.slice(0,i), {
                    ...state.notes[i],
                    icon: action.emoji
                }, ...state.notes.slice(i+1,state.notes.length)]
            }
    }
}