import React, { useState, useRef } from 'react'
import PostMenuItem from './PostMenuItem'
import { useOutsideClick } from './../../../utils/helpers';
import { savePost } from '../../../services/PostServices';
import { saveAs } from 'file-saver';
import { deletePost } from './../../../services/PostServices';
import { useDispatch } from 'react-redux';
import { removePostRedux } from '../../../redux/postsSlicer';
import { removeFromProfilePosts } from '../../../redux/profileSlicer';

const PostMenu = ({ setIsSaved, user, post, isSaved, profile }) => {
    const [test, setTest] = useState(user?._id === post?.user._id ? true : false)
    const menuRef = useRef(null)
    const dispatch = useDispatch()

    const savePostHandler = async () => {
        const res = await savePost(post?._id)
        if (isSaved) {
            setIsSaved(false)
        } else {
            setIsSaved(true)
        }
        console.log(res)
    }
    const downloadImage = async () => {
        post.images.map((img, i) => (
            saveAs(img, "image")
        ))
    }

    const removePost = async () => {
        await deletePost(post?._id, user.email)
        if (profile) {
            dispatch(removeFromProfilePosts(post?._id))
        } else {
            dispatch(removePostRedux(post?._id))
        }
    }
    return (
        <ul className='post_menu' ref={menuRef}>
            {test && <PostMenuItem icon="pin_icon" title="Pin Post" />}
            {isSaved ?
                <PostMenuItem icon="save_icon" title="Un save Post" subtitle="Remove this from your saved items" itemFunc={savePostHandler} />
                :
                <PostMenuItem icon="save_icon" title="Save Post" subtitle="Add this to your saved items" itemFunc={savePostHandler} />
            }
            <div className="line"></div>
            {test && <PostMenuItem icon="edit_icon" title="Edit Post" />}
            {post?.images.length && <PostMenuItem icon="download_icon" title="Download"
                itemFunc={downloadImage} />}
            {post?.images.length && <PostMenuItem icon="fullscreen_icon" title="See Fullscreen" />}
            {post?.images.length && <div className="line"></div>}
            {!test && <PostMenuItem icon="turnOnNotification_icon" title="Turn on notification" />}
            {test && <PostMenuItem img="../../../icons/lock.png" title="Edit Audience" />}
            {test && <PostMenuItem icon="turnOffNotifications_icon" title="Turn off notifications for this post" />}
            {test && <PostMenuItem icon="delete_icon" title="Turn off translations" />}
            {test && <PostMenuItem icon="date_icon" title="Edit Date" />}
            {test && <PostMenuItem icon="refresh_icon" title="Refresh share attachment" />}
            {test && <PostMenuItem icon="archive_icon" title="Move to archive" />}
            {test && <PostMenuItem icon="trash_icon" title="Move to trash" subtitle="Items in your trash are deleted after 30 days" itemFunc={removePost} />}
            {!test && <PostMenuItem img="../../../icons/report.png" title="Report Post" subtitle="I'm concerned about this post" />}
        </ul>
    )
}

export default PostMenu