import React, { useState } from 'react'
import Bio from './Bio'

const Details = ({ text, img, value, handleDetail, updateUserDetails, name, seen, placeholder, relation }) => {
    const [show, setShow] = useState(false)
    return (
        <div>
            <div className="add_details_flex " onClick={() => setShow(true)}>
                {
                    seen ?
                        <div className="info_profile">
                            {!show && <div className='editBox_contents'>
                                <div className='editBox'>
                                    <img src={`../../../../icons/${img}.png`} alt="" />
                                    {seen}
                                </div>
                                <i className="edit_icon"></i>
                            </div>}
                        </div>
                        :
                        <>
                            <i className="rounded_plus_icon"></i>
                            <span className="underline"> Add {text}</span>
                        </>
                }
            </div>
            {show && <Bio
                setShowBio={setShow}
                value={value}
                onChange={handleDetail}
                updateUserDetails={updateUserDetails}
                placeholder={placeholder}
                name={name}
                detail
                relation={relation}
            />}
        </div>
    )
}

export default Details