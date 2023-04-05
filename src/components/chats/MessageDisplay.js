import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../axios';
import { deleteAMessage } from '../../redux/messageSlicer';

const MessageDisplay = ({ user, msg, delMesgSocketFunc, readMesgSocketFunc }) => {
    const { loggedUser, } = useSelector(store => store.currentUser)
    const { onlineUsers } = useSelector(store => store.messages)
    const dispatch = useDispatch()
    //console.log(msg)
    const deleteMessage = async (msg1) => {
        //console.log(msg1.recipient._id);
        await axios.delete(`/chats/delete/${msg1._id}`)
        dispatch(deleteAMessage(msg._id))
        delMesgSocketFunc("deleteAMessageSocket", msg1)
    }

    return (
        <>
            <div className="chat_title">
                <img src={user?.picture} alt="avatar" className="medium-avatar" />
                <span>{user?.first_name}</span>
            </div>
            <div className="your_content">
                {user?._id === loggedUser._id && <i className="fas fa-trash text-danger"
                    onClick={() => deleteMessage(msg)}></i>}
                <div>
                    {msg?.chatMessage && <div className="chat_text">
                        <div>
                            {msg?.chatMessage}
                        </div>
                        <div className="time_box text-muted">
                            <small>{new Date(msg?.createdAt).toLocaleTimeString()}</small>
                            {
                                user?._id === loggedUser?._id &&
                                (msg?.recipient.isOnline ?
                                    <>
                                        <i style={{ color: !msg?.isRead ? "gray" : "teal", marginLeft: "4px" }} className="fa-solid fa-check"></i>
                                        <i style={{ color: !msg?.isRead ? "gray" : "teal", marginLeft: "-6px" }} className="fa-solid fa-check"></i>
                                    </>
                                    :
                                    <i style={{ color: "gray", marginLeft: "4px" }} className="fa-solid fa-check"></i>)

                            }
                        </div>
                    </div>}

                </div>

            </div>
        </>
    )
}

export default MessageDisplay