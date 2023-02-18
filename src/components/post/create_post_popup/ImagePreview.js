import React, { useRef } from 'react'
import EmojiPickerComp from './EmojiPickerComp';

const ImagePreview = ({ user, text, setText, images, setImages }) => {
    const imageInput = useRef()
    const handleImages = (e) => {
        let files = Array.from(e.target.files)
        files.forEach(file => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = (readerEvent) => {
                setImages((images) => [...images, readerEvent.target.result])
            }
        })
    }
    return (
        <div className='overflow_a scrollbar'>
            <EmojiPickerComp user={user} text={text} setText={setText} type2 />
            <div className="add_pics_wrap">
                <input type="file" multiple hidden ref={imageInput} onChange={handleImages} />
                {images.length > 0 ?
                    <div className="add_pics_inside1 p0">
                        <div className="preview_actions">
                            <button className='hover1'>
                                <i className="edit_icon"></i>
                                Edit
                            </button>
                            <button className='hover1'>
                                <i className="addPhoto_icon"></i>
                                Add Photos/Videos
                            </button>
                        </div>
                        <div className="small_white_circle">
                            <i className="exit_icon"></i>
                        </div>
                        <div className={
                            images.length === 1 ?
                                "preview1"
                                : images.length === 2 ?
                                    "preview2"
                                    : images.length === 3 ?
                                        "preview3"
                                        : images.length === 4 ?
                                            "preview4"
                                            : images.length === 5 ?
                                                "preview5" : "preview6"}>
                            {images.map((image, index) => (
                                <img key={index} src={image} alt="" />
                            ))}
                        </div>
                    </div>
                    :
                    <div className="add_pics_inside1">
                        <div className="small_white_circle">
                            <i className="exit_icon"></i>
                        </div>
                        <div className="add_col" onClick={() => {
                            imageInput.current.click()
                        }}>
                            <div className="add_circle">
                                <i className="addPhoto_icon"></i>
                            </div>
                            <span>Add Photos/Videos</span>
                            <span>or drag and drop</span>
                        </div>
                    </div>
                }
                <div className="add_pics_inside2">
                    <div className="add_circle">
                        <i className="phone_icon"></i>
                    </div>
                    <div className="mobile_text">
                        Add photos from your device.
                    </div>
                    <span className='addPhone_btn'>Add</span>
                </div>
            </div>
        </div>
    )
}

export default ImagePreview