import React from 'react'
import "./createPost.css"
import LiveVideo from './../../../svg/liveVideo';
import Photo from './../../../svg/photo';
import Feeling from './../../../svg/feeling';

const CreatePost = ({ user }) => {
    return (
        <div className='create_post'>
            <div className="create_post_header">
                <img src={user?.picture} alt="" />
                <div className="open_post">
                    What's on your mind, {user?.first_name}?
                </div>
            </div>
            <div className="create_splitter"></div>
            <div className="create_post_body">
                <div className="create_post_icon hover1">
                    <LiveVideo color="#f3425f" />
                    Live Video
                </div>
                <div className="create_post_icon hover1">
                    <Photo color="#4bbf67" />
                    Photo/Video
                </div>
                <div className="create_post_icon hover1">
                    <Feeling color="#f7b928" />
                    Feeling/Activity
                </div>
            </div>
        </div>
    )
}

export default CreatePost