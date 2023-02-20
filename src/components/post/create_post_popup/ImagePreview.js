import React, { useRef } from 'react'
import EmojiPickerComp from './EmojiPickerComp';
import { toast } from 'react-toastify';

const ImagePreview = ({ user, text, setText, images, setImages, setShowPrev, setError }) => {
    const imageInput = useRef()
    const handleImages = (e) => {
        let files = Array.from(e.target.files)
        files.forEach(file => {
            if (file.type !== "image/jpeg" &&
                file.type !== "image/png" &&
                file.type !== "image/gif" &&
                file.type !== "image/webp") {
                setError("Unexpected file format! Only jpeg, gif, png, webp files allowed")
                files = files.filter((item) => item.name !== file.name)
                return
            } else if (file.size > 1024 * 1024) {
                setError("Too large file! Max 1mb files allowed")
                return
            }
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
                <input
                    type="file"
                    multiple
                    hidden
                    accept='image/jpeg,image/png,image/gif,image/webp'
                    ref={imageInput}
                    onChange={handleImages} />
                {images.length > 0 ?
                    <div className="add_pics_inside1 p0">
                        <div className="preview_actions">
                            <button className='hover1'>
                                <i className="edit_icon"></i>
                                Edit
                            </button>
                            <button className='hover1'
                                onClick={() => {
                                    imageInput.current.click()
                                }}
                            >
                                <i className="addPhoto_icon"></i>
                                Add Photos/Videos
                            </button>
                        </div>
                        <div className="small_white_circle" onClick={() => setImages([])}>
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
                        <div className="small_white_circle" onClick={() => setShowPrev(false)}>
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