import React from 'react'

const StoryComp = ({ story }) => {
    return (
        <div className='story'>
            <img className='story_img' src={story.image} alt="" />
            <div className="story_profile_pic">
                <img src={story.profile_picture} alt="" />
            </div>
            <div className="story_profile_name">{story.profile_name}</div>
        </div>
    )
}

export default StoryComp