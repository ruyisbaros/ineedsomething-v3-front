import React, { useEffect, useState, useRef } from 'react'
import Picker from "emoji-picker-react"
import { useOutsideClick } from '../../../utils/helpers';

const EmojiPickerComp = ({ text, setText, user, type2, background, setBackground }) => {
    const [showPicker, setShowPicker] = useState(false)
    const [showBgrnd, setShowBgrnd] = useState(false)
    const [cursorPosition, setCursorPosition] = useState()
    const textRef = useRef(null)
    const emojiBox = useRef(null)
    const bgRef = useRef(null)
    //console.log(type2)
    const postBackgrounds = [
        "../../../images/postBackgrounds/1.jpg",
        "../../../images/postBackgrounds/2.jpg",
        "../../../images/postBackgrounds/3.jpg",
        "../../../images/postBackgrounds/4.jpg",
        "../../../images/postBackgrounds/5.jpg",
        "../../../images/postBackgrounds/6.jpg",
        "../../../images/postBackgrounds/7.jpg",
        "../../../images/postBackgrounds/8.jpg",
        "../../../images/postBackgrounds/9.jpg",
    ];

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

    const backgroundHandler = (i) => {
        bgRef.current.style.backgroundImage = `url(${postBackgrounds[i]})`
        setBackground(postBackgrounds[i])
        bgRef.current.classList.add("bgHandler")
    }
    const removeBackground = () => {
        bgRef.current.style.backgroundImage = ``
        setBackground("")
        bgRef.current.classList.remove("bgHandler")
    }
    return (
        <div className={type2 ? "images_input" : ""}>
            <div ref={bgRef} className={!type2 ? "flex_center" : ""}>
                <textarea
                    ref={textRef}
                    className={`post_input ${type2 ? "input2" : ""}`}
                    placeholder={`What is on your mind ${user?.first_name.slice(0, 1).toUpperCase() + user?.first_name.slice(1)} ?`}
                    style={{ paddingTop: `${background ? Math.abs(textRef.current.value.length * 0.1 - 30) : "0"}%` }}
                    maxLength="250"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>
            </div>
            <div ref={emojiBox} className={!type2 ? "post_emojis_wrap" : ""}>
                {showPicker && <div className={`comment_emoji_picker ${type2 ? "movePicker" : "rlmove"}`}>
                    <Picker onEmojiClick={handleEmoji} />
                </div>}
                {!type2 && <img onClick={() => setShowBgrnd(!showBgrnd)} className='colorful' src="../../../icons/colorful.png" alt="" />}
                {!type2 && showBgrnd && <div className="post_backGrounds">
                    <div className="no_bg" onClick={removeBackground}></div>
                            {postBackgrounds.map((bg, i) => (
                                <img key={i} src={bg} alt="" onClick={() => backgroundHandler(i)} />
                            ))}
                </div>}


                <i onClick={() => setShowPicker(!showPicker)} className={`emoji_icon_large ${type2 ? "moveLeft" : ""} `}></i>
            </div>
        </div>
    )
}

export default EmojiPickerComp