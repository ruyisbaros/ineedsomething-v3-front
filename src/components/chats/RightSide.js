import React, { useRef, useState, useEffect } from 'react'
import axios from '../../axios'
import UserCard from '../userCard/UserCard'
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFullConversation } from '../../redux/messageSlicer';
import MessageDisplay from './MessageDisplay';
import Icons from './../Icons';

const RightSide = ({ user, socket }) => {
    const { loggedUser } = useSelector(store => store.currentUser)
    const { data, isTyping, typingTo, chatUsers } = useSelector(store => store.messages)
    const { id } = useParams()
    console.log(id)
    const dispatch = useDispatch()
    const displayRef = useRef(null)
    const typeRef = useRef(null)
    const navigate = useNavigate()

    const [chatMessage, setChatMessage] = useState("")
    const [images, setImages] = useState([])

    const deleteConversation = async () => {
        //console.log(user);
        await axios.delete(`/chats/conversation/${user._id}`)
        dispatch(deleteFullConversation(user._id))
        navigate("/chat")
    }
    const textMessage = (e) => {
        setChatMessage(e.target.value)
        //socket.emit("openTyping", { id, id2: loggedUser._id })

    }
    useEffect(() => {
        setTimeout(() => {
            displayRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
        }, 50)
    }, [isTyping])

    return (
        <>
            <div className='message_header'>
                {user && <UserCard user={user}>
                    <i className="fas fa-trash text-danger cursor-pointer"
                        onClick={deleteConversation}></i>
                </UserCard>}
            </div>

            <div className="chat_container">
                <div className="chat_display" ref={displayRef}>
                    <div className="chat-row other_message">
                        <MessageDisplay user={user} />
                    </div>
                    <div className="chat-row your_message">
                        <MessageDisplay user={loggedUser} />
                    </div>
                </div>
            </div>
            <form className='chat_input'>
                <input type="text" placeholder="Enter your message..."
                    value={chatMessage} onChange={textMessage} />
                <Icons setContent={setChatMessage} content={chatMessage} />
                {/*  <div className="file_upload">
                    <i className="fas fa-image text-danger"></i>
                    <input type="file" name="file" id="file" multiple accept="image/*,video/*,audio/*"

                    />
                </div> */}
                <button className="material-icons" type="submit" disabled={(chatMessage || images.length > 0) ? false : true}>
                    near_me
                </button>
            </form>
        </>
    )
}

export default RightSide