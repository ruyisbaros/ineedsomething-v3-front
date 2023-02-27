import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css"

const PeopleYouMayKnowSkeleton = () => {
    return (
        <div className='ppl_you_mayKnow' style={{ borderColor: "#ddd" }}>
            <div style={{ marginBottom: "5px" }} className="ppl_you_mayKnow_header">
                <Skeleton baseColor="#fff" width="200px" height={30} containerClassName="avatar-skeleton" />
                <div className="post_header_right ppl_circle hover1">
                    <Skeleton baseColor="#fff" width={50}
                        height={25} containerClassName="avatar-skeleton" />
                </div>
            </div>
            <div className="ppl_you_mayKnow_list">
                {[1, 2, 3, 4, 5].map((data, index) => (
                    <div key={index} className='addFriendCard'>
                        <div className="addFriend_imgSmall">
                            <Skeleton baseColor="#fff" width={150}
                                height={140} containerClassName="avatar-skeleton" />
                            <div className="addFriend_infos">
                                <div className="addFriend_name"></div>
                                <div className="light_blue_btn">
                                    <Skeleton baseColor="#EFF1F6" width={150}
                                        height={20} containerClassName="avatar-skeleton" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default PeopleYouMayKnowSkeleton