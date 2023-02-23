import React, { useState, useCallback, useEffect } from 'react'
import axios from './../../axios';
import { toast } from 'react-toastify';

const Photos = ({ user, token, profile }) => {
    const [loading, setLoading] = useState(false)
    const [photos, setPhotos] = useState([])
    const path = `iNeedSomething/${profile?.username}/postImages`
    const getImages = useCallback(async () => {
        try {
            setLoading(true)
            const { data } = await axios.post(`/images/listImages`, { path, sort: "desc", max: 5 }, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            console.log(data);
            setPhotos(data)
            setLoading(false)

        } catch (error) {
            setLoading(false)
            toast.error(error.response.data.message)
        }
    }, [token, path])

    useEffect(() => {
        getImages()
    }, [getImages])
    return (
        <div className='profile_card'>
            <div className="profile_card_header">
                Photos
                <div className="profile_header_link">
                    See all photos
                </div>
            </div>
            <div className="profile_card_count">
                {photos.total_count === 0 ? "" :
                    photos.total_count === 1 ? "1 Photo" :
                        `${photos.total_count} Photos`}
            </div>
            <div className="profile_card_grid">
                {photos.resources && photos.resources.length > 0 &&
                    photos.resources.map((img) => (
                        <div key={img.asset_id} className="profile_photo_card">
                            <img src={img?.url} alt="" />
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Photos