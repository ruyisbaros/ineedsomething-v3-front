import React, { useState, useCallback, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../../components/header/Header'
import { getFriendInfo } from '../../services/friendsRequestsService'
import FriendCard from './FriendCard'
import "./friends.css"

const Friends = () => {
    const [friends, setFriends] = useState([])
    const [sentRequests, setSentRequests] = useState([])
    const [receivedRequests, setReceivedRequests] = useState([])
    const { type } = useParams()
    //console.log(type)
    const fetchUserFriendsInfo = useCallback(async () => {
        const res = await getFriendInfo()
        //console.log(res)
        setFriends(res?.friends)
        setSentRequests(res?.sentRequests)
        setReceivedRequests(res?.requests)
    }, [])

    useEffect(() => {
        fetchUserFriendsInfo()
    }, [fetchUserFriendsInfo])
    return (
        <>
            <Header page="friends" />
            <div className='friends'>
                <div className="friends_left">
                    <div className="friends_left_header">
                        <h3>Friends</h3>
                        <div className="small_circle">
                            <i className="settings_filled_icon"></i>
                        </div>
                    </div>
                    <div className="friends_left_wrap">
                        <Link to="/friends" className={`menu_item hover3 ${type === undefined ? "active_friends" : ""}`}>
                            <div className="small_circle" >
                                <i className="friends_home_icon"></i>
                            </div>
                            <span>Home</span>
                        </Link>
                        <Link to="/friends/received" className={`menu_item hover3 ${type === "received" ? "active_friends" : ""}`}>
                            <div className="small_circle">
                                <i className="friends_requests_icon"></i>
                            </div>
                            <span>Friend Requests</span>
                            <div className="rArrow">
                                <i className="right_icon"></i>
                            </div>
                        </Link>
                        <Link to="/friends/sent" className={`menu_item hover3 ${type === "sent" ? "active_friends" : ""}`}>
                            <div className="small_circle">
                                <i className="friends_requests_icon"></i>
                            </div>
                            <span>Sent Requests</span>
                            <div className="rArrow">
                                <i className="right_icon"></i>
                            </div>
                        </Link>
                        <Link to="/friends/all_friends" className={`menu_item hover3 ${type === "all_friends" ? "active_friends" : ""}`}>
                            <div className="small_circle">
                                <i className="all_friends_icon"></i>
                            </div>
                            <span>All Friends</span>
                            <div className="rArrow">
                                <i className="right_icon"></i>
                            </div>
                        </Link>
                        <Link to="/friends/suggestions" className={`menu_item hover3 ${type === "suggestions" ? "active_friends" : ""}`}>
                            <div className="small_circle">
                                <i className="friends_suggestions_icon"></i>
                            </div>
                            <span>Suggestions</span>
                            <div className="rArrow">
                                <i className="right_icon"></i>
                            </div>
                        </Link>

                        <Link to="/friends/birthdays" className={`menu_item hover3 ${type === "birthdays" ? "active_friends" : ""}`}>
                            <div className="small_circle">
                                <i className="birthdays_icon"></i>
                            </div>
                            <span>Birthdays</span>
                            <div className="rArrow">
                                <i className="right_icon"></i>
                            </div>
                        </Link>
                        <Link to="/friends/custom" className={`menu_item hover3 ${type === "custom" ? "active_friends" : ""}`}>
                            <div className="small_circle">
                                <i className="all_friends_icon"></i>
                            </div>
                            <span>Custom List</span>
                            <div className="rArrow">
                                <i className="right_icon"></i>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="friends_right scrollbar">
                    {(type === undefined || type === "received") && <div className="friends_right_wrap">
                        <div className="friends_left_header">
                            <h3>Friend Requests</h3>
                            <Link to="/friends/received" className="see_link hover3">See All</Link>
                        </div>
                        <div className="flex_wrap">
                            {receivedRequests && receivedRequests.length > 0 &&
                                receivedRequests.map(user => (
                                    <FriendCard
                                        key={user._id} {...user}
                                        type="receivedRequest"
                                        setReceivedRequests={setReceivedRequests}
                                        receivedRequests={receivedRequests}
                                        setFriends={setFriends}
                                        friends={friends}
                                    />
                                ))
                            }
                        </div>
                    </div>}
                    {(type === undefined || type === "sent") && <div className="friends_right_wrap">
                        <div className="friends_left_header">
                            <h3>Sent Requests</h3>
                            <Link to="/friends/sent" className="see_link hover3">See All</Link>
                        </div>
                        <div className="flex_wrap">
                            {sentRequests && sentRequests.length > 0 &&
                                sentRequests.map(user => (
                                    <FriendCard
                                        key={user._id}
                                        {...user}
                                        type="sentRequest"
                                        sentRequests={sentRequests}
                                        setSentRequests={setSentRequests}
                                    />
                                ))
                            }
                        </div>
                    </div>}
                    {(type === undefined || type === "all_friends") && <div className="friends_right_wrap">
                        <div className="friends_left_header">
                            <h3>Friends</h3>
                            <Link to="/friends/all_friends" className="see_link hover3">See All</Link>
                        </div>
                        <div className="flex_wrap">
                            {friends && friends.length > 0 &&
                                friends.map(user => (
                                    <FriendCard key={user._id} {...user} type="friends" />
                                ))
                            }
                        </div>
                    </div>}
                </div>
            </div>
        </>
    )
}

export default Friends