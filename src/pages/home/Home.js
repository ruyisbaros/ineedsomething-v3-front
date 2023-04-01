import React, { useState, useRef, useEffect, useCallback } from 'react'
import Header from './../../components/header/Header';
import { useSelector, useDispatch } from 'react-redux';
import HomeLeft from '../../components/home/left/HomeLeft';
import HomeRight from './../../components/home/right/HomeRight';
import Stories from '../../components/home/stories/Stories';
import CreatePost from '../../components/post/create_post/CreatePost';
import NotActivateUser from './../../components/home/activation/NotActivateUser';
import SinglePost from '../../components/post/posts_stream/SinglePost';
import HeaderSkeleton from '../../components/header/HeaderSkeleton';
import StoriesSkeleton from '../../components/home/stories/StoriesSkeleton';
import CreatePostSkeleton from '../../components/post/create_post/CreatePostSkeleton';
import SinglePostSkeleton from '../../components/post/posts_stream/SinglePostSkeleton';
import HomeLeftSkeleton from '../../components/home/left/HomeLeftSkeleton';
import HomeRightSkeleton from '../../components/home/right/HomeRightSkeleton';
import "./home.css"
import { getAllPostsRedux } from '../../redux/postsSlicer';
import axios from './../../axios';
import { toast } from 'react-toastify';
import { fetchNotificationsThunk } from '../../services/NotificationService';
import { unReadCount } from '../../redux/notificationSlice';
import { fetchFriendOffersThunk } from '../../services/FriendOffers';

const Home = ({ setShowCreatePostPopup, socket, notReview, setNotReview, not, setNot }) => {
    const { loggedUser } = useSelector(store => store.currentUser)
    const { notifications, unRead } = useSelector(store => store.notifications)
    const { posts } = useSelector(store => store.posts)
    const homeMiddle = useRef(null)
    const dispatch = useDispatch();
    const [height, setHeight] = useState()
    const [loading, setLoading] = useState(false)

    //console.log(unRead)
    useEffect(() => {
        dispatch(unReadCount())
    }, [dispatch, notifications])

    useEffect(() => {
        setHeight(homeMiddle.current.clientHeight)
    }, [])
    useEffect(() => {
        socket?.emit("joinUser", loggedUser._id)
    }, [loggedUser._id, socket])
    const fetchAllPosts = useCallback(async () => {
        try {
            setLoading(true)
            const { data } = await axios.get("/posts/getAllPosts");
            //console.log(data);
            dispatch(
                getAllPostsRedux(data)
            );
            setLoading(false)

        } catch (error) {
            setLoading(false)
            toast.error(error.response.data.message)
        }
    }, [dispatch]);

    useEffect(() => {
        if (loggedUser) {
            fetchAllPosts()
        }
    }, [fetchAllPosts, loggedUser])

    useEffect(() => {
        dispatch(fetchNotificationsThunk())
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchFriendOffersThunk())
    }, [dispatch])

    return (
        <div className='home' style={{ height: `${height + 100}px` }}>
            {!loggedUser ? <HeaderSkeleton /> : <Header page="home" />}
            {!loggedUser ? <HomeLeftSkeleton /> : <HomeLeft user={loggedUser} />}
            <div className="home_middle" ref={homeMiddle}>
                {!loggedUser ? <StoriesSkeleton /> : <Stories />}
                {!loggedUser.verified && <NotActivateUser />}
                {!loggedUser ? <CreatePostSkeleton /> : <CreatePost user={loggedUser} setShowCreatePostPopup={setShowCreatePostPopup} />}
                <div className="posts">
                    {!loggedUser ? <SinglePostSkeleton /> :
                        posts?.map(post =>

                        (
                            <SinglePost key={post._id} user={loggedUser} post={post} socket={socket} not={not} setNot={setNot} setNotReview={setNotReview} />
                        )

                        )
                    }
                </div>
            </div>
            {!loggedUser ? <HomeRightSkeleton /> : <HomeRight user={loggedUser} />}

            {notReview && <div className={`not_review ${notReview ? "go_up" : ""}`}>
                <img src={not?.from?.picture} alt="" />
                <div className="not_review-right">
                    <p>{not?.content}</p>
                </div>
            </div>}
        </div>
    )
}

export default Home