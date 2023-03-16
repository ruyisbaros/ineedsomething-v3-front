import React from 'react'
import { followUnFollow } from '../../../services/FriendShipServices'
import { useDispatch } from 'react-redux';
import { removeFromOffers } from '../../../redux/friendOffersSlice';
import { updateProfile } from '../../../redux/profileSlicer';
import { updateCurrentUserFriendShip } from '../../../redux/currentUserSlice';

const FriendOffers = ({ sug }) => {
    const dispatch = useDispatch()
    const unFollowFollow = async () => {
        const res = await followUnFollow(sug?._id)
        /*  console.log(res) */
        dispatch(removeFromOffers(sug?._id))
        dispatch(updateProfile(res?.updatedReceiver))
        dispatch(updateCurrentUserFriendShip(res?.updatedSender))
    }
    return (
        <div className='suggestion hover1'>
            <div className="suggestion_context">
                <img src={sug?.picture} alt="" />
                <span>{sug?.first_name}{" "}{sug?.last_name}</span>
            </div>
            <div className="suggestion_button">
                <button className="blue_btn" onClick={unFollowFollow}>Follow</button>
            </div>
        </div>
    )
}

export default FriendOffers