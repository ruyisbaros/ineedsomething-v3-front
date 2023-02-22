import React, { useState, useRef } from 'react'
import { useOutsideClick } from './../../utils/helpers';

const ProfileCover = ({ profile }) => {
    const [showCoverMenu, setShowCoverMenu] = useState(false)
    const coverRef = useRef(null)
    useOutsideClick(coverRef, () => {
        setShowCoverMenu(false)
    })
    return (
        <div className="profile_cover">
            {profile?.cover &&
                <img className='cover' src={profile?.cover} alt="" />
            }
            <div className="update_cover_wrapper" ref={coverRef}>
                <div className="open_cover_update" onClick={() => setShowCoverMenu(prev => !prev)}>
                    <i className="camera_filled_icon"></i>
                    Add Cover Photo
                </div>
                {showCoverMenu &&
                    <div className='open_cover_menu'>
                        <div className="open_cover_menu_item hover1">
                            <i className="photo_icon"></i>
                            Select Photo
                        </div>
                        <div className="open_cover_menu_item hover1">
                            <i className="upload_icon"></i>
                            Upload Photo
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default ProfileCover