import React, { useRef, useState } from 'react'
import ProfilePictureViewPopup from './ProfilePictureViewPopup';
import "./profilePictures.css"
import { useOutsideClick } from './../../utils/helpers';

const ProfilePicture = ({ photos, pref, user, token, setShowProfileImage }) => {
    const inputRef = useRef(null)
    const profilePictureRef = useRef(null)
    const [image, setImage] = useState(null)
    const [error, setError] = useState("")

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
    //useOutsideClick(profilePictureRef, () => { setShowProfileImage(false) })
    return (
        <div className='blur'>
            <input
                ref={inputRef}
                type="file"
                accept='image/jpeg,image/png,image/gif,image/webp'
                hidden
                onChange={handleImage} />
            <div className="postBox pictureBox" ref={profilePictureRef}>
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
                    <div className="old_pictures_wrap scrollbar">
                        <h4>Your profile pictures</h4>
                        <div className="old_pictures">
                            {photos && photos.length > 0 &&
                                photos
                                    .filter(photo => photo.folder === `iNeedSomething/${user?.username}/profileImages`)
                                    .map(photo => (
                                        <img key={photo.public_id} src={photo.url} alt=""
                                            onClick={() => setImage(photo.url)}
                                        />
                                    ))
                            }
                        </div>
                        <h4>Your post pictures</h4>
                        <div className="old_pictures">
                            {photos && photos.length > 0 &&
                                photos
                                    .filter(photo => photo.folder !== `iNeedSomething/${user?.username}/profileImages`)
                                    .map(photo => (
                                        <img key={photo.public_id} src={photo.url} alt=""
                                            onClick={() => setImage(photo.url)}
                                        />
                                    ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            {image && <ProfilePictureViewPopup
                setError={setError}
                token={token} user={user}
                image={image}
                setImage={setImage}
                setShowProfileImage={setShowProfileImage}
                pref={pref}
            />}
        </div>
    )
}

export default ProfilePicture