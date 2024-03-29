import React, { useEffect } from 'react'
import LeftSide from '../../components/chats/LeftSide'
import RightSide from '../../components/chats/RightSide'
import Header from '../../components/header/Header'
import "./chat.css"
import { useDispatch, useSelector } from 'react-redux';
import { addToOnlineList, makeOnlineChatUser } from '../../redux/messageSlicer'
const Chat = ({ socket }) => {
    const { chatUsers } = useSelector(store => store.messages)
    const { loggedUser } = useSelector(store => store.currentUser)
    const dispatch = useDispatch()
    useEffect(() => {
        chatUsers.map(usr => (
            socket?.emit("addOnlineList", { target: usr._id, me: loggedUser._id })
        ))
    }, [chatUsers, loggedUser, socket])
    useEffect(() => {
        socket?.off("addOnlineListToClient").on("addOnlineListToClient", id => {
            dispatch(addToOnlineList(id))
            dispatch(makeOnlineChatUser(id))
        })

    }, [dispatch, socket])
    return (
        <div className='chats'>
            <Header page="chat" />
            <div className="message d-flex">
                <div className="col-md-4 border-right px-0">
                    <LeftSide socket={socket} />
                </div>

                <div className="col-md-4 px-0">
                    <div className='d-flex justify-content-center flex-column align-items-center h-100'>
                        <i className="fab fa-facebook-messenger text-primary" style={{ fontSize: "3rem" }}></i>
                        <h4>Conversations</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat