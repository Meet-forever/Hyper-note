export type SidebarList = {
    heading: string,
    icon: string,
    path: string[],
    file: string
    children: SidebarList[],
}


export const getinitialSidebarList = (initialSidebarList: SidebarList[]): SidebarList[] =>{
    return initialSidebarList
} 


export const sideBarListReducerFunction = (state: SidebarList[], action:any) =>{
    switch (action.type){
        case '': return state
        default: return state
    }
}