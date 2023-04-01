import React, { useState, useEffect } from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { AiOutlineLike, AiFillLike } from "react-icons/ai"
import { BsReplyFill, BsReply } from "react-icons/bs"
import { RiDeleteBin5Line } from "react-icons/ri"
import { deleteComment, likeUnlikeComment } from '../../../services/CommentServices'
import { useSelector, useDispatch } from 'react-redux';
import CreateComment from './CreateComment'
import Dots from '../../../svg/dots'
import { deleteCommentRedux } from '../../../redux/commentsSlice'
const CommentCard = ({ comment, commentId, user, commentPost, children, showReplies, setShowReplies, item, tag, socket }) => {
    const { loggedUser } = useSelector(store => store.currentUser)
    const [isLiked, setIsLiked] = useState(false)
    const [onReply, setOnReply] = useState(false)
    const [deleteMenu, setDeleteMenu] = useState(false)
    const [commentLikes, setCommentLikes] = useState(comment.likes.length)
    const color = "#65676b"
    const dispatch = useDispatch()
    useEffect(() => {
        setIsLiked(comment?.likes?.includes(loggedUser._id))
    }, [comment?.likes, loggedUser])

    //SOCKET IMP
    useEffect(() => {
        socket?.off("likeCommentToClient").on("likeCommentToClient", (payload) => {
            if (payload.comId === comment._id) {
                console.log(payload)
                //setIsLiked(!isLiked)
                setCommentLikes(payload.likes)
            }
        })
    }, [comment._id, isLiked, socket, loggedUser])

    const handleLikeComment = async () => {
        await likeUnlikeComment(comment._id)
        setIsLiked(!isLiked)
        setCommentLikes(prev => isLiked ? prev -= 1 : prev += 1)
        socket?.emit("likeComment", { likes: isLiked ? commentLikes - 1 : commentLikes + 1, comId: comment._id, id: loggedUser._id })
    }
    //SOCKET IMP
    useEffect(() => {
        socket.on("deleteCommentToClient", (payload) => {
            dispatch(deleteCommentRedux(payload.comId))
        })

        return () => socket?.off("deleteCommentToClient")
    }, [socket, dispatch])
    const handleDeleteComment = async () => {
        await deleteComment(comment._id)
        dispatch(deleteCommentRedux(comment._id))
        socket?.emit("deleteComment", { comId: comment._id, id: loggedUser._id })
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
                            {(tag) ?
                                <>
                                    <Link to={`profile/${tag.username}`}
                                        style={{ color: "#1876f2", marginRight: "5px", textTransform: "capitalize" }}>
                                        @{tag.first_name}:
                                    </Link>
                                    <span>{comment?.comment}</span>
                                </>
                                :
                                comment?.comment
                            }
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

                                    <span className='comment_reply' onClick={handleReplyComment}>
                                        {onReply ? <BsReplyFill fill="#1876f2" size={20} /> : <BsReply size={20} />}
                                        {onReply ? "cancel" : "reply"}
                                    </span>
                                {item && <small style={{ textTransform: "uppercase", color: showReplies ? "crimson" : "#1876f2", cursor: "pointer" }} className="font-weight-bold mx-2"
                                    onClick={() => setShowReplies(!showReplies)}
                                >{showReplies ? "hide" : "replies..."}</small>}
                        </div>

                        {comment.commentBy._id === user._id &&
                            <div className="comment_card_delete" onClick={() => setDeleteMenu(prev => !prev)}>
                                <div className="contact_circle">
                                    <Dots color={color} />
                                </div>
                            </div>}
                        {deleteMenu &&
                            <div className="post_menu hover1"
                                onClick={handleDeleteComment}>
                                <RiDeleteBin5Line size={15} />
                                <span>Delete</span>
                            </div>}
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


