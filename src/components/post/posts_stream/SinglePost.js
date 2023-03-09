import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import Moment from 'react-moment'
import Public from './../../../svg/public';
import Dots from './../../../svg/dots';
import ReactsPopup from './ReactsPopup';
import CreateComment from './CreateComment';
import PostMenu from './PostMenu';
import "./singlePost.css"
import { getPostReacts } from '../../../services/PostReactService';
import { addPostReact } from './../../../services/PostReactService';
import { getPostComments, fetchCommentsThunk } from './../../../services/CommentServices';
import SingleComment from '../SingleComment';
//import { singlePostComments } from '../../../redux/commentsSlice';

const SinglePost = ({ user, post, profile }) => {
    //const { loggedUser } = useSelector(store => store.currentUser)
    const { comments } = useSelector(store => store.comments)
    const [showPopup, setShowPopup] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [showComment, setShowComment] = useState(false)
    //const [loading, setLoading] = useState(false)
    const [postReacts, setPostReacts] = useState([])
    const [postComments, setPostComments] = useState([])
    const [check, setCheck] = useState("")
    const [isSaved, setIsSaved] = useState("")
    const [count, setCount] = useState(0)
    const [commentSize, setCommentSize] = useState(3)
    const dotRef = useRef(null)
    const dispatch = useDispatch()
    //console.log(post.images)

    const fetchPostReacts = useCallback(async () => {
        const res = await getPostReacts(post._id)
        setPostReacts(res.reacts)
        setCheck(res.check?.react)
        setCount(res.total)
        setIsSaved(res.checkSaved)
        //console.log(res)
    }, [post._id])

    useEffect(() => {
        fetchPostReacts()
    }, [fetchPostReacts])

    useEffect(() => {
        dispatch(fetchCommentsThunk())
    }, [dispatch])
    useEffect(() => {
        setPostComments(comments.filter(com => com.commentPost === post?._id))
    }, [comments, post, dispatch])

    const handleReact = async (react) => {
        await addPostReact(react, post._id)
        if (check === react) {
            setCheck()
            //my previous react and new react same
            let index = postReacts.findIndex(item => item.react === check)
            if (index !== -1) {
                setPostReacts([...postReacts, postReacts[index].count -= 1])
                setCount(prev => --prev)
            }
            //console.log(postReacts)
        } else {
            setCheck(react)
            //First time I react
            let index = postReacts.findIndex(item => item.react === react)
            //I make different react than previous
            let index2 = postReacts.findIndex(item => item.react === check)
            if (index !== -1) {
                setPostReacts([...postReacts, (postReacts[index].count = ++postReacts[index].count)])
                setCount(prev => ++prev)
                //console.log(postReacts)
            }
            if (index2 !== -1) {
                setPostReacts([...postReacts, (postReacts[index2].count = --postReacts[index2].count)])
                setCount(prev => --prev)
                //console.log(postReacts)
            }
        }
    }
    //console.log(postReacts)

    return (
        <div className='post' style={{ width: `${profile && "100%"}` }}>
            <div className="post_header">
                <Link to={`/profile/${post.user.username}`} className='post_header_left'>
                    <img src={post.user.picture} alt="" />
                    <div className="header_col">
                        <div className="post_profile_name">
                            {post.user.first_name}{" "}{post.user.last_name}
                            <div className="updated_p">
                                {post.type === "profilePicture" &&
                                    `updated ${post.user.gender === "male" ? "his" : "her"} profile picture`
                                }
                                {post.type === "cover" &&
                                    `updated ${post.user.gender === "male" ? "his" : "her"} cover picture`
                                }
                            </div>
                        </div>
                        <div className="post_profile_privacy_date">
                            <Moment fromNow interval={30}>
                                {post.createdAt}
                            </Moment>
                            . <Public color="#828287" />
                        </div>
                    </div>
                </Link>
                <div ref={dotRef} className="post_header_right hover1" onClick={() => {

                    setShowMenu(prev => !prev)
                }}>
                    <Dots color="#828287" />
                </div>
            </div>
            {post.background ?
                (<div className='post_bg' style={{ background: `url(${post.background})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                    <div className="post_bg_text">{post.text}</div>
                </div>)
                :
                <>
                    <div className="post_text">
                        {post.text}
                    </div>
                    {
                        post.images && post.images?.length > 0 &&
                        <div
                            className={
                                post.images.length === 1
                                    ? "grid_1"
                                    : post.images.length === 2
                                        ? "grid_2"
                                        : post.images.length === 3
                                            ? "grid_3"
                                            : post.images.length === 4
                                                ? "grid_4"
                                                : post.images.length >= 5 && "grid_5"
                            }
                        >
                                {post.images
                                    .slice(0, 5).map((image, i) => (
                                <img src={image} key={i} alt="" className={`img-${i}`} />
                            ))}
                            {post.images.length > 5 && (
                                <div className="more-pics-shadow">
                                    +{post.images.length - 5}
                                </div>
                            )}
                        </div>
                    }
                </>
            }
            <div className="post_infos">
                <div className="reacts_count">
                    <div className="react_count_images">
                        {postReacts.length > 0 &&
                            postReacts
                                .sort((a, b) => b.count - a.count)
                                .slice(0, 3)
                                .map((item, i) => (
                                    item.count > 0 &&
                                    <img key={i} src={`../../../../reacts/${item.react}.svg`} alt="" />
                                ))
                        }
                    </div>
                    <div className="react_count_num">{count}</div>
                </div>
                <div className="to_right">
                    <div className="comments_count" onClick={() => setShowComment(prev => !prev)}>{postComments.length} comments</div>
                    <div className="share_count">1 share</div>
                </div>
            </div>
            <div className="post_actions">
                <ReactsPopup handleReact={handleReact} showPopup={showPopup} setShowPopup={setShowPopup} />
                <div className="post_action hover1"
                    onMouseOver={() => {
                        setTimeout(() => {
                            setShowPopup(true)
                        }, 500)
                    }}
                    onMouseLeave={() => {
                        setTimeout(() => {
                            setShowPopup(false)
                        }, 500)
                    }}
                    onClick={() => handleReact(check ? check : "like")}
                >
                    {check ? <img className='react_img' src={`../../../../reacts/${check}.svg`} alt="" /> : <i className="like_icon"></i>}
                    <span
                        style={{
                            color: `
                    ${check === "like" ? "#4267b2"
                                    : check === "haha" ? "#f7b125"
                                        : check === "wow" ? "#f7b125"
                                            : check === "sad" ? "#f7b125"
                                                : check === "love" ? "#f63459"
                                                    : check === "angry" ? "#e4605a"
                                                        : ""}
                    `, textTransform: "capitalize"
                        }}
                    >{check ? check : "Like"}</span>
                </div>
                <div className="post_action hover1" onClick={() => setShowComment(prev => !prev)}>
                    <i className="comment_icon"></i>
                    <span>Comment</span>
                </div>
                <div className="post_action hover1">
                    <i className="share_icon"></i>
                    <span>Share</span>
                </div>
            </div>
            <div className="comments_wrap">
                <div className="comments_order"></div>
                <div>
                    <CreateComment setShowComment={setShowComment} user={user} commentPost={post?._id} />
                    {showComment &&
                        <>
                            {postComments && postComments.length > 0 &&
                                postComments.slice(0, commentSize).map(com => (
                                    <SingleComment key={com._id} com={com} />
                                ))
                            }
                            {commentSize < postComments.length &&
                                <div onClick={() => setCommentSize(prev => prev + 3)} className='view_comments'>view more</div>
                        }
                    </>
                    }
                </div>
            </div>
            {showMenu && <PostMenu setIsSaved={setIsSaved} isSaved={isSaved} post={post} user={user} />}
        </div>
    )
}

export default SinglePost