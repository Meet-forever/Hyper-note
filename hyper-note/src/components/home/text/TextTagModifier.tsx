import React, { useEffect, useRef } from 'react'

const TextTagModifier = ({ clientPosition, query }: {
    clientPosition: {
        clientX: number;
        clientY: number;
    }, query: string
}) => {
    
    const tagList = ["Heading1", "Heading2", "Paragraph"]
    const filterTagList = (user_query:string): string[] =>{
        if(user_query.length === 0) return tagList
        else return tagList.filter(tag => tag.toUpperCase().includes(user_query.toUpperCase()))
    }
    const currentChildPosition = useRef(-1)
    const tagOptionElement = useRef<HTMLDivElement>(null)
    const TagListToElementMapper = (tag_lists:string[]) =>{
        return tag_lists.map((tag, index) =>
        <button onClick={()=>{}} className={`hover:bg-gray-100 w-full text-left p-1`} key={`${tag}${index}`}>
            {tag}
        </button>
        )
    }
    useEffect(()=>{
        const child = tagOptionElement.current?.children[0] as HTMLElement
        if(child){
            // child.focus()
            // currentChildPosition.current = 0
        }
    },[tagOptionElement])
    
    const keyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) =>{
        switch(e.key){
            case "ArrowDown": {
                const childrenElements = tagOptionElement.current?.children
                if(childrenElements){
                    if(currentChildPosition.current < childrenElements.length-1){
                        currentChildPosition.current += 1;
                        (childrenElements[currentChildPosition.current] as HTMLElement).focus()
                    }else{
                        currentChildPosition.current = currentChildPosition.current % (childrenElements.length-1);
                        (childrenElements[currentChildPosition.current] as HTMLElement).focus()
                    }
                }
                break;
            }
            case "ArrowUp": {
                const childrenElements = tagOptionElement.current?.children
                if(childrenElements){
                    if(currentChildPosition.current > 0){
                        currentChildPosition.current -= 1; 
                        (childrenElements[currentChildPosition.current] as HTMLElement).focus()
                    }else if(childrenElements.length >= 1){
                        currentChildPosition.current = childrenElements.length-1;
                        // currentChildPosition.current = currentChildPosition.current % (childrenElements.length-1);
                        (childrenElements[currentChildPosition.current] as HTMLElement).focus()
                    }
                }
                break;  
            }
        }
    }
    // tagOptionElement.current?.focus()
    return (
        <div ref={tagOptionElement} onKeyDown={keyDownHandler} className='fixed text-base w-40 max:h-48 bg-white py-2 px-1 z-20 flex flex-col rounded-md shadow-[8px_2px_50px_-30px_rgba(0,0,0,0.6)]' style={{ top: clientPosition.clientY, left: clientPosition.clientX }}>
            {TagListToElementMapper(filterTagList(query))}
        </div>
    )
}

export default TextTagModifier