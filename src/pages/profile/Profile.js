import React, { useCallback, useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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
import ProfileIntro from '../../components/profile/profile_intro/ProfileIntro';
import { useMediaQuery } from 'react-responsive';
import ProfileSkeleton from './ProfileSkeleton';
import PeopleYouMayKnowSkeleton from './PeopleYouMayKnowSkeleton';
import HeaderSkeleton from './../../components/header/HeaderSkeleton';
import { fetchProfileThunk } from './../../services/profileServices';
import "./profile.css"

const Profile = ({ setShowCreatePostPopup }) => {
    const { loggedUser } = useSelector(store => store.currentUser)
    const { profilePosts, loading, profile } = useSelector(store => store.profile)
    const { username } = useParams()
    const dispatch = useDispatch()
    const pageUsername = username === undefined ? loggedUser?.username : username
    const [loading1, setLoading1] = useState(false)
    const [photos, setPhotos] = useState([])
    const visitor = pageUsername === loggedUser?.username ? false : true

    useEffect(() => {
        dispatch(fetchProfileThunk(pageUsername))
    }, [dispatch, pageUsername])

    const getImages = useCallback(async () => {
        try {
            setLoading1(true)
            const { data } = await axios.get(`/images/listImages2/20/${profile?._id}`);
            //console.log(data);
            setPhotos(data)
            setLoading1(false)

        } catch (error) {
            setLoading1(false)
            toast.error(error.response.data.message)
        }
    }, [profile?._id])

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
    //console.log(profileTopHeight, scrollHeight)

    return (
        <div className='profile'>
            {!loggedUser ? <HeaderSkeleton /> : <Header page="profile" />}
            <div className="profile_top" ref={profileTopRef}>
                <div className="profile_container">
                    {loading ?
                        <ProfileSkeleton /> :
                        <>
                            <ProfileCover photos={photos} user={loggedUser} visitor={visitor} />
                            <ProfilePictureInfos photos={photos} user={loggedUser} 
                                profile={profile} visitor={visitor}
                            />
                            <ProfileMenu />
                        </>}
                </div>
            </div>
            <div className="profile_bottom">
                <div className="profile_container">
                    <div className="bottom_container">
                        {loading ? <PeopleYouMayKnowSkeleton /> : <PeopleYouMayKnow />}
                        <div
                            className={`profile_grid 
                            ${above900 && scrollHeight >= profileTopHeight && profileLeftHeight > 1000 ?
                                    "scrollFixed showLess" :
                                    above900 && scrollHeight >= profileTopHeight && profileLeftHeight < 1000 ?
                                        "scrollFixed showMore" :
                                        ""}`}>
                            <div className="profile_left" ref={profileLeftRef}>
                                <ProfileIntro visitor={visitor} user={loggedUser}
                                   /*  detailsS={profile?.details} */ />
                                <Photos photos={photos} />
                                <Friends friends={profile?.friends} />
                            </div>
                            <div className="profile_right">
                                {profile?._id === loggedUser?._id &&
                                    <CreatePost user={loggedUser} profile setShowCreatePostPopup={setShowCreatePostPopup} />}
                                <GridRight />
                                <div className="posts">
                                    {
                                        (profilePosts && profilePosts.length > 0) ?
                                            profilePosts.map(post => (
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