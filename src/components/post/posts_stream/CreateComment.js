import React, { useState, useEffect, useRef } from 'react'
import { useOutsideClick } from './../../../utils/helpers';
import Picker from "emoji-picker-react"


const CreateComment = ({ user }) => {
    const [picker, setPicker] = useState(false)
    const [cursorPosition, setCursorPosition] = useState()
    const [comment, setComment] = useState("")
    const [error, setError] = useState(false)
    const [commentImage, setCommentImage] = useState(null)
    const commentRef = useRef(null)
    const emojiBox = useRef(null)
    const cameraBox = useRef(null)
    useEffect(() => {
        commentRef.current.selectionEnd = cursorPosition
    }, [cursorPosition, commentRef])

    const handleEmoji = ({ emoji }) => {
        const ref = commentRef.current
        ref.focus()
        const start = comment.substring(0, ref.selectionStart)
        const end = comment.substring(ref.selectionStart)
        const newText = start + emoji + end
        setComment(newText)
        setCursorPosition(start.length + emoji.length)
    }

    const handleImage = (e) => {
        let file = e.target.files[0]
        if (file.type !== "image/jpeg" &&
            file.type !== "image/png" &&
            file.type !== "image/gif" &&
            file.type !== "image/webp") {
            setError("Unexpected file format! Only jpeg, gif, png, webp files allowed")
            return;
        } else if (file.size > 1024 * 1024) {
            setError("Too large file! Max 1mb files allowed")
            return;
        }
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            setCommentImage(e.target.result)
        }
    }

    useOutsideClick(emojiBox, () => {
        setPicker(false)
    })
    return (
        <div className='create_comment_wrap'>
            <div className="create_comment">
                <img src={user?.picture} alt="" />
                <div ref={emojiBox} className="comment_input_wrap">
                    {picker &&
                        <div className='comment_emoji_picker'>
                            <Picker onEmojiClick={handleEmoji} />
                        </div>}
                    <input
                        type="file"
                        hidden
                        accept='image/jpeg,image/png,image/gif,image/webp'
                        ref={cameraBox}
                        onChange={handleImage}
                    />
                    {error && <div className="postError comment_error">
                        <div className="postError_error">{error}</div>
                        <div className="blue_btn" onClick={() => setError("")}>Try Again</div>
                    </div>}
                    <input
                        type="text"
                        ref={commentRef}
                        placeholder="Write a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <div className="comment_circle_icon hover2">
                        <i className="emoji_icon" onClick={() => setPicker((prev) => !prev)}></i>
                    </div>
                    <div className="comment_circle_icon hover2" onClick={() => {
                        cameraBox.current.click()
                    }}>
                        <i className="camera_icon"></i>
                    </div>
                    <div className="comment_circle_icon hover2">
                        <i className="gif_icon"></i>
                    </div>
                    <div className="comment_circle_icon hover2">
                        <i className="sticker_icon"></i>
                    </div>
                </div>
            </div>
            {commentImage && <div className='comment_img_preview'>
                <img src={commentImage} alt="" />
                <div className="small_white_circle" onClick={() => setCommentImage(null)}>
                    <i className="exit_icon"></i>
                </div>
            </div>}
        </div>
    )
}

export default CreateComment