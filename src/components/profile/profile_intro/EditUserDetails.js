import React, { useRef } from 'react'
import Details from './Details'
import { useOutsideClick } from './../../../utils/helpers';

const EditUserDetails = ({ setShowEditUserDetails, infos, details, handleDetail, updateUserDetails }) => {
    const userDetailRef = useRef(null)
    useOutsideClick(userDetailRef, () => setShowEditUserDetails(false))
    return (
        <div className='blur'>
            <div className="postBox infosBox" ref={userDetailRef}>
                <div className="box_header">
                    <div className="small_circle" onClick={() => setShowEditUserDetails(false)}>
                        <i className="exit_icon"></i>
                    </div>
                    <span>Edit Details</span>
                </div>
                <div className="details_wrapper scrollbar">
                    <div className="details_col">
                        <span>Customize Your Intro</span>
                        <span>Details you select will be public</span>
                    </div>
                    <div className="details_header">Other Name</div>
                    <Details
                        img="studies"
                        name="otherName"
                        text="other name"
                        placeholder="Add other name"
                        value={infos.otherName}
                        seen={details.otherName}
                        handleDetail={handleDetail}
                        updateUserDetails={updateUserDetails}
                    />
                    <div className="details_header">Work</div>
                    <Details
                        img="job"
                        name="job"
                        text="a job title"
                        placeholder="Add job title"
                        value={infos.job}
                        seen={details.job}
                        handleDetail={handleDetail}
                        updateUserDetails={updateUserDetails}
                    />
                    <Details
                        img="job"
                        name="workplace"
                        text="a workplace"
                        placeholder="Add a workplace"
                        value={infos.workplace}
                        seen={details.workplace}
                        handleDetail={handleDetail}
                        updateUserDetails={updateUserDetails}
                    />
                    <div className="details_header">Education</div>
                    <Details
                        img="studies"
                        name="highSchool"
                        text="a high school"
                        placeholder="Add high school"
                        value={infos.highSchool}
                        seen={details.highSchool}
                        handleDetail={handleDetail}
                        updateUserDetails={updateUserDetails}
                    />
                    <Details
                        img="studies"
                        name="college"
                        text="a college"
                        placeholder="Add a college"
                        value={infos.college}
                        seen={details.college}
                        handleDetail={handleDetail}
                        updateUserDetails={updateUserDetails}
                    />
                    <div className="details_header">Current City</div>
                    <Details
                        img="home"
                        name="currentCity"
                        text="a current city"
                        placeholder="Add a current city"
                        value={infos.currentCity}
                        seen={details.currentCity}
                        handleDetail={handleDetail}
                        updateUserDetails={updateUserDetails}
                    />
                    <div className="details_header">Home Town</div>
                    <Details
                        img="home"
                        name="hometown"
                        text="hometown"
                        placeholder="Where are you from?"
                        value={infos.hometown}
                        seen={details.hometown}
                        handleDetail={handleDetail}
                        updateUserDetails={updateUserDetails}
                    />
                    <div className="details_header">Relationship</div>
                    <Details
                        img="relationship"
                        name="relationship"
                        text="relationship"
                        placeholder="Where are you from?"
                        value={infos.relationship}
                        seen={details.relationship}
                        handleDetail={handleDetail}
                        updateUserDetails={updateUserDetails}
                        relation
                    />
                    <div className="details_header">Instagram</div>
                    <Details
                        img="instagram"
                        name="instagram"
                        text="instagram"
                        placeholder="Where are you from?"
                        value={infos.instagram}
                        seen={details.instagram}
                        handleDetail={handleDetail}
                        updateUserDetails={updateUserDetails}
                    />

                </div>
            </div>
        </div>
    )
}

export default EditUserDetails