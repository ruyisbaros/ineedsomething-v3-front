import React, { useCallback, useState, useEffect, useRef } from 'react'
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
import ProfileIntro from '../../components/profile/profile_intro/ProfileIntro';
import { useMediaQuery } from 'react-responsive';

const Profile = ({ setShowCreatePostPopup }) => {
    const { loggedUser } = useSelector(store => store.currentUser)
    const { username } = useParams()
    const pageUsername = username === undefined ? loggedUser?.username : username
    const [loading, setLoading] = useState(false)
    const [profile, setProfile] = useState(null)
    const [userPosts, setUserPosts] = useState([])
    const [photos, setPhotos] = useState([])
    const path = `iNeedSomething/${profile?.username}/*`
    const visitor = pageUsername === loggedUser?.username ? false : true

    const getProfile = useCallback(async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/users/get_profile/${pageUsername}`, {
                headers: { "Authorization": `Bearer ${loggedUser.token}` }
            });
            console.log(data.user);
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

    const getImages = useCallback(async () => {
        try {
            setLoading(true)
            const { data } = await axios.post(`/images/listImages`, { path, sort: "desc", max: 20 }, {
                headers: { "Authorization": `Bearer ${loggedUser.token}` }
            });
            //console.log(data);
            setPhotos(data)
            setLoading(false)

        } catch (error) {
            setLoading(false)
            toast.error(error.response.data.message)
        }
    }, [loggedUser.token, path])

    useEffect(() => {
        getImages()
    }, [getImages])
    /* Scroll animation */
    const [profileTopHeight, setProfileTopHeight] = useState()
    const profileTopRef = useRef(null)
    const [profileLeftHeight, setProfileLeftHeight] = useState()
    const [scrollHeight, setScrollHeight] = useState()
    const profileLeftRef = useRef(null)
    useEffect(() => {
        setProfileTopHeight(profileTopRef.current.clientHeight + 300)
        setProfileLeftHeight(profileLeftRef.current.clientHeight)
        window.addEventListener("scroll", getScrollHeight, { passive: true })

        return () => {
            window.removeEventListener("scroll", getScrollHeight)
        }
    }, [loading, scrollHeight])
    const above900 = useMediaQuery({
        query: "(min-width:901px)"
    })
    const getScrollHeight = () => {
        setScrollHeight(window.pageYOffset)
    }
    console.log(profileTopHeight, scrollHeight)
    return (
        <div className='profile'>
            <Header page="profile" />
            <div className="profile_top" ref={profileTopRef}>
                <div className="profile_container">
                    <ProfileCover photos={photos.resources} user={loggedUser} token={loggedUser.token} visitor={visitor} />
                    <ProfilePictureInfos photos={photos.resources} user={loggedUser} token={loggedUser.token}
                        profile={profile} visitor={visitor} />
                    <ProfileMenu />
                </div>
            </div>
            <div className="profile_bottom">
                <div className="profile_container">
                    <div className="bottom_container">
                        <PeopleYouMayKnow />
                        <div
                            className={`profile_grid 
                            ${above900 && scrollHeight >= profileTopHeight && profileLeftHeight > 1000 ?
                                    "scrollFixed showLess" :
                                    above900 && scrollHeight >= profileTopHeight && profileLeftHeight < 1000 ?
                                        "scrollFixed showMore" :
                                        ""}`}>
                            <div className="profile_left" ref={profileLeftRef}>
                                <ProfileIntro visitor={visitor} user={loggedUser}
                                    detailsS={profile?.details} token={loggedUser.token} />
                                <Photos photos={photos.resources} />
                                <Friends friends={profile?.friends} />
                            </div>
                            <div className="profile_right">
                                {profile?._id === loggedUser?._id &&
                                    <CreatePost user={loggedUser} profile setShowCreatePostPopup={setShowCreatePostPopup} />}
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