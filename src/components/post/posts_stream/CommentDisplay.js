import React, { useState } from 'react'
import CommentCard from './CommentCard'

const CommentDisplay = ({ comment, user, commentPost, commentReplies, showReplies, setShowReplies, socket, setNot, setNotReview }) => {

    return (
        <CommentCard
            comment={comment}
            commentId={comment._id}
            user={user}
            commentPost={commentPost}
            showReplies={showReplies}
            setShowReplies={setShowReplies}
            item={commentReplies.length > 0}
            socket={socket}
            setNot={setNot}
            setNotReview={setNotReview}
        >
            <div className="replay-message">
                {
                    commentReplies.map((item, i) => (
                        showReplies && <CommentCard key={i} comment={item} commentId={comment._id} user={user}
                            commentPost={commentPost} tag={item?.tag} socket={socket} />
                    ))
                }
            </div>
        </CommentCard> 
    )
}

export default CommentDisplay