import React from 'react'

const PostMenuItem = ({ icon, title, subtitle }) => {
    return (
        <li className='hover1'>
            <i className={icon}>{title}</i>
            <div className="post_menu_text">
                <span>{subtitle}</span>
            </div>
        </li>
    )
}

export default PostMenuItem