import React from 'react'

const HelpAndSupport = ({ setVisible }) => {
    return (
        <div className="absolute_wrap">
            <div className='absolute_wrap_header'>
                <div className="circle hover2" onClick={(e) => {
                    e.stopPropagation()
                    setVisible(0);
                }}>
                    <i className="arrow_back_icon"></i>
                </div>
                Help & Support
            </div>
            <div className="menu_item hover3">
                <div className="small_circle">
                    <i className="help_center_icon"></i>
                </div>
                <span>Help center</span>
            </div>
            <div className="menu_item hover3">
                <div className="small_circle">
                    <i className="email_icon"></i>
                </div>
                <span>Support Inbox</span>
            </div>
            <div className="menu_item hover3">
                <div className="small_circle">
                    <i className="info_filled_icon"></i>
                </div>
                <span>Report problem </span>
            </div>
        </div>
    )
}

export default HelpAndSupport