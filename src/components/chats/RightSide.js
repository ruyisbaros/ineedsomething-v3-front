import React, { useRef, useState, useEffect, useCallback } from 'react'
import axios from '../../axios'
import UserCard from '../userCard/UserCard'
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToData, closeTyping, createSingleChat, deleteAMessage, deleteFullConversation, getBetweenChats, openTyping } from '../../redux/messageSlicer';
import MessageDisplay from './MessageDisplay';
import Icons from './../Icons';
import { AiOutlineSend } from "react-icons/ai"

const RightSide = ({ user, socket }) => {
    const { loggedUser } = useSelector(store => store.currentUser)
    const { data, isTyping, typingTo, chatUsers } = useSelector(store => store.messages)
    const { id } = useParams()
    //console.log(id)
    //console.log(id, data)
    const dispatch = useDispatch()
    const displayRef = useRef()
    const typeRef = useRef()
    const sendBtn = useRef()
    const navigate = useNavigate()

    const [chatMessage, setChatMessage] = useState("")
    const [images, setImages] = useState([])

    const getMessages = useCallback(async () => {
        const { data } = await axios.get(`/chats/between/${id}`)
        //console.log(data)
        dispatch(getBetweenChats(data))
        setTimeout(() => {
            displayRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
        }, 50)
    }, [dispatch, id])
    useEffect(() => {
        if (id) {
            getMessages()
        }
    }, [getMessages, id])

    const deleteConversation = async () => {
        //console.log(user);
        await axios.delete(`/chats/conversation/${user._id}`)
        dispatch(deleteFullConversation(user._id))
        navigate("/chat")
    }
    const chatSubmit = async (e) => {
        e.preventDefault()
        let message = {
            sender: loggedUser._id,
            recipient: id,
            chatMessage,
            images: images
        }

        const { data } = await axios.post("/chats/new", { ...message })
        //console.log(data);
        // setMsgData(data)
        dispatch(createSingleChat(data))
        dispatch(addToData(data))
        setChatMessage("")
        setImages([])
        const { _id, picture, first_name, username } = loggedUser
        socket?.emit("newMessage", { data, user: { _id, picture, first_name, username } })
        socket?.emit("closeTyping", user._id)

    }
    const textMessage = (e) => {
        setChatMessage(e.target.value)
        socket?.emit("openTyping", { id, id2: loggedUser._id })

    }
    useEffect(() => {
        setTimeout(() => {
            displayRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
        }, 50)
    }, [isTyping])


    /*------------ CHATS-------- */
    //receive emitted new message
    useEffect(() => {
        socket?.on("newMessageToClient", newMessage => {
            console.log(newMessage);
            if (id === newMessage.sender._id) {
                dispatch(createSingleChat(newMessage))
                dispatch(addToData(newMessage))
            }
        })

        return () => socket?.off("newMessageToClient")
    })

    //receive emitted delete message
    useEffect(() => {
        socket?.on("deleteAMessageToClient", id => {
            //console.log(newMessage);
            dispatch(deleteAMessage(id))
        })

        return () => socket?.off("deleteAMessageToClient")
    })

    //receive emitted typing message
    useEffect(() => {
        socket?.on("openTypingToClient", (typeTo) => {
            //console.log(newMessage);
            dispatch(openTyping(typeTo))
            //console.log(typeTo);
        })

        return () => socket?.off("openTypingToClient")
    })

    //receive emitted stop typing message
    useEffect(() => {
        socket?.on("closeTypingToClient", () => {
            //console.log(newMessage);
            dispatch(closeTyping())
        })

        return () => socket?.off("closeTypingToClient")
    })
    const delMesgSocketFunc = (em, con) => {
        socket?.emit(em, con)
    }
    return (
        <>
            <div className='message_header'>
                {user && <UserCard user={user}>
                    <i className="fas fa-trash text-danger cursor-pointer"
                        onClick={deleteConversation}></i>
                </UserCard>}
            </div>

            <div className="chat_container" style={{ height: images.length === 0 ? "calc(100% - 110px)" : "calc(100% - 180px)" }}>
                <div className="chat_display" ref={displayRef}>
                    {
                        data?.map((msg, i) => (
                            <div key={i}>
                                {msg.sender._id !== loggedUser._id &&
                                    <div className="chat-row other_message">
                                        <MessageDisplay user={user} msg={msg} delMesgSocketFunc={delMesgSocketFunc} />
                                    </div>}
                                {msg.sender._id === loggedUser._id &&
                                    <div className="chat-row your_message">
                                        <MessageDisplay user={loggedUser} msg={msg} delMesgSocketFunc={delMesgSocketFunc} />
                                    </div>}
                            </div>
                        ))
                    }

                    {isTyping && id === typingTo && <span ref={typeRef} id="isTyping">{`${user.username} is typing `} <span>...</span></span>}
                </div>
            </div>
            <form className='chat_input' onSubmit={chatSubmit}>
                <input type="text" placeholder="Enter your message..."
                    value={chatMessage} onChange={textMessage} />
                <Icons setContent={setChatMessage} content={chatMessage} />
                <button ref={sendBtn} className="material-icons" type="submit" disabled={(chatMessage || images.length > 0) ? false : true}>
                    <AiOutlineSend color={chatMessage && "teal"} />
                </button>
            </form>
        </>
    )
}

export default RightSide