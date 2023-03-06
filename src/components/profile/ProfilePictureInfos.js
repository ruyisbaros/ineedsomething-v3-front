import React, { useState, useRef } from 'react'
import ProfilePicture from './ProfilePicture';
import FriendShip from './FriendShip';

const ProfilePictureInfos = ({ photos, user, profile, visitor }) => {
    const [showProfileImage, setShowProfileImage] = useState(false)
    const profilePhotoRef = useRef(null)

    return (
        <div className='profile_image_wrap'>
            {showProfileImage && <ProfilePicture photos={photos} pref={profilePhotoRef} setShowProfileImage={setShowProfileImage} user={user} />}
            <div className="profile_w_left">
                <div className="profile_w_img">
                    <div className="profile_w_bg"
                        ref={profilePhotoRef}
                        style={{ backgroundImage: `url(${profile?.picture})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}
                    ></div>
                    {!visitor && <div className="profile_circle hover1" onClick={() => setShowProfileImage(true)}>
                        <i className="camera_filled_icon"></i>
                    </div>}
                </div>
                <div className="profile_w_col">
                    <div className="profile_name">{profile?.first_name}{" "}{profile?.last_name}
                        <div className="other_name">{profile?.details?.otherName ? `(${profile?.details?.otherName})` : ""}</div>
                    </div>
                    <div className="profile_friend_count">
                        {profile?.friends?.length === 0 ? "" :
                            profile?.friends?.length === 1 ? "1 Friend" :
                                `${profile?.friends?.length} Friends`}
                    </div>
                    <div className="profile_friend_images">
                        {
                            profile.friends &&
                            profile.friends.slice(0, 6).map((friend, i) => (
                                <img key={i} src={friend.picture} alt=""
                                    style={{ transform: `translateX(-${i * 13}px)`, zIndex: `${i}` }} />
                            ))
                        }
                    </div>
                </div>
            </div>
            {visitor ?
                <FriendShip />
                : <div className="profile_w_right">
                <div className="blue_btn">
                    <img src="../../../icons/plus.png" className='invert' alt="" />
                    <span>Add to story</span>
                </div>
                <div className="gray_btn">
                    <i className="edit_icon"></i>
                    <span>Edit profile</span>
                </div>
            </div>}
        </div>
    )
}

export default ProfilePictureInfos