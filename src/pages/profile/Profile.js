import React, { useCallback, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from './../../axios';
import { toast } from 'react-toastify';
import Header from './../../components/header/Header';
import ProfilePictureInfos from '../../components/profile/ProfilePictureInfos';
import ProfileCover from '../../components/profile/ProfileCover';
import ProfileMenu from '../../components/profile/ProfileMenu';
import PeopleYouMayKnow from '../../components/profile/PeopleYouMayKnow';
import CreatePost from '../../components/post/create_post/CreatePost';
import GridRight from '../../components/profile/GridRight';
import SinglePost from './../../components/post/posts_stream/SinglePost';
import Photos from '../../components/profile/Photos';
import Friends from '../../components/profile/Friends';
import "./profile.css"

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
    console.log(profile)
    return (
        <div className='profile'>
            <Header page="profile" />
            <div className="profile_top">
                <div className="profile_container">
                    <ProfileCover profile={profile} visitor={visitor} />
                    <ProfilePictureInfos user={user} token={token} profile={profile} visitor={visitor} />
                    <ProfileMenu />
                </div>
            </div>
            <div className="profile_bottom">
                <div className="profile_container">
                    <div className="bottom_container">
                        <PeopleYouMayKnow />
                        <div className="profile_grid">
                            <div className="profile_left">
                                <Photos profile={profile} user={user} token={token} />
                                <Friends friends={profile?.friends} />
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