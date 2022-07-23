export type Page = {
    lastedited: string,
    data: {
        id: string,
        tag: string,
        content: string,
        image?: string
    }[]
}

export const initialPage: Page = {
    lastedited: '',
    data: []
}

export type PageAction = {
    type: "SET_DOC" | "UPDATE_DOC" | "DELETE_DOC",
    payload?: any
}

export const pageReducerFunction = (state: Page, action: PageAction): Page => {
    const {type, payload} = action
    switch (type) {
        case "SET_DOC": {
            const {notes} = payload
            return {...notes.note}
        }
        case "UPDATE_DOC": {
            return state
        }
        case "DELETE_DOC": {
            return state
        }
        default: state
    }
    return state
}