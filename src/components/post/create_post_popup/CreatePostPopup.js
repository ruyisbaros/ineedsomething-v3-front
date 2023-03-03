import React, { useState, useRef } from 'react'
import EmojiPickerComp from './EmojiPickerComp'
import AddToYourPost from './AddToYourPost'
import ImagePreview from './ImagePreview'
import { dataURItoBlob, readImageAsBase64, useOutsideClick } from './../../../utils/helpers';
import { useDispatch } from 'react-redux';
import { createPostWithBackground, createPostWithImage } from '../../../services/PostServices'
import { addPostRedux } from '../../../redux/postsSlicer';
import { PulseLoader } from 'react-spinners';
import CreatePostError from './CreatePostError';
import "./createPostPopup.css"
import { toast } from 'react-toastify';
import { createPostWithText } from './../../../services/PostServices';
import axios, { APP_ENVIRONMENT } from './../../../axios';


const CreatePostPopup = ({ user, setShowCreatePostPopup }) => {
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
    /* Handle images */
    //let imgUrls = []
    /* const uploadImages = async (formData, setLoading) => {
        try {
            setLoading(true)
            const { data } = await axios.post("/images/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            setLoading(false)
            console.log(data)
            imgUrls.push(data)
        } catch (error) {
            setLoading(false)
            //toast.error(error.response.data.message)
        }
    } */

    /* const handleImages = async () => {
        //1. Convert base64 to string
        const postImages = images.map((img, i) => {
            return dataURItoBlob(img)
        })

        const path = `iNeedSomething/${user.email}/postImages`
        //2. upload images to cloudinary
        for (const img of postImages) {
            let formData = new FormData()
            formData.append("path", path)
            formData.append("file", img)
            await uploadImages(formData, setLoading)
        }
    } */
    /* Handle images */

    const handleCreatePost = async () => {
        if (background) {
            const data = await createPostWithBackground(null, user?._id, background, text, null, setLoading, setError)
            if (data) {
                setBackground("")
                setText("")
                dispatch(addPostRedux(data))
                console.log(data)
                setTimeout(() => {
                    setShowCreatePostPopup(false)
                }, 1000)
            }
        } else if (images.length) {
            //await handleImages()
            //console.log(response)
            const path = `iNeedSomething/${user.email}/postImages`
            const data = await createPostWithImage(path, user?._id, null, text, images, setLoading, setError)
                /* type, user, background, text, images, setLoading, setError */
                if (data) {
                    setBackground("")
                    setText("")
                    dispatch(addPostRedux(data))
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
                dispatch(addPostRedux(data))
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


