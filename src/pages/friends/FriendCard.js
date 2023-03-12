import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateCurrentUserFriendShip } from '../../redux/currentUserSlice'
import { updateProfile } from '../../redux/profileSlicer'
//import { cloneDeep } from 'lodash';
import { acceptFriendRequest, cancelFriendRequest, ignoreFriendRequest } from "../../services/FriendShipServices"

const FriendCard = ({ _id, first_name, last_name, picture, username, type, setSentRequests, setReceivedRequests, receivedRequests, sentRequests, setFriends, friends }) => {
    //const dispatch = useDispatch()
    const handleCancelRequest = async () => {
        await cancelFriendRequest(_id)
        /*  console.log(res) */
        setSentRequests(sentRequests.filter(item => item._id !== _id))
    }
    const friendRequestAccept = async () => {
        const res = await acceptFriendRequest(_id)
        /*  console.log(res) */
        setReceivedRequests(receivedRequests.filter(item => item._id !== _id))
        setFriends([res?.updatedSender, ...friends])
    }
    const friendRequestDeny = async () => {
        await ignoreFriendRequest(_id)
        /*  console.log(res) */
        setReceivedRequests(receivedRequests.filter(item => item._id !== _id))
    }
    return (
        <div className='req_card'>
            <Link to={`/profile/${username}`}>
                <img src={picture} alt="" />
            </Link>
            <div className="req_name">
                {first_name}{" "}{last_name}
            </div>
            {type === "sentRequest" ?
                <button
                    className='blue_btn'
                    style={{ background: "crimson" }}
                    onClick={handleCancelRequest}
                >
                    Cancel Request
                </button>
                : type === "receivedRequest" ?
                    <>
                        <button className='blue_btn' onClick={friendRequestAccept}>Accept</button>
                        <button className='blue_btn'
                            style={{ background: "crimson" }}
                            onClick={friendRequestDeny}
                        >
                            Ignore
                        </button>
                    </>
                    :
                    ""
            }
        </div>
    )
}

export default FriendCard