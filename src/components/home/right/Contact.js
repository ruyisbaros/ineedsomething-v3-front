import React from 'react'
import { capitalName } from "../../../utils/helpers"

const Contact = ({ user }) => {
    return (
        <div className='contact hover3'>
            <div className="contact_img">
                <img src={user?.picture} alt="" />
            </div>
            <span>{capitalName(user?.first_name)}{" "}{capitalName(user?.last_name)}</span>
        </div>
    )
}

export default Contact