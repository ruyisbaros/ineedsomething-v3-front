import React, { useState, useCallback, useRef } from 'react'
import Cropper from 'react-easy-crop'

const ProfilePictureViewPopup = ({ image, setImage, setDescription, description }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const sliderRef = useRef(null)

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels)
    }, [])

    const zoomOut = (e) => {
        sliderRef.current.stepDown()
        setZoom(sliderRef.current.value)
    }
    const zoomIn = (e) => {
        sliderRef.current.stepUp()
        setZoom(sliderRef.current.value)
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
                <div className="gray_btn">
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
                <div className="blue_link">Cancel</div>
                <button className='blue_btn' type="submit">Save</button>
            </div>
        </div>
    )
}

export default ProfilePictureViewPopup