import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { AiOutlineLike, AiFillLike } from "react-icons/ai"
import { BsReplyFill, BsReply } from "react-icons/bs"
const CommentCard = ({ comment }) => {
    return (
        <div className='comment_card'>
            <div className='comment'>
                <Link to={`/profile/${comment?.commentBy.username}`}>
                    <img className='comment_img' src={comment?.commentBy.picture} alt="" />
                </Link>
                <div className="comment_col">
                    <div className="comment_wrap">
                        <div className="comment_name">
                            {comment?.commentBy.first_name}{" "}{comment?.commentBy.last_name}
                        </div>
                        <div className="comment_text">
                            {comment?.comment}
                        </div>
                    </div>
                    {comment?.image &&
                        <img src={comment?.image} alt="" className='comment_image' />
                    }
                    <div className="comment_actions">
                        <span className='comment_like'>
                            <AiOutlineLike size={20} />
                        </span>
                        <span className='comment_reply'>
                            <BsReply size={20} />
                        </span>
                        <span className='comment_moment'>
                            <Moment fromNow interval={30}>
                                {comment?.createdAt}
                            </Moment>
                        </span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CommentCard

/* <div className='comment'>
            <img className='comment_img' src={com?.commentBy.picture} alt="" />
            <div className="comment_col">
                <div className="comment_wrap">
                    <div className="comment_name">
                        {com?.commentBy.first_name}{" "}{com?.commentBy.last_name}
                    </div>
                    <div className="comment_text">
                        {com?.comment}
                    </div>
                </div>
                {com?.image &&
                    <img src={com?.image} alt="" className='comment_image' />
                }
                <div className="comment_actions">
                    <span>Like</span>
                    <span>Reply</span>
                    <span>
                        <Moment fromNow interval={30}>
                            {com?.createdAt}
                        </Moment>
                    </span>
                </div>

            </div>
        </div> */