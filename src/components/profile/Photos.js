import React, { useState, useCallback, useEffect } from 'react'
import axios from '../../axios';
import { toast } from 'react-toastify';

const Photos = ({ photos }) => {

    return (
        <div className='profile_card'>
            <div className="profile_card_header">
                Photos
                <div className="profile_header_link">
                    See all photos
                </div>
            </div>
            <div className="profile_card_count">
                {photos?.length === 0 ? "No photo" :
                    photos?.length === 1 ? "1 Photo" :
                        `${photos?.length} Photos`}
            </div>
            <div className="profile_card_grid">
                {photos && photos.length > 0 &&
                    photos.map((img) => (
                        <div key={img.asset_id} className="profile_photo_card">
                            <img src={img?.url} alt="" />
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Photos