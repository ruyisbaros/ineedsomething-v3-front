import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

//import { useDispatch, useSelector } from 'react-redux';
//import axios from 'axios';
//import { profileFailure, profileStart, profileSuccess } from '../../redux/profileSlicer';
import Avatar from './../Avatar';

const UserCard = ({ children, user, border, handleClose, msg }) => {

    const { data } = useSelector(store => store.messages)
    const [chatBox, setChatBox] = useState([])

    useEffect(() => {
        data.forEach(chat => {
            if (chat.sender._id === user._id) {
                setChatBox(prev => [...prev, chat])
            }
        })

    }, [data, user._id])

    console.log(chatBox);
    //console.log(chatBox[chatBox.length - 1].sender);
    return (
        <div className={`d-flex p-2 align-items-center justify-content-between w-100 ${border}`}>
            <div>
                <div className="d-flex align-item-center">
                    <img src={user?.picture} alt="avatar" className="medium-avatar" />
                    <div className="ml-3">
                        <span className="d-block" style={{ color: "#1876f2" }}>{user?.username}</span>
                        {chatBox.length > 0
                            ? <small style={{ opacity: "0.6" }}>{chatBox[chatBox.length - 1].chatMessage}</small>
                            : <small style={{ opacity: "0.6", textTransform: "capitalize" }}>{user?.first_name}{" "}{user?.last_name}</small>
                        }
                    </div>
                </div>
            </div>
            {children}
        </div>
    )
}

export default UserCard
