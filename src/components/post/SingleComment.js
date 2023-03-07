import React from 'react'
import Moment from 'react-moment'

const SingleComment = ({ com }) => {
    return (
        <div className='comment'>
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
        </div>
    )
}

export default SingleComment