import React, { useState, useEffect } from 'react'
import Bio from './Bio'
import "./profileIntro.css"
import { useDispatch } from 'react-redux';
import { updateCurrentDetails } from '../../../redux/currentUserSlice';
import axios from './../../../axios';
import { toast } from 'react-toastify';
import EditUserDetails from './EditUserDetails';

const ProfileIntro = ({ user, token, detailsS, visitor }) => {
    const [details, setDetails] = useState(detailsS)

    const [infos, setInfos] = useState({
        bio: details?.bio ? details?.bio : "",
        otherName: details?.otherName ? details?.otherName : "",
        job: details?.job ? details?.job : "",
        workplace: details?.workplace ? details?.workplace : "",
        highSchool: details?.highSchool ? details?.highSchool : "",
        college: details?.college ? details?.college : "",
        currentCity: details?.currentCity ? details?.currentCity : "",
        hometown: details?.hometown ? details?.hometown : "",
        relationship: details?.relationship ? details?.relationship : "",
        instagram: details?.instagram ? details?.instagram : "",
    })

    const [showBio, setShowBio] = useState(false)
    const [showEditUserDetails, setShowEditUserDetails] = useState(false)
    const dispatch = useDispatch()
    const handleDetail = (e) => {
        const { name, value } = e.target
        setInfos({ ...infos, [name]: value })
    }
    console.log(infos)
    const updateUserDetails = async () => {
        try {
            const { data } = await axios.patch("/users/update_user_details", { infos }, {
                headers: { "Authorization": `Bearer ${token}` }
            })
            console.log(data)
            dispatch(updateCurrentDetails(data.details))
            setShowBio(false)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    useEffect(() => {
        setDetails(detailsS)
        setInfos(details)
    }, [detailsS, details])
    return (
        <div className='profile_card'>
            <div className="profile_card_header">Intro</div>
            {
                details?.bio && !showBio &&
                <div className='info_col'>
                    <span className="info_text">{details?.bio}</span>
                    {!visitor &&
                        <button onClick={() => setShowBio(true)} className='gray_btn hover1'>Edit Bio</button>}
                </div>
            }
            {!details?.bio && !showBio && !visitor &&
                <button onClick={() => setShowBio(true)} className='gray_btn hover1 w100'>Add Bio</button>
            }
            {showBio && <Bio
                setShowBio={setShowBio}
                value={infos.bio}
                onChange={handleDetail}
                updateUserDetails={updateUserDetails}
                placeholder="Add bio"
                name="bio"
            />}
            {
                details?.otherName &&
                <div className='info_profile'>
                    <img src="../../../../icons/job.png" alt="" />
                    {details?.otherName}
                </div>
            }
            {details?.job && details?.workplace ?
                (<div className='info_profile'>
                    <img src="../../../../icons/job.png" alt="" />
                    Works as {details?.job} at <b>{details?.workplace}</b>
                </div>)
                : details?.job && !details?.workplace ?
                    (<div className='info_profile'>
                        <img src="../../../../icons/job.png" alt="" />
                        Works as {details?.job}
                    </div>)
                    : !details?.job && details?.workplace ? (
                        <div className='info_profile'>
                            <img src="../../../../icons/job.png" alt="" />
                            Works at <b>{details?.workplace}</b>
                        </div>
                    )
                        : <div className='info_profile'>
                            <img src="../../../../icons/job.png" alt="" />
                            Open for new opportunities
                        </div>
            }
            {
                details?.relationship &&
                <div className='info_profile'>
                    <img src="../../../../icons/relationship.png" alt="" />
                    {details?.relationship}
                </div>
            }
            {
                details?.college &&
                <div className='info_profile'>
                    <img src="../../../../icons/studies.png" alt="" />
                    Studies at {details?.college}
                </div>
            }
            {
                details?.highSchool &&
                <div className='info_profile'>
                    <img src="../../../../icons/studies.png" alt="" />
                    Studies at {details?.highSchool}
                </div>
            }
            {
                details?.currentCity &&
                <div className='info_profile'>
                    <img src="../../../../icons/home.png" alt="" />
                    Lives in {details?.currentCity}
                </div>
            }
            {
                details?.hometown &&
                <div className='info_profile'>
                    <img src="../../../../icons/home.png" alt="" />
                    From {details?.hometown}
                </div>
            }
            {
                details?.instagram &&
                <div className='info_profile'>
                    <img src="../../../../icons/instagram.png" alt="" />
                    <a href={`https://www.instagram.com/${details?.instagram}`} target="_blank" rel="noreferrer">{details?.instagram}</a>
                </div>
            }
            {!visitor &&
                <button className='gray_btn hover1 w100' onClick={() => setShowEditUserDetails(true)}>Edit Details</button>}
            {!visitor && showEditUserDetails &&
                <EditUserDetails
                    details={details}
                    infos={infos}
                    setShowEditUserDetails={setShowEditUserDetails}
                    handleDetail={handleDetail}
                    updateUserDetails={updateUserDetails}
                />
            }
            {!visitor &&
                <button className='gray_btn hover1 w100'>Add Hobbies</button>}
            {!visitor &&
                <button className='gray_btn hover1 w100'>Add Feature</button>}
        </div>
    )
}

export default ProfileIntro