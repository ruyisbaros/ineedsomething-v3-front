import React, { useState, useRef, useEffect } from 'react'
import Picker from "emoji-picker-react"
import "./createPostPopup.css"


const CreatePostPopup = ({ user }) => {
    const [text, setText] = useState("")
    const [showPrev, setShowPrev] = useState(false)
    const [showPicker, setShowPicker] = useState(false)
    const [cursorPosition, setCursorPosition] = useState()
    const textRef = useRef(null)

    useEffect(() => {
        textRef.current.selectionEnd = cursorPosition
    }, [cursorPosition])

    const handleEmoji = ({ emoji }) => {
        const ref = textRef.current
        ref.focus()
        const start = text.substring(0, ref.selectionStart)
        const end = text.substring(ref.selectionStart)
        const newText = start + emoji + end
        setText(newText)
        setCursorPosition(start.length + emoji.length)
    }
    return (
        <div className='blur'>
            <div className="postBox">
                <div className="box_header">
                    <div className="small_circle">
                        <i className="exit_icon"></i>
                    </div>
                    <span>Create Post</span>
                </div>
                <div className="box_profile">
                    <img className='box_profile_img' src={user?.picture} alt="" />
                    <div className="box_col">
                        <div className="box_profile_name">{user?.first_name}{" "}{user?.last_name}</div>
                        <div className="box_privacy">
                            <img src="../../../icons/public.png" alt="" />
                            <span>Public</span>
                            <i className="arrowDown_icon"></i>
                        </div>
                    </div>
                </div>
                {/* <textarea
                    className='post_input'
                    placeholder={`What is on your mind ${user?.first_name.slice(0, 1).toUpperCase() + user?.first_name.slice(1)} ?`}
                    maxLength="100"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea> */}
                {!showPrev && <div className="flex_center">
                    <textarea
                        ref={textRef}
                        className='post_input'
                        placeholder={`What is on your mind ${user?.first_name.slice(0, 1).toUpperCase() + user?.first_name.slice(1)} ?`}
                        maxLength="100"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    ></textarea>
                </div>}
                <div className="post_emojis_wrap">
                    {showPicker && <div className="comment_emoji_picker rlmove">
                        <Picker onEmojiClick={handleEmoji} />
                    </div>}
                    <img src="../../../icons/colorful.png" alt="" />
                    <i onClick={() => setShowPicker(!showPicker)} className="emoji_icon_large"></i>
                </div>
            </div>
        </div>
    )
}

export default CreatePostPopup