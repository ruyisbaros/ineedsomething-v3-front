import React, { useCallback, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from './../../axios';
import { toast } from 'react-toastify';
import Header from './../../components/header/Header';
import ProfilePictureInfos from './ProfilePictureInfos';
import ProfileCover from './ProfileCover';
import ProfileMenu from './ProfileMenu';
import "./profile.css"
import PeopleYouMayKnow from './PeopleYouMayKnow';
import CreatePost from '../../components/post/create_post/CreatePost';
import GridRight from './GridRight';
import SinglePost from './../../components/post/posts_stream/SinglePost';

const Profile = ({ setShowCreatePostPopup }) => {
    /* const path = `iNeedSomething/${user.username}/postImages` */
    const { user, token } = useSelector(store => store.currentUser.loggedUser)
    const { username } = useParams()
    //const navigate = useNavigate()
    const pageUsername = username === undefined ? user?.username : username
    const [loading, setLoading] = useState(false)
    const [profile, setProfile] = useState(null)
    const [userPosts, setUserPosts] = useState([])

    const getProfile = useCallback(async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/users/get_profile/${pageUsername}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            console.log(data);
            setLoading(false)
            setProfile(data.user)
            setUserPosts(data.posts)

        } catch (error) {
            setLoading(false)
            toast.error(error.response.data.message)
        }
    }, [pageUsername, token])

    useEffect(() => {
        getProfile()
    }, [getProfile])
    const visitor = pageUsername === user.username ? false : true
    //console.log(username, user.username, visitor)
    return (
        <div className='profile'>
            <Header page="profile" />
            <div className="profile_top">
                <div className="profile_container">
                    <ProfileCover profile={profile} visitor={visitor} />
                    <ProfilePictureInfos profile={profile} visitor={visitor} />
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
                                {profile?._id === user?._id && <CreatePost user={user} profile setShowCreatePostPopup={setShowCreatePostPopup} />}
                                <GridRight />
                                <div className="posts">
                                    {
                                        (userPosts && userPosts.length > 0) ?
                                            userPosts.map(post => (
                                                <SinglePost key={post._id} profile post={post} user={user} />
                                            ))
                                            :
                                            <div className="no_post">No Post available</div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile