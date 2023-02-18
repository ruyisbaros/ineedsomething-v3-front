import React from 'react'
import Photo from './../../../svg/photo';
import Feeling from './../../../svg/feeling';
import Dots from './../../../svg/dots';

const AddToYourPost = () => {
    return (
        <div className='addToYourPost'>
            <div className="addTo_text">Add to your post</div>
            <div className="post_header_right hover1">
                <Photo color="#45bd62" />
            </div>
            <div className="post_header_right hover1">
                <i className="tag_icon"></i>
            </div>
            <div className="post_header_right hover1">
                <Feeling color="#f7b928" />
            </div>
            <div className="post_header_right hover1">
                <i className="maps_icon"></i>
            </div>
            <div className="post_header_right hover1">
                <i className="microphone_icon"></i>
            </div>
            <div className="post_header_right hover1">
                <Dots color="#65575b" />
            </div>

        </div>
    )
}

export default AddToYourPost