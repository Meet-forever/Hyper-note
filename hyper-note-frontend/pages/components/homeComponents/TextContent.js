import React, {useState} from 'react'
// import Image from 'next/image'
// import dynamic from 'next/dynamic';
// const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

export default function TextContent({selected, setSelected}) {
    // const [chosenEmoji, setChosenEmoji] = useState(null);

    // const onEmojiClick = (event, emojiObject) => {
    //     setSelected(
    //         {...selected, 
    //             icon : emojiObject.emoji
    //         }
    //     )
    //     setChosenEmoji(emojiObject);
    // };
    return (
        <div className=" mx-auto w-2/3">
            <div  className="font-black text-5xl">{selected.heading}</div>
            <br/>
            <p> Type here...</p>
          <div>
      {/* <Picker onEmojiClick={onEmojiClick}  /> */}
    </div>
    <br/>
    <br/>
    <br/>
    <br/>
        </div>
    )
}
