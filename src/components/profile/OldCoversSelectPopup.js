import React from 'react'

const OldCoversSelectPopup = ({ setOldCoverShow, setCoverImage, photos, user }) => {
    return (
        <div className='blur'>
            <div className="postBox select_cover_box">
                <div className="box_header">
                    <div className="small_circle" onClick={() => setOldCoverShow(false)}>
                        <i className="exit_icon"></i>
                    </div>
                    <span>Select photo</span>
                </div>
                <div className="scrollbar selectCoverBox_links">
                    <div className="selectCoverBox_link">Recent Photos</div>
                    <div className="selectCoverBox_link">Photo Albums</div>
                </div>
                <div className="old_pictures_wrap scrollbar">
                    <h4>Your recent profile pictures</h4>
                    <div className="old_pictures">
                        {photos && photos?.length > 0 &&
                            photos
                                ?.filter(photo => photo.folder === `iNeedSomething/${user?.username}/profileImages`)
                                .map(photo => (
                                    <img key={photo.public_id} src={photo.url} alt=""
                                        onClick={() => setCoverImage(photo.url)}
                                    />
                                ))
                        }
                    </div>
                    <h4>Your recent cover pictures</h4>
                    <div className="old_pictures">
                        {photos && photos.length > 0 &&
                            photos
                                .filter(photo => photo.folder === `iNeedSomething/${user?.username}/coverImages`)
                                .map(photo => (
                                    <img className='cover' key={photo.public_id} src={photo.url} alt=""
                                        onClick={() => setCoverImage(photo.url)}
                                    />
                                ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OldCoversSelectPopup