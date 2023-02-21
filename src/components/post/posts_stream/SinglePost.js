import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import Public from './../../../svg/public';
import Dots from './../../../svg/dots';
import ReactsPopup from './ReactsPopup';
import CreateComment from './CreateComment';
import PostMenu from './PostMenu';
import "./singlePost.css"

const SinglePost = ({ user, post }) => {
    const [showPopup, setShowPopup] = useState(false)
    const [showMenu, setShowMenu] = useState(false)


    return (
        <div className='post'>
            <div className="post_header">
                <Link to={`/profile/${post.user.email}`} className='post_header_left'>
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
                <div className="post_header_right hover1" onClick={() => {
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
                            {post.images.slice(0, 5).map((image, i) => (
                                <img src={image.url} key={i} alt="" className={`img-${i}`} />
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
                    <div className="react_count_images">:)</div>
                    <div className="react_count_num">2</div>
                </div>
                <div className="to_right">
                    <div className="comments_count">13 comments</div>
                    <div className="share_count">1 share</div>
                </div>
            </div>
            <div className="post_actions">
                <ReactsPopup showPopup={showPopup} setShowPopup={setShowPopup} />
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
                >
                    <i className="like_icon"></i>
                    <span>Like</span>
                </div>
                <div className="post_action hover1">
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
                <CreateComment user={user} />
            </div>
            {showMenu && <PostMenu setShowMenu={setShowMenu} userId={user?._id} postUserId={post?.user._id} imagesLength={post?.images?.length} />}
        </div>
    )
}

export default SinglePost