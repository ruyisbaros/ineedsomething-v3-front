import React, { useState } from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { viewNotify, deleteNotify } from '../../services/NotificationService'
import { Dots } from '../../svg'
import { cloneDeep } from 'lodash';
import { useDispatch } from 'react-redux';
import { deleteNotifyRedux, updateNotifyRedux } from '../../redux/notificationSlice'

const NotificationComp = ({ _id, content, createdAt, from, read, notifies, setNotifies }) => {
    const [showMenu, setShowMenu] = useState(false)
    const dispatch = useDispatch()
    const handleView = async () => {
        await viewNotify(_id)
        //dispatch(updateNotifyRedux(_id))
        let copyArray = cloneDeep(notifies)
        const index = copyArray.findIndex(n => n._id === _id)
        copyArray[index].read = true
        setNotifies(copyArray)
    }
    const handleDelete = async () => {
        await deleteNotify(_id)
        dispatch(deleteNotifyRedux(_id))
        setShowMenu(false)
    }
    return (
        <div className='nots hover1'
            style={{ background: read === false ? "#d4e9fd" : "inherit" }}
            onClick={handleView}
        >
            {showMenu && <div className="notification_delete" onClick={handleDelete}>
                <i className="trash_icon"></i>
                <span>Delete</span>
            </div>}
            <Link to={`/profile/${from?.username}`}>
                <img src={from?.picture} alt="" className="nots_img" />
            </Link>
            <div className="nots_name">
                {content}
            </div>
            <div className="nots_right">
                <div className='nots_date'>
                    <Moment fromNow interval={30}>
                        {createdAt}
                    </Moment>
                </div>
                <div className='nots_dots' onClick={() => setShowMenu(prev => !prev)}>
                    <Dots color="#65676b" />
                </div>
            </div>
        </div>
    )
}

export default NotificationComp