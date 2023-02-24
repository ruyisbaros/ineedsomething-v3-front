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
    const { loggedUser } = useSelector(store => store.currentUser)
    const { username } = useParams()
    //const navigate = useNavigate()
    const pageUsername = username === undefined ? loggedUser?.username : username
    const [loading, setLoading] = useState(false)
    const [profile, setProfile] = useState(null)
    const [userPosts, setUserPosts] = useState([])

    const getProfile = useCallback(async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/users/get_profile/${pageUsername}`, {
                headers: { "Authorization": `Bearer ${loggedUser.token}` }
            });
            console.log(data);
            setLoading(false)
            setProfile(data.user)
            setUserPosts(data.posts)

        } catch (error) {
            setLoading(false)
            toast.error(error.response.data.message)
        }
    }, [pageUsername, loggedUser])

    useEffect(() => {
        getProfile()
    }, [getProfile])
    const visitor = pageUsername === loggedUser?.username ? false : true
    //console.log(profile)

    const [photos, setPhotos] = useState([])
    const path = `iNeedSomething/${profile?.username}/postImages`

    const getImages = useCallback(async () => {
        try {
            setLoading(true)
            const { data } = await axios.post(`/images/listImages`, { path, sort: "desc", max: 5 }, {
                headers: { "Authorization": `Bearer ${loggedUser.token}` }
            });
            console.log(data);
            setPhotos(data)
            setLoading(false)

        } catch (error) {
            setLoading(false)
            toast.error(error.response.data.message)
        }
    }, [loggedUser, path])

    useEffect(() => {
        getImages()
    }, [getImages])
    return (
        <div className='profile'>
            <Header page="profile" />
            <div className="profile_top">
                <div className="profile_container">
                    <ProfileCover profile={profile} visitor={visitor} />
                    <ProfilePictureInfos user={loggedUser} token={loggedUser.token} profile={profile} visitor={visitor} />
                    <ProfileMenu />
                </div>
            </div>
            <div className="profile_bottom">
                <div className="profile_container">
                    <div className="bottom_container">
                        <PeopleYouMayKnow />
                        <div className="profile_grid">
                            <div className="profile_left">
                                <Photos photos={photos} profile={profile} user={loggedUser} token={loggedUser.token} />
                                <Friends friends={profile?.friends} />
                            </div>
                            <div className="profile_right">
                                {profile?._id === loggedUser?._id && <CreatePost user={loggedUser} profile setShowCreatePostPopup={setShowCreatePostPopup} />}
                                <GridRight />
                                <div className="posts">
                                    {
                                        (userPosts && userPosts.length > 0) ?
                                            userPosts.map(post => (
                                                <SinglePost key={post._id} profile post={post} user={loggedUser} />
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