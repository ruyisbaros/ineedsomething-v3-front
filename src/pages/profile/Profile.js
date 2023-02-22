import React, { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from './../../axios';
import { toast } from 'react-toastify';
import { useEffectOnce } from './../../utils/helpers';
import Header from './../../components/header/Header';
import ProfilePictureInfos from './ProfilePictureInfos';
import ProfileCover from './ProfileCover';
import ProfileMenu from './ProfileMenu';
import "./profile.css"
import PeopleYouMayKnow from './PeopleYouMayKnow';
import CreatePost from '../../components/post/create_post/CreatePost';
import GridRight from './GridRight';

const Profile = ({ setShowCreatePostPopup }) => {
    /* const path = `iNeedSomething/${user.username}/postImages` */
    const { user, token } = useSelector(store => store.currentUser.loggedUser)
    const { username } = useParams()
    const pageUsername = username === undefined ? user?.username : username
    const [loading, setLoading] = useState(false)
    const [profile, setProfile] = useState(null)

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

    return (
        <div className='profile'>
            <Header page="profile" />
            <div className="profile_top">
                <div className="profile_container">
                    <ProfileCover profile={profile} />
                    <ProfilePictureInfos profile={profile} />
                    <ProfileMenu />
                </div>
            </div>
            <div className="profile_bottom">
                <div className="profile_container">
                    <div className="bottom_container">
                        <PeopleYouMayKnow />
                        <div className="profile_grid">
                            <div className="profile_left">
                                Left
                            </div>
                            <div className="profile_right">
                                <CreatePost user={user} profile setShowCreatePostPopup={setShowCreatePostPopup} />
                                <GridRight />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile