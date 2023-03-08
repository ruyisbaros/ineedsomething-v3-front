import React, { useState, useRef } from 'react'
import EmojiPickerComp from './EmojiPickerComp'
import AddToYourPost from './AddToYourPost'
import ImagePreview from './ImagePreview'
import { useOutsideClick } from './../../../utils/helpers';
import { useDispatch } from 'react-redux';
import { createPostWithBackground, createPostWithImage } from '../../../services/PostServices'
import { addPostRedux } from '../../../redux/postsSlicer';
import { PulseLoader } from 'react-spinners';
import CreatePostError from './CreatePostError';
import { toast } from 'react-toastify';
import { createPostWithText } from './../../../services/PostServices';
import "./createPostPopup.css"
import { updateProfilePosts } from '../../../redux/profileSlicer';


const CreatePostPopup = ({ user, setShowCreatePostPopup, profile }) => {
    //console.log(user)
    const postBoxRef = useRef(null)
    const dispatch = useDispatch();

    const [text, setText] = useState("")
    const [showPrev, setShowPrev] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [images, setImages] = useState([])
    const [background, setBackground] = useState("")
    //console.log(error)
    useOutsideClick(postBoxRef, () => {
        setShowCreatePostPopup(false)
    })

    const handleCreatePost = async () => {
        if (background) {
            const data = await createPostWithBackground(null, user?._id, background, text, null, setLoading, setError)
            if (data) {
                setBackground("")
                setText("")
                if (profile) {
                    dispatch(updateProfilePosts(data))
                } else {
                    dispatch(addPostRedux(data))
                }
                //console.log(data)
                setTimeout(() => {
                    setShowCreatePostPopup(false)
                }, 1000)
            }
        } else if (images.length) {
            //await handleImages()
            //console.log(response)
            const path = `iNeedSomething/${user.email}/postImages`
            const data = await createPostWithImage(path, user?._id, null, text, images, setLoading, setError)
            /* path, user, background, text, images, setLoading, setError */
                if (data) {
                    setBackground("")
                    setText("")
                    if (profile) {
                        dispatch(updateProfilePosts(data))
                    } else {
                        dispatch(addPostRedux(data))
                    }
                    ///console.log(data)
                    setTimeout(() => {
                        setShowCreatePostPopup(false)
                    }, 1000)
                }

        } else if (text) {
            const data = await createPostWithText(null, user, null, text, null, setLoading, setError)
            if (data) {
                setBackground("")
                setText("")
                if (profile) {
                    dispatch(updateProfilePosts(data))
                } else {
                    dispatch(addPostRedux(data))
                }
                //console.log(data)
                setTimeout(() => {
                    setShowCreatePostPopup(false)
                }, 1000)
            }
        } else {

            toast.error("No content selected for creation!")
        }

    }

    return (
        <div className='blur'>
            <div className="postBox" ref={postBoxRef}>
                {error && <CreatePostError error={error} setError={setError} />}
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
                        <ImagePreview setError={setError} setShowPrev={setShowPrev} images={images} setImages={setImages} user={user} text={text} setText={setText} />
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


