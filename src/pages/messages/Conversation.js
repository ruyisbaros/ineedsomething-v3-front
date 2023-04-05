import React, { useState, useEffect, useCallback } from 'react'
import LeftSide from '../../components/chats/LeftSide'
import RightSide from '../../components/chats/RightSide'
import Header from '../../components/header/Header'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { readMessageRedux } from '../../redux/messageSlicer';
import axios from '../../axios';

const Conversation = ({ socket }) => {
    const { chatUsers } = useSelector(store => store.messages)
    const { loggedUser } = useSelector(store => store.currentUser)
    const dispatch = useDispatch()
    const { id } = useParams()

    const [user, setUser] = useState("")

    const makeMessagesRead = useCallback(async () => {
        await axios.get(`/chats/read/${loggedUser?._id}`)
        //console.log(data)
        dispatch(readMessageRedux(loggedUser?._id))
        socket?.emit("makeMessageRead", loggedUser?._id)
    }, [dispatch, loggedUser, socket])

    useEffect(() => {
        makeMessagesRead()
    }, [makeMessagesRead])

    useEffect(() => {
        const newUser = chatUsers?.find(user => user._id === id)
        if (newUser) {
            setUser(newUser)
        }
        //console.log(newUser);
    }, [id, chatUsers])

    //receive emitted new message
    useEffect(() => {
        socket?.on("makeMessageReadToClient", id => {
            dispatch(readMessageRedux(id))
        })

        return () => socket?.off("newMessageToClient")
    })

    return (
        <div className='chats'>
            <Header page="chat" />
            <div className="message d-flex">
                <div className="col-md-4 border-right px-0">
                    <LeftSide socket={socket} />
                </div>
                <div className="col-md-8 px-0">
                    <RightSide user={user} socket={socket} paramId={id} />
                </div>
            </div>
        </div>
    )
}

export default Conversation