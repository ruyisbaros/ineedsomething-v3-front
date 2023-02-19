import React, { useState, useRef } from 'react'
import "./createPostPopup.css"
import EmojiPickerComp from './EmojiPickerComp'
import AddToYourPost from './AddToYourPost'
import ImagePreview from './ImagePreview'


const CreatePostPopup = ({ user }) => {
    const [text, setText] = useState("")
    const [showPrev, setShowPrev] = useState(false)
    const [images, setImages] = useState([])
    const [background, setBackground] = useState("")

    console.log(images)
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
                {!showPrev ?
                    (<>
                        <EmojiPickerComp user={user} text={text} setText={setText} />
                    </>)
                    : (
                        <ImagePreview setShowPrev={setShowPrev} images={images} setImages={setImages} user={user} text={text} setText={setText} />
                    )
                }
                <AddToYourPost setShowPrev={setShowPrev} />
                <button type='submit' className="post_submit">Post</button>
            </div>
        </div>
    )
}

export default CreatePostPopup