import { v4 } from "uuid"
export type SidebarList = {
    id: string,
    heading: string,
    icon: string,
    path: string[],
    cover: string,
    children: SidebarList[],
    lastedited: string
}


export const getinitialSidebarList = (initialSidebarList: SidebarList[]): SidebarList[] => {
    return initialSidebarList
}


export const sideBarListReducerFunction = (state: SidebarList[], action: any) => {
    const { type, payload } = action
    switch (type) {
        case "ADD_PAGE": {
            const { path, position = true } = payload
            if (!path) return state;
            const temp = [...path];
            const appendPage = (arrobj: SidebarList[]): SidebarList[] => {
                const val = (temp.length == 0) ? "" : temp.shift();
                if (val === "") {
                    const id = v4()
                    const defaultlist = { id: id, heading: "Untitled", icon: '', cover: '', path: path, children: [], lastedited: new Date().toLocaleString() }
                    return position ? [defaultlist, ...arrobj] : [...arrobj, defaultlist]
                }
                else {
                    return arrobj.map((data) => (data.id === val) ? { ...data, children: appendPage(data.children) } : data)
                }
            }
            return appendPage(state)
        }
        case "DELETE_LIST": {
            const { id, path } = payload;
            if (!id || !path) return state
            const filterobj = (arrobj: SidebarList[], id: string) => {
                const target = (path.length !== 0) ? path.shift() : "";
                for (let i = 0; i < arrobj.length; i++) {
                    const current = arrobj[i];
                    if (target == "" && current.id == id) {
                        arrobj.splice(i, 1);
                        break;
                    } else if (target === current.id) {
                        filterobj(current.children, id);
                        break;
                    }
                }
            }
            filterobj(state, id);
            return [...state]
        }
        case "UPDATE_CONTENT": {
            const { id, update, path } = payload
            if (!id || !update || !path) return state
            const temp = [...path].reverse()
            const updateContent = (arrobj: SidebarList[]): SidebarList[] => {
                const val = (temp.length === 0) ? "" : temp.pop()
                if (val === "") {
                    return arrobj.map((data) => (data.id === id) ? { ...data, ...update, lastedited: new Date().toLocaleString() } : data)
                } else {
                    return arrobj.map((data) => (data.id === val) ? { ...data, children: updateContent(data.children) } : data)
                }
            }
            return updateContent(state)
        }
        case "MOVE_CONTENT": {
            const { current, target, position } = payload
            if (!current.id || !target.id || !position) return state
            const { id: current_id, path: current_path } = current
            const { id: target_id, path: target_path } = target
            // if(position === "down"){

            // console.log(`Current: ${JSON.stringify(current)} Target: ${JSON.stringify(target)} Position: ${position}`)
            current_path.reverse()
            target_path.reverse()

            const filterobj = (arrobj: SidebarList[], id: string) => {
                const target = (current_path.length !== 0) ? current_path.pop() : "";
                if (target === "") {
                    const current_index = arrobj.findIndex(data => data.id === id)
                    // console.log(arrobj[current_index])
                    // console.log(target_path)
                    const filterobj2 = (arrobj2: SidebarList[], id2: string) => {
                        const target2 = (target_path.length !== 0) ? target_path.pop() : "";
                        if (target2 === "") {
                            const target_index = arrobj2.findIndex(data => data.id === id2)
                            const arePathsEqual = isEqual(arrobj2[target_index].path, arrobj[current_index].path)
                            if (position === "down" && (target_id + 1 === current_index && arePathsEqual)) {
                                console.log("state stays the same")
                            }
                            else if (position === "down" && arePathsEqual) {
                                const popped_element = arrobj.splice(current_index, 1)[0]
                                arrobj.splice((target_index > current_index) ? target_index : target_index + 1, 0, popped_element)
                            }
                            else if (position === "down") {
                                let popped_element = arrobj.splice(current_index, 1)[0]
                                popped_element = { ...popped_element, path: [...arrobj2[target_index].path]}
                                arrobj2.splice(target_index+1, 0, popped_element)
                            }
                            else if (position === "middle") {
                                console.log("middle")
                            }
                            else {
                            }
                    
                        }
                        else if (target2 !== "") {
                            const index = arrobj2.findIndex(data => data.id === target2)
                            if (index === -1) return
                            filterobj2(arrobj2[index].children, id2)
                        }
                    }
                    filterobj2(state, target_id);
                    
                }
                else if (target !== "") {
                    const index = arrobj.findIndex(data => data.id === target)
                    if (index === -1) return
                    filterobj(arrobj[index].children, id)
                }
            }
            filterobj(state, current_id);
            // }

            return [...state]
        }
        default: return state
    }
}

const isEqual = (ar1: string[], ar2: string[]) => {
    return ar1.join() === ar2.join()
}
// version 2
// const filterobj2 = (arrobj2: SidebarList[], id2: string) => {
//     const target2 = (target_path.length !== 0) ? target_path.pop() : ""
//     if (target2 === "") {
//         const target_index = arrobj2.findIndex(data => data.id === id2)
//         console.log(arrobj2[target_index])
//     }
//     else if (target2 !== "") {
//         console.log(target2)
//         const child_index = arrobj.findIndex(data => data.id === target2)
//         if (child_index === -1) return
//         filterobj2(arrobj2[child_index].children, id2)
//     }
// }
// filterobj2(state, target_id)