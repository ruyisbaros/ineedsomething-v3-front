import React, { useState, useRef, useEffect } from 'react'
import { addFriendRequest, cancelFriendRequest } from '../../services/FriendShipServices';
import { useOutsideClick } from './../../utils/helpers';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../redux/profileSlicer';
import { updateCurrentUserFriendShip } from '../../redux/currentUserSlice';

const FriendShip = () => {
    const { profile } = useSelector(store => store.profile)
    const { loggedUser } = useSelector(store => store.currentUser)
   // console.log(profile)
    const [showFriendsMenu, setShowFriendsMenu] = useState(false)
    const [respondMenu, setRespondMenu] = useState(false)
    const [pendingMenu, setPendingMenu] = useState(false)
    const friendMenuRef = useRef(null)
    const respondMenuRef = useRef(null)
    const pendingMenuRef = useRef(null)
    const dispatch = useDispatch()

    useOutsideClick(friendMenuRef, () => setShowFriendsMenu(false))
    useOutsideClick(respondMenuRef, () => setRespondMenu(false))
    useOutsideClick(pendingMenuRef, () => setRespondMenu(false))

    const addFriend = async () => {
        const res = await addFriendRequest(profile._id)
        console.log(res)
        dispatch(updateProfile(res?.updatedReceiver))
        dispatch(updateCurrentUserFriendShip(res?.updatedSender))
    }
    const cancelRequest = async () => {
        const res = await cancelFriendRequest(profile._id)
        console.log(res)
        dispatch(updateProfile(res?.updatedReceiver))
        dispatch(updateCurrentUserFriendShip(res?.updatedSender))
    }

    return (
        <div className='friendship' >
            {loggedUser?.friends?.includes(profile?._id) ?
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
                            {loggedUser?.following?.includes(profile?._id) ?
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
                : !loggedUser?.requests?.includes(profile?._id) &&
                !profile?.requests?.includes(loggedUser?._id) &&
                <button className='blue_btn' onClick={addFriend}>
                    <img src="../../../icons/addFriend.png" alt="" className='invert' />
                    <span>Add+</span>
                </button>
            }
            {
                profile?.requests?.includes(loggedUser?._id) ?
                    <div className='friends_menu_wrap' ref={respondMenuRef}>
                        <button className="blue_btn" onClick={() => setPendingMenu(prev => !prev)}>
                            <img src="../../../icons/cancelRequest.png" alt="" className='invert' />
                            <span>Pending</span>
                        </button>
                        {pendingMenu &&
                            <div style={{ fontWeight: "bold", color: "teal", right: "10rem", width: "200px" }} className='open_cover_menu'>
                                <div style={{ fontWeight: "bold", color: "crimson" }} className="open_cover_menu_item hover1" onClick={cancelRequest}>
                                    Cancel Request !
                                </div>

                            </div>}
                    </div>
                    : loggedUser?.requests?.includes(profile?._id) &&
                    <div className='friends_menu_wrap' ref={respondMenuRef}>
                        <button className='gray_btn' onClick={() => setRespondMenu(prev => !prev)}>
                            <img src="../../../icons/friends.png" alt="" />
                            <span>Respond</span>
                        </button>
                        {respondMenu &&
                                <div style={{ fontWeight: "bold", color: "teal", width: "250px", right: "5.5rem" }} className='open_cover_menu' >
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
                loggedUser?.following?.includes(profile?._id) ?
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
            <button className={loggedUser?.friends?.includes(profile?._id) ? "blue_btn" : "gray_btn"} onClick={() => setRespondMenu(prev => !prev)}>
                <img src="../../../icons/message.png" alt="" className={loggedUser?.friends?.includes(profile?._id) ? "invert" : ""} />
                <span>Message</span>
            </button>
        </div>
    )
}

export default FriendShip