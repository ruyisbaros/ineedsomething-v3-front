import React, { useRef, useState } from 'react'
import { dataURItoBlob } from '../../utils/helpers'
import axios from './../../axios';
import ProfilePictureViewPopup from './ProfilePictureViewPopup';
import "./profilePictures.css"

const ProfilePicture = ({ user, token, setShowProfileImage }) => {
    const inputRef = useRef(null)
    const [image, setImage] = useState(null)
    const [error, setError] = useState("")
    const [description, setDescription] = useState("")
    const [profileUrl, setProfileUrl] = useState("")

    const handleImage = async (e) => {
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
            setImage(readerEvent.target.result)
        }
    }
    const uploadImage = async () => {
        const profileImage = dataURItoBlob(image)

        const path = `iNeedSomething/${user.username}/profileImages`
        //2. upload images to cloudinary
        let formData = new FormData()
        formData.append("path", path)
        formData.append("file", profileImage)
        const { data } = await axios.post("/images/upload", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "content-type": "multipart/form-data",
            }
        })
        setProfileUrl(data)
    }

    return (
        <div className='blur'>
            <input
                ref={inputRef}
                type="file"
                accept='image/jpeg,image/png,image/gif,image/webp'
                hidden
                onChange={handleImage} />
            <div className="postBox pictureBox">
                <div className="box_header">
                    <div className="small_circle" onClick={() => setShowProfileImage(false)}>
                        <i className="exit_icon"></i>
                    </div>
                    <span>Update profile picture</span>
                </div>
                <div className="update_picture_wrap">
                    <div className="update_picture_buttons">
                        <button className="light_blue_btn" onClick={() => inputRef.current.click()}>
                            <i className="plus_icon filter_blue"></i>
                            Upload photo
                        </button>
                        <button className="gray_btn">
                            <i className="frame_icon"></i>
                            Add frame
                        </button>
                    </div>
                    {error && <div className='postError comment_error'>
                        <div>{error}</div>
                        <button onClick={() => setError("")} className="blue_btn">Try Again</button>
                    </div>}
                    <div className="old_pictures_wrap">

                    </div>
                </div>
            </div>
            {image && <ProfilePictureViewPopup description={description} setDescription={setDescription} image={image} setImage={setImage} />}
        </div>
    )
}

export default ProfilePicture