import React, { useEffect, useState, useRef } from 'react'
import Picker from "emoji-picker-react"
import { useOutsideClick } from '../../../utils/helpers';

const EmojiPickerComp = ({ text, setText, user, type2 }) => {
    const [showPicker, setShowPicker] = useState(false)
    const [cursorPosition, setCursorPosition] = useState()
    const textRef = useRef(null)
    const emojiBox = useRef(null)
    //console.log(type2)

    useEffect(() => {
        textRef.current.selectionEnd = cursorPosition
    }, [cursorPosition, textRef])

    const handleEmoji = ({ emoji }) => {
        const ref = textRef.current
        ref.focus()
        const start = text.substring(0, ref.selectionStart)
        const end = text.substring(ref.selectionStart)
        const newText = start + emoji + end
        setText(newText)
        setCursorPosition(start.length + emoji.length)
    }

    useOutsideClick(emojiBox, setShowPicker)
    return (
        <div className={type2 ? "images_input" : ""}>
            <div className={!type2 ? "flex_center" : ""}>
                <textarea
                    ref={textRef}
                    className={`post_input ${type2 ? "input2" : ""}`}
                    placeholder={`What is on your mind ${user?.first_name.slice(0, 1).toUpperCase() + user?.first_name.slice(1)} ?`}
                    maxLength="100"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>
            </div>
            <div ref={emojiBox} className={!type2 ? "post_emojis_wrap" : ""}>
                {showPicker && <div className={`comment_emoji_picker ${type2 ? "movePicker" : "rlmove"}`}>
                    <Picker onEmojiClick={handleEmoji} />
                </div>}
                {!type2 && <img src="../../../icons/colorful.png" alt="" />}
                <i onClick={() => setShowPicker(!showPicker)} className={`emoji_icon_large ${type2 ? "moveLeft" : ""} `}></i>
            </div>
        </div>
    )
}

export default EmojiPickerComp