import React, { useState, useEffect } from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { AiOutlineLike, AiFillLike } from "react-icons/ai"
import { BsReplyFill, BsReply } from "react-icons/bs"
import { likeUnlikeComment } from '../../../services/CommentServices'
import { useSelector } from 'react-redux';
const CommentCard = ({ comment }) => {
    const { loggedUser } = useSelector(store => store.currentUser)
    const [isLiked, setIsLiked] = useState(false)
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
                    <div className="comment_actions">
                            <span className='comment_like'
                                onClick={handleLikeComment}>
                                {isLiked ? <AiFillLike size={20} fill="#1876f2" /> : <AiOutlineLike size={20} />}
                                <span>{commentLikes} </span>
                        </span>
                        <span className='comment_reply'>
                                <BsReply size={20} /> reply
                        </span>

                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentCard


