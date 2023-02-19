import React, { useState, useRef } from 'react'
import EmojiPickerComp from './EmojiPickerComp'
import AddToYourPost from './AddToYourPost'
import ImagePreview from './ImagePreview'
import { useOutsideClick } from './../../../utils/helpers';
import { useDispatch } from 'react-redux';
import { createPostWithBackground } from '../../../services/PostServices'
import { addPostRedux } from '../../../redux/postsSlicer';
import { PulseLoader } from 'react-spinners';
import "./createPostPopup.css"


const CreatePostPopup = ({ user, setShowCreatePostPopup, token }) => {
    const postBoxRef = useRef(null)
    const dispatch = useDispatch();

    const [text, setText] = useState("")
    const [showPrev, setShowPrev] = useState(false)
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState([])
    const [background, setBackground] = useState("")


    useOutsideClick(postBoxRef, () => {
        setShowCreatePostPopup(false)
    })
    const handleCreatePost = async () => {
        if (background) {
            const data = await createPostWithBackground(null, user?._id, token, background, text, null, setLoading)
            setBackground("")
            setText("")
            dispatch(addPostRedux(data))
            console.log(data)
            setTimeout(() => {
                setShowCreatePostPopup(false)
            }, 1000)
        }
    }


    return (
        <div className='blur'>
            <div className="postBox" ref={postBoxRef}>
                <div className="box_header">
                    <div className="small_circle" onClick={() => setShowCreatePostPopup(false)}>
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
                        <EmojiPickerComp
                            user={user}
                            text={text}
                            setText={setText}
                            background={background}
                            setBackground={setBackground}
                        />
                    </>)
                    : (
                        <ImagePreview setShowPrev={setShowPrev} images={images} setImages={setImages} user={user} text={text} setText={setText} />
                    )
                }
                <AddToYourPost setShowPrev={setShowPrev} />
                <button
                    type='submit'
                    className="post_submit"
                    onClick={handleCreatePost}
                    disabled={loading}
                >{loading ? <PulseLoader color='#fff' size={5} /> : "Post"}</button>
            </div>
        </div>
    )
}

export default CreatePostPopup