import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css"

const StoriesSkeleton = () => {
    return (
        <div className='stories'>
            <div className="create_story_card">

                <div className="story_create_text"></div>
            </div>
            {[1, 2, 3, 4, 5].map((story, i) => (
                <div className='story'>

                    <div className="story_profile_pic" style={{ borderColor: "#ccc" }}>

                    </div>
                    <div className="story_profile_name"></div>
                </div>
            ))}
            <div className="white_circle">

            </div>
        </div>
    )
}

export default StoriesSkeleton