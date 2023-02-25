import React from 'react'
import Details from './Details'

const EditUserDetails = ({ setShowEditUserDetails, infos, setInfos, details }) => {
    return (
        <div className='blur'>
            <div className="postBox infosBox">
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
                    <Details header="Other Name" value={details?.otherName} img="studies" />
                </div>
            </div>
        </div>
    )
}

export default EditUserDetails