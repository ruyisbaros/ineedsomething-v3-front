import React, { useState, useRef } from 'react'
import { useOutsideClick } from './../../utils/helpers';

const FriendShip = ({ friendShip }) => {
    const [showFriendsMenu, setShowFriendsMenu] = useState(false)
    const [respondMenu, setRespondMenu] = useState(false)
    const friendMenuRef = useRef(null)
    const respondMenuRef = useRef(null)
    const friendShipL = {
        friend: false,
        following: false,
        requestSent: false,
        requestReceived: false
    }

    useOutsideClick(friendMenuRef, () => setShowFriendsMenu(false))
    useOutsideClick(respondMenuRef, () => setRespondMenu(false))

    return (
        <div className='friendship' >
            {friendShip?.friend ?
                <div className='friends_menu_wrap' ref={friendMenuRef}>
                    <button className='gray_btn' onClick={() => setShowFriendsMenu(prev => !prev)}>
                        <img src="../../../icons/friends.png" alt="" />
                        <span>Friends</span>
                    </button>
                    {showFriendsMenu &&
                        <div className='open_cover_menu' >
                            <div className="open_cover_menu_item hover1">
                                <img src="../../../icons/favoritesOutline.png" alt="" />
                                Favorites
                            </div>
                            <div className="open_cover_menu_item hover1">
                                <img src="../../../icons/editFriends.png" alt="" />
                                Edit Friend List
                            </div>
                            {friendShip?.following ?
                                <div className="open_cover_menu_item hover1">
                                    <img src="../../../icons/unfollowOutlined.png" alt="" />
                                    Unfollow
                                </div> :
                                <div className="open_cover_menu_item hover1">
                                    <img src="../../../icons/follow.png" alt="" />
                                    Follow
                                </div>}
                            <div className="open_cover_menu_item hover1">
                                <i className="unfriend_outlined_icon"></i>
                                Unfriend
                            </div>
                        </div>}
                </div>
                : !friendShip?.requestSent && !friendShip?.requestReceived &&
                <button className='blue_btn' onClick={() => setShowFriendsMenu(prev => !prev)}>
                    <img src="../../../icons/addFriend.png" alt="" className='invert' />
                    <span>Add+</span>
                </button>
            }
            {
                friendShip?.requestSent ?
                    <button className="blue_btn">
                        <img src="../../../icons/cancelRequest.png" alt="" className='invert' />
                        <span>Cancel Request</span>
                    </button>
                    : friendShip?.requestReceived &&
                    <div className='friends_menu_wrap' ref={respondMenuRef}>
                        <button className='gray_btn' onClick={() => setRespondMenu(prev => !prev)}>
                            <img src="../../../icons/friends.png" alt="" />
                            <span>Respond</span>
                        </button>
                        {respondMenu &&
                            <div style={{ fontWeight: "bold", color: "teal" }} className='open_cover_menu' >
                                <div className="open_cover_menu_item hover1">
                                    Confirm Friend Request
                                </div>
                                <div style={{ fontWeight: "bold", color: "crimson" }} className="open_cover_menu_item hover1">
                                    Ignore It !
                                </div>

                            </div>}
                    </div>
            }
            {
                friendShip?.following ?
                    <button className='gray_btn' onClick={() => setRespondMenu(prev => !prev)}>
                        <img src="../../../icons/follow.png" alt="" />
                        <span>Following</span>
                    </button>
                    :
                    <button className='blue_btn' onClick={() => setRespondMenu(prev => !prev)}>
                        <img src="../../../icons/follow.png" alt="" className='invert' />
                        <span>Follow</span>
                    </button>
            }
            <button className={friendShip?.friend ? "blue_btn" : "gray_btn"} onClick={() => setRespondMenu(prev => !prev)}>
                <img src="../../../icons/message.png" alt="" className={friendShip?.friend ? "invert" : ""} />
                <span>Message</span>
            </button>
        </div>
    )
}

export default FriendShip