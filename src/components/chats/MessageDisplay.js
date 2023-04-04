import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../axios';
import { deleteAMessage } from '../../redux/messageSlicer';

const MessageDisplay = ({ user, msg, socket }) => {
    const { loggedUser, } = useSelector(store => store.currentUser)
    const { isTyping, isRead } = useSelector(store => store.messages)
    const dispatch = useDispatch()

    const deleteMessage = async () => {
        console.log(msg);
        await axios.delete(`/chats/delete/${msg._id}`)
        dispatch(deleteAMessage(msg._id))
        //socket.emit("deleteAMessage", msg)
    }
    return (
        <>
            <div className="chat_title">
                <img src={user?.picture} alt="avatar" className="medium-avatar" />
                <span>{user?.first_name}</span>
            </div>
            <div className="your_content">
                {user?._id === loggedUser._id && <i className="fas fa-trash text-danger" onClick={deleteMessage}></i>}
                <div>
                    {msg?.chatMessage && <div className="chat_text">
                        <div>
                            {msg?.chatMessage}
                        </div>
                        <div className="time_box text-muted">
                            <small>{new Date(msg?.createdAt).toLocaleTimeString()}</small>
                            {user === loggedUser && <i style={{ color: isRead ? "teal" : "gray", marginLeft: "4px" }} className="fa-solid fa-check"></i>}
                            {user === loggedUser && <i style={{ color: isRead ? "teal" : "gray", marginLeft: "-6px" }} className="fa-solid fa-check"></i>}
                        </div>
                    </div>}
                    {
                        msg?.images?.map((img, index) => (
                            <div key={index} className="container_img">
                                <img src={img.url} alt="" />
                            </div>
                        ))
                    }
                </div>

            </div>
        </>
    )
}

export default MessageDisplay