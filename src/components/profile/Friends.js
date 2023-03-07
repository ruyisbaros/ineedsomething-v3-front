import React from 'react'
import { Link } from 'react-router-dom';

const Friends = ({ friends }) => {
    //console.log(friends)
    return (
        <div className='profile_card'>
            <div className="profile_card_header">
                Friends
                <div className="profile_header_link">
                    See all friends
                </div>
            </div>
            <div className="profile_card_count">
                {friends?.length === 0 ? "No friend" :
                    friends?.length === 1 ? "1 Friend" :
                        `${friends?.length} Friends`}
            </div>
            <div className="profile_card_grid">
                {friends && friends.length > 0 &&
                    friends?.map((frnd) => (
                        <Link to={`/profile/${frnd.username}`} key={frnd?._id} className="profile_photo_card">
                            <img src={frnd?.picture} alt="" />
                            <span >{frnd?.first_name}{" "}{frnd?.last_name}</span>
                        </Link>
                    ))}
            </div>
        </div>
    )
}

export default Friends