import React from 'react'

const PostMenuItem = ({ img, icon, title, subtitle, itemFunc }) => {
    return (
        <li className='hover1' onClick={itemFunc}>
            {img ? <img src={img} alt="" /> : <i className={icon}></i>}
            <div className="post_menu_text">
                <span>{title}</span>
                {subtitle && <span className='menu_post_col'>{subtitle}</span>}
            </div>
        </li>
    )
}

export default PostMenuItem