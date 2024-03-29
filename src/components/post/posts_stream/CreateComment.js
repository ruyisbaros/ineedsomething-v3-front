import React, { useState, useEffect, useRef } from 'react'
import { useOutsideClick } from './../../../utils/helpers';
import Picker from "emoji-picker-react"
import { addComment } from './../../../services/CommentServices';
import { RingLoader } from "react-spinners"
import { useDispatch, useSelector } from 'react-redux';
import { addCommentRedux } from '../../../redux/commentsSlice';
import { Link } from 'react-router-dom';
import { createNotify } from '../../../services/NotificationService';
import { addNotifyRedux } from '../../../redux/notificationSlice';

const CreateComment = ({ user, commentPost, setShowComment, replyCom, setOnReply, replyTo, commentId, setShowReplies, socket, setNot, setNotReview, post }) => {
    const { loggedUser } = useSelector(store => store.currentUser)
    const [picker, setPicker] = useState(false)
    const [loading, setLoading] = useState(false)
    const [cursorPosition, setCursorPosition] = useState()
    const [comment, setComment] = useState("")
    const [error, setError] = useState(false)
    const [commentImage, setCommentImage] = useState(null)
    const commentRef = useRef(null)
    const emojiBox = useRef(null)
    const cameraBox = useRef(null)
    const dispatch = useDispatch()
    useEffect(() => {
        commentRef.current.selectionEnd = cursorPosition
    }, [cursorPosition, commentRef])

    const handleEmoji = ({ emoji }) => {
        const ref = commentRef.current
        ref.focus()
        const start = comment.substring(0, ref.selectionStart)
        const end = comment.substring(ref.selectionStart)
        const newText = start + emoji + end
        setComment(newText)
        setCursorPosition(start.length + emoji.length)
    }

    const handleImage = (e) => {
        let file = e.target.files[0]
        if (file.type !== "image/jpeg" &&
            file.type !== "image/png" &&
            file.type !== "image/gif" &&
            file.type !== "image/webp") {
            setError("Unexpected file format! Only jpeg, gif, png, webp files allowed")
            return;
        } else if (file.size > 1024 * 1024) {
            setError("Too large file! Max 1mb files allowed")
            return;
        }
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            setCommentImage(e.target.result)
        }
    }
    const createNotification = async (ntfy) => {
        const not = await createNotify(ntfy)
        dispatch(addNotifyRedux(not))
        //socket
        not && socket?.emit("commentNotification", { not, id: loggedUser._id })
    }
    //SOCKET IMP
    useEffect(() => {
        socket?.off("commentNotificationToClient").on("commentNotificationToClient", (payload) => {
            if (payload.id !== loggedUser._id) {
                dispatch(addNotifyRedux(payload.not))
                console.log(payload)
                setNot(payload.not)
                setNotReview(true)
                setTimeout(() => {
                    setNotReview(false)
                }, 5000)
            }
        })
    }, [socket, loggedUser, dispatch])
    useEffect(() => {
        socket?.off("addCommentToClient").on("addCommentToClient", (payload) => {
            dispatch(addCommentRedux(payload?.comment))
        })
    }, [socket, dispatch])

    useEffect(() => {
        if (replyCom) {
            socket?.off("replyCommentToClient").on("replyCommentToClient", (payload) => {
                dispatch(addCommentRedux(payload?.comment))
            })
        }
    }, [socket, dispatch, replyCom])

    const handleAddComment = async (e) => {
        if (e.key === "Enter") {
            if (commentImage) {
                const path = `iNeedSomething/${user.email}/commentImages`
                const res = await addComment(comment, commentImage, path, commentPost, null, null, setLoading)
                //console.log(res)
                dispatch(addCommentRedux(res?.comment))
                setShowComment(true)
                socket?.emit("addComment", { comment: res?.comment, id: loggedUser._id })

                setComment("")
                setCommentImage(null)
            } else {
                const res = await addComment(comment, null, null, commentPost, null, null, setLoading)
                //console.log(res)
                dispatch(addCommentRedux(res?.comment))
                setShowComment(true)
                socket?.emit("addComment", { comment: res?.comment, id: loggedUser._id })
                setComment("")
            }
            const notify = {
                from: loggedUser._id,
                to: post?.user._id,
                content: `${loggedUser.first_name} commented your post`,
            }
            loggedUser._id !== post.user._id && createNotification(notify)
        }

    }
    const handleReplyComment = async (e) => {
        if (e.key === "Enter") {
            if (commentImage) {
                const path = `iNeedSomething/${user.email}/commentImages`
                const res = await addComment(comment, commentImage, path, commentPost, commentId, replyTo.username !== user.username ? replyTo : null, setLoading)
                //console.log(res)
                dispatch(addCommentRedux(res?.comment))
                setOnReply(false)
                setShowReplies(true)
                socket?.emit("replyComment", { comment: res?.comment, id: loggedUser._id })
                setComment("")
                setCommentImage(null)
            } else {
                const res = await addComment(comment, null, null, commentPost, commentId, replyTo.username !== user.username ? replyTo : null, setLoading)
                console.log(res.comment)
                dispatch(addCommentRedux(res?.comment))
                setOnReply(false)
                setShowReplies(true)
                socket?.emit("replyComment", { comment: res?.comment, id: loggedUser._id })
                setComment("")
            }
            const notify = {
                from: loggedUser._id,
                to: post?.user._id,
                content: `${loggedUser.first_name} replied your comment`,
            }
            replyTo.username !== user.username && createNotification(notify)
        }

    }

    useOutsideClick(emojiBox, () => {
        setPicker(false)
    })

    return (
        <div className='create_comment_wrap'>
            <div className="create_comment">
                <img src={user?.picture} alt="" />
                <div ref={emojiBox} className="comment_input_wrap">
                    {picker &&
                        <div className='comment_emoji_picker'>
                            <Picker onEmojiClick={handleEmoji} />
                        </div>}
                    <input
                        type="file"
                        hidden
                        accept='image/jpeg,image/png,image/gif,image/webp'
                        ref={cameraBox}
                        onChange={handleImage}
                    />
                    {error && <div className="postError comment_error">
                        <div className="postError_error">{error}</div>
                        <div className="blue_btn" onClick={() => setError("")}>Try Again</div>
                    </div>}
                    {replyCom && replyTo.username !== user.username &&
                        <Link to={`/profile/${replyTo.username}`}>
                            <span style={{ color: "#1876f2", textTransform: "capitalize" }}>@{replyTo.first_name}</span>
                        </Link>
                    }
                    <input
                        type="text"
                        ref={commentRef}
                        placeholder={replyCom ? "Reply comment..." : "Write a comment..."}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        onKeyUp={(e) => {
                            replyCom ? handleReplyComment(e) :
                                handleAddComment(e)
                        }}
                    />
                    <div className="comment_circle">
                        <RingLoader size={20} color="#1876f2" loading={loading} />
                    </div>
                    <div className="comment_circle_icon hover2">
                        <i className="emoji_icon" onClick={() => setPicker((prev) => !prev)}></i>
                    </div>
                    <div className="comment_circle_icon hover2" onClick={() => {
                        cameraBox.current.click()
                    }}>
                        <i className="camera_icon"></i>
                    </div>
                    <div className="comment_circle_icon hover2">
                        <i className="gif_icon"></i>
                    </div>
                    <div className="comment_circle_icon hover2">
                        <i className="sticker_icon"></i>
                    </div>
                </div>
            </div>
            {commentImage && <div className='comment_img_preview'>
                <img src={commentImage} alt="" />
                <div className="small_white_circle" onClick={() => setCommentImage(null)}>
                    <i className="exit_icon"></i>
                </div>
            </div>}

        </div>
    )
}

export default CreateComment