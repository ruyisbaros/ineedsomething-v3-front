import React, { useState, useRef, useCallback, useEffect } from 'react'
import { getCroppedImg, useOutsideClick } from '../../utils/helpers';
import Cropper from 'react-easy-crop'
import { PulseLoader } from 'react-spinners';
import axios, { APP_ENVIRONMENT } from './../../axios';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { updateCurrentUserCoverPic } from '../../redux/currentUserSlice';
import OldCoversSelectPopup from './OldCoversSelectPopup';

const ProfileCover = ({ photos, visitor, user }) => {
    const [showCoverMenu, setShowCoverMenu] = useState(false)
    const [error, setError] = useState("")
    const [coverImage, setCoverImage] = useState("")
    const [cropWidth, setCropWidth] = useState(null)
    const coverRef = useRef(null)
    const coverInputRef = useRef(null)
    const cropperRef = useRef(null)
    const dispatch = useDispatch()
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [loading, setLoading] = useState(false)
    const [oldCoverShow, setOldCoverShow] = useState(false)

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])
    useOutsideClick(coverRef, () => {
        setShowCoverMenu(false)
    })
    //console.log(visitor)
    const handleCoverImage = async (e) => {
        let file = e.target.files[0]

        if (file.type !== "image/jpeg" &&
            file.type !== "image/png" &&
            file.type !== "image/gif" &&
            file.type !== "image/webp") {
            setError("Unexpected file format! Only jpeg, gif, png, webp files allowed")
            return
        } else if (file.size > 1024 * 1024) {
            setError("Too large file! Max 1mb files allowed")
            return
        }
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (readerEvent) => {
            setCoverImage(readerEvent.target.result)
        }
        setShowCoverMenu(false)
    }
    const getCroppedImage = useCallback(async (show) => {
        try {
            const img = await getCroppedImg(coverImage, croppedAreaPixels)
            //console.log(img)
            if (show) {
                setCoverImage(img)
                setZoom(1)
                setCrop({ x: 0, y: 0 })

            } else {

                return img;
            }
        } catch (error) {
            toast.error("No content selected for creation!")
        }
    }, [croppedAreaPixels])
    //console.log(image)

    const uploadCoverImage = async () => {
        try {
            const img = await getCroppedImage()
            const blob = await fetch(img).then(b => b.blob())
            console.log(blob)
            const path = `iNeedSomething/${user.email}/coverImages`
            //2. upload images to cloudinary
            let formData = new FormData()
            formData.append("path", path)
            formData.append("file", blob)
            const { data } = await axios.post("/images/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            console.log(data)

            return data
        } catch (error) {
            setError(error.response.data.message)
        }
    }
    const updateCoverPicture = async () => {
        try {
            setLoading(true)
            //const { url } = await uploadCoverImage()
            const pic = await getCroppedImage()
            const path = `iNeedSomething/${user.email}/profileImages`
            const { data } = await axios.patch("/users/update_cover_pic", { pic, path })
            setLoading(false)
            toast.success(data.message)
            //pref.current.style.backgroundImage = `url(${data.url})`
            Cookies.set("user", JSON.stringify({ ...user, cover: data.url }))
            dispatch(updateCurrentUserCoverPic(data.url))
            setCoverImage("")
            setOldCoverShow(false)

        } catch (error) {
            setLoading(false)
            setError(error.response.data.message)
        }
    }

    useEffect(() => {
        setCropWidth(cropperRef.current.clientWidth)
    }, [window.innerWidth])

    return (
        <div className="profile_cover" ref={cropperRef}>
            <input
                ref={coverInputRef}
                type="file"
                accept='image/jpeg,image/png,image/gif,image/webp'
                hidden
                onChange={handleCoverImage}
            />
            {coverImage && <div className="save_changes_cover">
                <div className="save_changes_left">
                    <i className="public_icon"></i>
                    Your cover photo is public
                </div>
                <div className="save_changes_right">
                    <button className="blue_btn opacity_btn" onClick={() => setCoverImage("")}>Cancel</button>
                    <button disabled={loading} className="blue_btn" onClick={() => updateCoverPicture()}>
                        {loading ? <PulseLoader color='#fff' size={5} /> : "Save"}
                    </button>
                </div>
            </div>}
            {coverImage && <div className="cover_cropper" >
                <div className="cropper">
                    <Cropper
                        image={coverImage}
                        crop={crop}
                        zoom={zoom}
                        aspect={cropWidth / 320}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        showGrid={true}
                        objectFit="horizontal-cover"
                    />
                </div>
            </div>}
            {user?.cover && !coverImage &&
                <img className='cover' src={user?.cover} alt="" />
            }
            {!visitor && <div className="update_cover_wrapper" ref={coverRef}>
                <div className="open_cover_update" onClick={() => setShowCoverMenu(prev => !prev)}>
                    <i className="camera_filled_icon"></i>
                    Add Cover Photo
                </div>
                {showCoverMenu &&
                    <div className='open_cover_menu'>
                        <div className="open_cover_menu_item hover1" onClick={() => {
                            setOldCoverShow(true)
                            setShowCoverMenu(false)
                        }}>
                            <i className="photo_icon"></i>
                            Select Photo
                        </div>
                        <div className="open_cover_menu_item hover1"
                            onClick={() => {
                                coverInputRef.current.click()
                            }}
                        >
                            <i className="upload_icon"></i>
                            Upload Photo
                        </div>
                    </div>
                }
            </div>}
            {error && <div className='postError comment_error'>
                <div>{error}</div>
                <button onClick={() => setError("")} className="blue_btn">Try Again</button>
            </div>}
            {oldCoverShow && !coverImage &&
                <OldCoversSelectPopup
                    setOldCoverShow={setOldCoverShow}
                    photos={photos}
                    setCoverImage={setCoverImage}
                    user={user}
                />}
        </div>
    )
}

export default ProfileCover