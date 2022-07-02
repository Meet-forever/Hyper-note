export type SidebarList = {
    id: string,
    members: string[],
    heading: string,
    icon: string,
    path: string[],
    file: string
}

export const initialSidebarList: SidebarList[] = []


// export const sidebarListReducer = (state:SidebarList[], action:any) =>{
//     const { type, payload } = action
// }

