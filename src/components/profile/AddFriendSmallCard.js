import React from 'react'

const AddFriendSmallCard = ({ item }) => {
    return (
        <div className='addFriendCard'>
            <div className="addFriend_imgSmall">
                <img src={item.profile_picture} alt="" />
                <div className="addFriend_infos">
                    <div className="addFriend_name">{item.profile_name.length < 11 ? item.profile_name : item.profile_name.slice(0, 11)}</div>
                    <div className="light_blue_btn">
                        <img className='filter_blue' src="../../../icons/addFriend.png" alt="" />
                        Add Friend
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddFriendSmallCard