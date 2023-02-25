import React from 'react'

const Bio = ({ setShowBio, bio, handleBio, updateUserDetails }) => {
    return (
        <div className='add_bio_wrap'>
            <textarea
                className='textarea_blue details_input'
                placeholder='Add bio'
                name="bio"
                maxLength={100}
                value={bio}
                onChange={handleBio}
            ></textarea>
            <div className="remaining">characters remaining: {bio?.length}/100 </div>
            <div className="flex">
                <div className="flex flex_left">
                    <i className="public_icon"></i>
                    Public
                </div>
                <div className="flex flex_right">
                    <button className="gray_btn"
                        onClick={() => setShowBio(false)}>Cancel</button>
                    <button className="blue_btn" onClick={updateUserDetails}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default Bio