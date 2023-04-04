import React, { useState, useEffect } from 'react'
import LeftSide from '../../components/chats/LeftSide'
import RightSide from '../../components/chats/RightSide'
import Header from '../../components/header/Header'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const Conversation = () => {
    const { chatUsers } = useSelector(store => store.messages)
    const dispatch = useDispatch()
    const { id } = useParams()

    const [user, setUser] = useState("")

    useEffect(() => {
        const newUser = chatUsers?.find(user => user._id === id)
        if (newUser) {
            setUser(newUser)
        }
        //console.log(newUser);
    }, [id, chatUsers])
    return (
        <div className='chats'>
            <Header page="chat" />
            <div className="message d-flex">
                <div className="col-md-4 border-right px-0">
                    <LeftSide />
                </div>
                <div className="col-md-8 px-0">
                    <RightSide user={user} />
                </div>
            </div>
        </div>
    )
}

export default Conversation