import React, { useEffect } from 'react'
import Header from './../../components/header/Header';
import "./notifications.css"
import { useDispatch, useSelector } from 'react-redux';
import { unReadCount } from '../../redux/notificationSlice';


const Notifications = () => {
    const { notifications, unRead } = useSelector(store => store.notifications)
    const dispatch = useDispatch()
    console.log(unRead)
    useEffect(() => {
        dispatch(unReadCount())
    }, [dispatch, notifications])
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
                        Middle
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