import React, { useState, useRef } from 'react'
import PostMenuItem from './PostMenuItem'
import { useOutsideClick } from './../../../utils/helpers';

const PostMenu = ({ postUserId, userId, imagesLength, setShowMenu }) => {
    const [test, setTest] = useState(userId === postUserId ? true : false)
    const menuRef = useRef(null)


    return (
        <ul className='post_menu' ref={menuRef}>
            {test && <PostMenuItem icon="pin_icon" title="Pin Post" />}
            <PostMenuItem icon="save_icon" title="Save Post" subtitle="Add this to your saved items" />
            <div className="line"></div>
            {test && <PostMenuItem icon="edit_icon" title="Edit Post" />}
            {imagesLength && <PostMenuItem icon="download_icon" title="Download" />}
            {imagesLength && <PostMenuItem icon="fullscreen_icon" title="See Fullscreen" />}
            {imagesLength && <div className="line"></div>}
            {!test && <PostMenuItem icon="turnOnNotification_icon" title="Turn on notification" />}
            {test && <PostMenuItem img="../../../icons/lock.png" title="Edit Audience" />}
            {test && <PostMenuItem icon="turnOffNotifications_icon" title="Turn off notifications for this post" />}
            {test && <PostMenuItem icon="delete_icon" title="Turn off translations" />}
            {test && <PostMenuItem icon="date_icon" title="Edit Date" />}
            {test && <PostMenuItem icon="refresh_icon" title="Refresh share attachment" />}
            {test && <PostMenuItem icon="archive_icon" title="Move to archive" />}
            {test && <PostMenuItem icon="trash_icon" title="Move to trash" subtitle="Items in your trash are deleted after 30 days" />}
            {!test && <PostMenuItem img="../../../icons/report.png" title="Report Post" subtitle="I'm concerned about this post" />}
        </ul>
    )
}

export default PostMenu