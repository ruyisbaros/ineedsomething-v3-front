import React, { useState, useCallback, useRef } from 'react'
import Cropper from 'react-easy-crop'
import { toast } from 'react-toastify';
import { getCroppedImg } from '../../utils/helpers';
import { PulseLoader } from 'react-spinners';
import axios from './../../axios';
import { useDispatch } from 'react-redux';
import { updateCurrentUserProfilePic } from '../../redux/currentUserSlice';
import Cookies from 'js-cookie';

const ProfilePictureViewPopup = ({ pref, setShowProfileImage, image, setImage, user, setError }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [loading, setLoading] = useState(false)
    const [description, setDescription] = useState("")
    const sliderRef = useRef(null)
    const dispatch = useDispatch()

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        //console.log(croppedArea, croppedAreaPixels)
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const zoomOut = (e) => {
        sliderRef.current.stepDown()
        setZoom(sliderRef.current.value)
    }
    const zoomIn = (e) => {
        sliderRef.current.stepUp()
        setZoom(sliderRef.current.value)
    }
    const getCroppedImage = useCallback(async (show) => {
        try {
            const img = await getCroppedImg(image, croppedAreaPixels)
            //console.log(img)
            if (show) {
                setImage(img)
                setZoom(1)
                setCrop({ x: 0, y: 0 })
                console.log("show")
            } else {
                console.log("not show")
                return img;
            }
        } catch (error) {
            toast.error("No content selected for creation!")
        }
    }, [croppedAreaPixels])
    //console.log(image)
    let ORIGIN = '';
    const APP_ENVIRONMENT = 'development';

    if (APP_ENVIRONMENT === 'local') {
        ORIGIN = 'http://localhost:3000';
    } else if (APP_ENVIRONMENT === 'development') {
        ORIGIN = 'https://ineedsomething.org';
    } 
    const uploadImage = async () => {
        try {
            const img = await getCroppedImage()
            const blob = await fetch(img).then(b => b.blob())
            console.log(blob)
            const path = `iNeedSomething/${user.email}/profileImages`
            //2. upload images to cloudinary
            let formData = new FormData()
            formData.append("path", path)
            formData.append("file", blob)
            const { data } = await axios.post("/images/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Access-Control-Allow-Origin": `${ORIGIN}`
                }
            })
            console.log(data)

            return data
        } catch (error) {
            setError(error.response.data.message)
        }
    }
    const updateProfilePicture = async () => {
        try {
            setLoading(true)
            const { url } = await uploadImage()

            const { data } = await axios.patch("/users/update_profile_pic", { url })
            setLoading(false)
            toast.success(data.message)
            pref.current.style.backgroundImage = `url(${data.url})`
            Cookies.set("user", JSON.stringify({ ...user, picture: data.url }))
            dispatch(updateCurrentUserProfilePic(data.url))
            setImage(null)
            setShowProfileImage(false)
        } catch (error) {
            setLoading(false)
            setError(error.response.data.message)
        }
    }

    return (
        <div className="postBox update_img">
            <div className="box_header">
                <div className="small_circle" onClick={() => setImage(null)}>
                    <i className="exit_icon"></i>
                </div>
                <span>Update profile picture</span>
            </div>
            <div className="update_image_desc">
                <textarea
                    placeholder='Description'
                    className='textarea_blue details_input'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <img src="" alt="" />
            </div>
            <div className="update_center">
                <div className="cropper">
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={1 / 1}
                        cropShape="round"
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        showGrid={false}
                    />
                </div>
                <div className="slider">
                    <div className="slider_circle hover1" onClick={zoomOut}>
                        <i className="minus_icon"></i>
                    </div>
                    <input
                        ref={sliderRef}
                        type="range"
                        min={1} max={3}
                        step={0.2}
                        value={zoom}
                        onChange={(e) => setZoom(e.target.value)}
                    />
                    <div className="slider_circle hover1" onClick={zoomIn}>
                        <i className="plus_icon"></i>
                    </div>
                </div>
            </div>
            <div className="flex_up">
                <div className="gray_btn" onClick={() => getCroppedImage("show")}>
                    <i className="crop_icon"></i>
                    Crop photo
                </div>
                <div className="gray_btn">
                    <i className="temp_icon"></i>
                    Make temporary
                </div>
            </div>
            <div className="flex_p_t">
                <i className="public_icon"></i>
                Your profile picture is public
            </div>
            <div className="update_submit_wrap">
                <div className="blue_link" onClick={() => setImage(null)}>Cancel</div>
                <button disabled={loading} style={{ padding: `${loading}?"17px":""` }} onClick={updateProfilePicture} className='blue_btn' type="submit">
                    {loading ? <PulseLoader color='#fff' size={5} /> : "Save"}</button>
            </div>
        </div>
    )
}

export default ProfilePictureViewPopup