import React, { useState, useEffect } from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { AiOutlineLike, AiFillLike } from "react-icons/ai"
import { BsReplyFill, BsReply } from "react-icons/bs"
import { likeUnlikeComment } from '../../../services/CommentServices'
import { useSelector } from 'react-redux';
import CreateComment from './CreateComment'
const CommentCard = ({ comment, commentId, user, commentPost, children, showReplies, setShowReplies, item }) => {
    const { loggedUser } = useSelector(store => store.currentUser)
    const [isLiked, setIsLiked] = useState(false)
    const [onReply, setOnReply] = useState(false)
    const [commentLikes, setCommentLikes] = useState(comment.likes.length)

    useEffect(() => {
        setIsLiked(comment?.likes?.includes(loggedUser._id))
    }, [comment?.likes, loggedUser])

    const handleLikeComment = async () => {
        await likeUnlikeComment(comment._id)
        setIsLiked(!isLiked)
        //console.log(comment.likes.includes(loggedUser._id))
        setCommentLikes(prev => isLiked ? prev -= 1 : prev += 1)
    }

    const handleReplyComment = async () => {
        setOnReply(!onReply)
    }

    return (
        <div className='comment_card'>
            <div className='comment'>
                <Link to={`/profile/${comment?.commentBy.username}`}>
                    <img className='comment_img' src={comment?.commentBy.picture} alt="" />
                </Link>
                <div className="comment_col">
                    <div className="comment_wrap">
                        <div className="comment_name">
                            <span >{comment?.commentBy.first_name}{" "}{comment?.commentBy.last_name}</span>
                            <span className='comment_moment'>
                                <Moment fromNow interval={30}>
                                    {comment?.createdAt}
                                </Moment>
                            </span>
                        </div>
                        <div className="comment_text">
                            {comment?.comment}
                        </div>

                    {comment?.image &&
                        <img src={comment?.image} alt="" className='comment_image' />
                    }
                        {
                            !comment.reply &&
                            <div className="comment_actions">
                                <span className='comment_like'
                                onClick={handleLikeComment}>
                                {isLiked ? <AiFillLike size={20} fill="#1876f2" /> : <AiOutlineLike size={20} />}
                                <span>{commentLikes} </span>
                                    </span>

                                    <span className='comment_reply' onClick={handleReplyComment}>
                                        {onReply ? <BsReplyFill fill="#1876f2" size={20} /> : <BsReply size={20} />}
                                        {onReply ? "cancel" : "reply"}
                                    </span>
                                {item && <small style={{ textTransform: "uppercase", color: showReplies ? "crimson" : "#1876f2", cursor: "pointer" }} className="font-weight-bold mx-2"
                                    onClick={() => setShowReplies(!showReplies)}
                                >{showReplies ? "hide" : "replies..."}</small>}
                            </div>
                        }


                    </div>
                    {children}
                    <div className='create_comment_reply'>
                        {
                            onReply && <CreateComment commentId={commentId} replyTo={comment?.commentBy} replyCom user={user} commentPost={commentPost}
                                setOnReply={setOnReply} setShowReplies={setShowReplies} />
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CommentCard


