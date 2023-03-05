import React, { useState, useEffect } from 'react'
import Bio from './Bio'
import "./profileIntro.css"
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentDetails } from '../../../redux/currentUserSlice';
import axios from './../../../axios';
import { toast } from 'react-toastify';
import EditUserDetails from './EditUserDetails';

const ProfileIntro = ({ visitor }) => {
    //const [details, setDetails] = useState(detailsS)
    const { loggedUser } = useSelector(store => store.currentUser)

    const [infos, setInfos] = useState({
        bio: loggedUser?.details?.bio ? loggedUser?.details?.bio : "",
        otherName: loggedUser?.details?.otherName ? loggedUser?.details?.otherName : "",
        job: loggedUser?.details?.job ? loggedUser?.details?.job : "",
        workplace: loggedUser?.details?.workplace ? loggedUser?.details?.workplace : "",
        highSchool: loggedUser?.details?.highSchool ? loggedUser?.details?.highSchool : "",
        college: loggedUser?.details?.college ? loggedUser?.details?.college : "",
        currentCity: loggedUser?.details?.currentCity ? loggedUser?.details?.currentCity : "",
        hometown: loggedUser?.details?.hometown ? loggedUser?.details?.hometown : "",
        relationship: loggedUser?.details?.relationship ? loggedUser?.details?.relationship : "",
        instagram: loggedUser?.details?.instagram ? loggedUser?.details?.instagram : "",
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
            const { data } = await axios.patch("/users/update_user_details", { infos })
            console.log(data)
            dispatch(updateCurrentDetails(data.details))
            setShowBio(false)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    /* useEffect(() => {
        setDetails(detailsS)
        setInfos(details)
    }, [detailsS, details]) */
    return (
        <div className='profile_card'>
            <div className="profile_card_header">Intro</div>
            {
                loggedUser?.details?.bio && !showBio &&
                <div className='info_col'>
                        <span className="info_text">{loggedUser?.details?.bio}</span>
                    {!visitor &&
                        <button onClick={() => setShowBio(true)} className='gray_btn hover1'>Edit Bio</button>}
                </div>
            }
            {!loggedUser?.details?.bio && !showBio && !visitor &&
                <button onClick={() => setShowBio(true)} className='gray_btn hover1 w100'>Add Bio</button>
            }
            {showBio && <Bio
                setShowBio={setShowBio}
                value={infos.bio}
                detail={infos.bio}
                onChange={handleDetail}
                updateUserDetails={updateUserDetails}
                placeholder="Add bio"
                name="bio"
            />}
            {
                loggedUser?.details?.otherName &&
                <div className='info_profile'>
                    <img src="../../../../icons/job.png" alt="" />
                        {loggedUser?.details?.otherName}
                </div>
            }
            {loggedUser?.details?.job && loggedUser?.details?.workplace ?
                (<div className='info_profile'>
                    <img src="../../../../icons/job.png" alt="" />
                    Works as {loggedUser?.details?.job} at <b>{loggedUser?.details?.workplace}</b>
                </div>)
                : loggedUser?.details?.job && !loggedUser?.details?.workplace ?
                    (<div className='info_profile'>
                        <img src="../../../../icons/job.png" alt="" />
                        Works as {loggedUser?.details?.job}
                    </div>)
                    : !loggedUser?.details?.job && loggedUser?.details?.workplace ? (
                        <div className='info_profile'>
                            <img src="../../../../icons/job.png" alt="" />
                            Works at <b>{loggedUser?.details?.workplace}</b>
                        </div>
                    )
                        : (!loggedUser?.details?.job && !loggedUser?.details?.workplace) ? <div className='info_profile'>
                            <img src="../../../../icons/job.png" alt="" />
                            Open for new opportunities
                        </div>
                            : ""
            }
            {
                loggedUser?.details?.relationship &&
                <div className='info_profile'>
                    <img src="../../../../icons/relationship.png" alt="" />
                        {loggedUser?.details?.relationship}
                </div>
            }
            {
                loggedUser?.details?.college &&
                <div className='info_profile'>
                    <img src="../../../../icons/studies.png" alt="" />
                        Studies at {loggedUser?.details?.college}
                </div>
            }
            {
                loggedUser?.details?.highSchool &&
                <div className='info_profile'>
                    <img src="../../../../icons/studies.png" alt="" />
                        Studies at {loggedUser?.details?.highSchool}
                </div>
            }
            {
                loggedUser?.details?.currentCity &&
                <div className='info_profile'>
                    <img src="../../../../icons/home.png" alt="" />
                        Lives in {loggedUser?.details?.currentCity}
                </div>
            }
            {
                loggedUser?.details?.hometown &&
                <div className='info_profile'>
                    <img src="../../../../icons/home.png" alt="" />
                        From {loggedUser?.details?.hometown}
                </div>
            }
            {
                loggedUser?.details?.instagram &&
                <div className='info_profile'>
                    <img src="../../../../icons/instagram.png" alt="" />
                        <a href={`https://www.instagram.com/${loggedUser?.details?.instagram}`} target="_blank" rel="noreferrer">{loggedUser?.details?.instagram}</a>
                </div>
            }
            {!visitor &&
                <button className='gray_btn hover1 w100' onClick={() => setShowEditUserDetails(true)}>Edit Details</button>}
            {!visitor && showEditUserDetails &&
                <EditUserDetails
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