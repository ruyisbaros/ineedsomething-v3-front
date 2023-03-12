import React, { useEffect, useState } from 'react'
import Header from './../../components/header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { unReadCount } from '../../redux/notificationSlice';
import NotificationComp from '../../components/notifications/NotificationComp';
import { fetchNotificationsThunk } from '../../services/NotificationService';
import "./notifications.css"

const Notifications = () => {
    const { notifications, unRead } = useSelector(store => store.notifications)
    const dispatch = useDispatch()
    //console.log(notifications)
    const [notifies, setNotifies] = useState([])

    useEffect(() => {
        setNotifies(notifications)
    }, [notifications])

    useEffect(() => {
        dispatch(unReadCount())
    }, [dispatch, notifications])

    useEffect(() => {
        dispatch(fetchNotificationsThunk())
    }, [dispatch])
    return (
        <div className='notifications'>
            <Header page="notification" />
            <div className="notifications_wrap">
                <div className="notifications_left">
                    <div className="notifications_left_content">
                        Coming soon! in development
                    </div>
                </div>
                <div className="notifications_middle">

                    <div className="notifications_middle_content">
                        {notifies.length > 0 &&
                            notifies.map(nots => (
                                <NotificationComp key={nots._id} {...nots} notifies={notifies} setNotifies={setNotifies} />
                            ))
                        }
                    </div>
                </div>
                <div className="notifications_right">
                    <div className="notifications_right_content">
                        Coming soon! in development
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notifications