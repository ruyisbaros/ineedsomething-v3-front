import React from 'react'

const SettingsPrivacy = ({ setVisible }) => {
    return (
        <div className="absolute_wrap">
            <div className='absolute_wrap_header'>
                <div className="circle hover2" onClick={(e) => {
                    e.stopPropagation()
                    setVisible(0)
                }}>
                    <i className="arrow_back_icon"></i>
                </div>
                Settings & Privacy
            </div>
            <div className="menu_item hover3">
                <div className="small_circle">
                    <i className="settings_filled_icon"></i>
                </div>
                <span>Settings</span>
            </div>
            <div className="menu_item hover3">
                <div className="small_circle">
                    <i className="privacy_checkup_icon"></i>
                </div>
                <span>Privacy Checkup</span>
            </div>
            <div className="menu_item hover3">
                <div className="small_circle">
                    <i className="privacy_shortcuts_icon"></i>
                </div>
                <span>Privacy Shortcut </span>
            </div>
            <div className="menu_item hover3">
                <div className="small_circle">
                    <i className="activity_log_icon"></i>
                </div>
                <span>Activity log</span>
            </div>
            <div className="menu_item hover3">
                <div className="small_circle">
                    <i className="news_icon"></i>
                </div>
                <span>News Feed Preferences</span>
            </div>
            <div className="menu_item hover3">
                <div className="small_circle">
                    <i className="language_icon"></i>
                </div>
                <span>Language</span>
            </div>
        </div>
    )
}

export default SettingsPrivacy