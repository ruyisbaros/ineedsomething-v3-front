import React, { useCallback, useState, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from './../../axios';
import { toast } from 'react-toastify';
import { useEffectOnce, useOutsideClick } from './../../utils/helpers';
import Header from './../../components/header/Header';
import "./profile.css"
import ProfilePictureInfos from './ProfilePictureInfos';



const Profile = () => {
    /* const path = `iNeedSomething/${user.username}/postImages` */
    const { user, token } = useSelector(store => store.currentUser.loggedUser)
    const { username } = useParams()
    const pageUsername = username === undefined ? user?.username : username
    const [loading, setLoading] = useState(false)
    const [showCoverMenu, setShowCoverMenu] = useState(false)
    const [profile, setProfile] = useState(null)

    const coverRef = useRef(null)

    const getProfile = useCallback(async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/users/get_profile/${pageUsername}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            console.log(data);
            setLoading(false)
            setProfile(data)
        } catch (error) {
            setLoading(false)
            toast.error(error.response.data.message)
        }
    }, [pageUsername, token])

    useEffectOnce(() => {
        getProfile()
    })
    //console.log(profile)
    useOutsideClick(coverRef, () => {
        setShowCoverMenu(false)
    })
    return (
        <div className='profile'>
            <Header page="profile" />
            <div className="profile_top">
                <div className="profile_container">
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
                    <ProfilePictureInfos profile={profile} />
                </div>
            </div>
        </div>
    )
}

export default Profile