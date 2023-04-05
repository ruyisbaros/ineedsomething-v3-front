import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom';
import UserCard from '../userCard/UserCard';
import { createChatUser, fetchChatWith } from '../../redux/messageSlicer';
import { toast } from 'react-toastify';
import { searchUsersRegex, useDebounce } from '../../services/SearchService';
import { useOutsideClick } from '../../utils/helpers';
import { Search } from '../../svg';
import axios from '../../axios';

const LeftSide = ({ socket }) => {
    const { loggedUser } = useSelector(store => store.currentUser)
    const { chatUsers, data } = useSelector(store => store.messages)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)
    const [showSearchMenu, setShowSearchMenu] = useState("")
    const [searchUsers, setSearchUsers] = useState([])
    const [iconShow, setIconShow] = useState(true)
    const menuRef = useRef(null)
    const inputRef = useRef(null)
    const debouncedValue = useDebounce(search, 1000) //make soft search

    useOutsideClick(menuRef, () => {
        setShowSearchMenu(!showSearchMenu)
    })

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    const searchUserHandler = useCallback(async (query) => {
        try {
            setSearch(query)
            if (query) {
                const res = await searchUsersRegex(query, setLoading)
                setSearchUsers(res)
                //console.log(res)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }, [])

    useEffect(() => {
        if (debouncedValue) {
            searchUserHandler(debouncedValue)
        } else {
            setSearchUsers([])
        }
    }, [searchUserHandler, debouncedValue])
    const handleAddChat = (user) => {
        //console.log(user);
        setSearch("")
        setSearchUsers([])
        user._id !== loggedUser._id && dispatch(createChatUser(user))
        navigate(`/message/${user._id}`)
    }

    const isActive = (user) => {
        if (id === user._id) {
            return "active"
        }
    }
    const getConversations = useCallback(async () => {
        const { data } = await axios.get("/chats/conversations")
        //console.log(data);
        let newArr = []
        data.forEach(item => {
            item.recipients.forEach(rcp => {
                if (rcp._id !== loggedUser._id) {
                    newArr.push({ ...rcp, chatMessage: item.chatMessage, images: item.images })
                }
            })
        })

        dispatch(fetchChatWith(newArr))
    }, [dispatch, loggedUser])
    useEffect(() => {
        getConversations()
    }, [getConversations, data])
    //console.log(chatUsers)
    return (
        <>
            <form className="message_header" /* onClick={handleSearch} */>
                <div onClick={() => {
                    inputRef.current.focus()
                }}>
                    <input type="text" value={search}
                        placeholder="Search users for chat..."
                        ref={inputRef}
                        onFocus={() => setIconShow(false)}
                        onBlur={() => setIconShow(true)}
                        onChange={(e) => setSearch(e.target.value)} />
                    <button type="submit" style={{ display: 'none' }}>Search</button>
                </div>
            </form>

            <div className="message_chat_list">
                {
                    searchUsers?.map(src => (
                        <div key={src?.email} to={`/profile/${src.username}`} className="search_user_item hover1"
                            onClick={() => handleAddChat(src)}
                        >
                            <img src={src?.picture} alt="" />
                            <span>{src?.first_name}{" "}{src?.last_name}</span>
                        </div>
                    ))
                }
                {
                    chatUsers?.map(user => (
                        <div key={user._id} className={`message_user ${isActive(user)}`}
                            onClick={() => {
                                handleAddChat(user)
                                /* selectUser(user) */
                            }}>
                            <UserCard
                                user={user} msg={true} /* border="border" */ /* handleClose={handleClose} */ >
                                <i style={{ color: user.isOnline ? "teal" : "red" }} className="fas fa-circle"></i>

                            </UserCard>
                        </div>
                    ))
                }

            </div>
        </>
    )
}

export default LeftSide