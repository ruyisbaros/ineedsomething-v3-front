import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import HelpAndSupport from './user-menu-comps/HelpAndSupport';
import SettingsPrivacy from './user-menu-comps/SettingsPrivacy';
import DisplayAccess from './user-menu-comps/DisplayAccess';
import { useDispatch } from 'react-redux';
import { authLogout } from '../../redux/currentUserSlice';
import axios from './../../axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const UserMenu = ({ user }) => {
    const [visible, setVisible] = useState(0)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await axios.get("/auth/logout")
            dispatch(authLogout())
            Cookies.set("user", "")
            Cookies.set("session", "")
            Cookies.set("session.sig", "")

            navigate("/login")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    return (
        <div className='menu' >
            {visible === 0 &&
                <div>
                    <Link to="/profile" className="menu_header hover3">
                        <img src={user?.picture} alt="" />
                        <div className="menu_col">
                            <span>{user?.first_name}{" "}{user?.last_name}</span>
                            <span>See your profile</span>
                        </div>
                    </Link>
                    <div className="menu_splitter"></div>
                    <div className="menu_main hover3">
                        <div className="small_circle">
                            <i className="report_filled_icon"></i>
                        </div>
                        <div className="menu_col">
                            <div className="menu_span1">Give feedback</div>
                            <div className="menu_span2">Help us to improve</div>
                        </div>
                    </div>
                    <div className="menu_splitter"></div>
                    <div className="menu_item hover3" onClick={() => {
                        setVisible(1)
                    }}>
                        <div className="small_circle" >
                            <i className="settings_filled_icon"></i>
                        </div>
                        <span>Settings & Privacy</span>
                        <div className="rArrow">
                            <i className="right_icon"></i>
                        </div>
                    </div>
                    <div className="menu_item hover3" onClick={() => {
                        setVisible(2)
                    }}>
                        <div className="small_circle">
                            <i className="help_filled_icon"></i>
                        </div>
                        <span>Help & Support</span>
                        <div className="rArrow">
                            <i className="right_icon"></i>
                        </div>
                    </div>
                    <div className="menu_item hover3" onClick={(e) => {
                        e.stopPropagation()
                        setVisible(3)
                    }}>
                        <div className="small_circle">
                            <i className="dark_filled_icon"></i>
                        </div>
                        <span>Display & Accessibility</span>
                        <div className="rArrow">
                            <i className="right_icon"></i>
                        </div>
                    </div>
                    <div className="menu_item hover3">
                        <div className="small_circle">
                            <i className="logout_filled_icon"></i>
                        </div>
                        <span onClick={handleLogout}>Logout</span>

                    </div>
                </div>
            }
            {visible === 1 &&
                <SettingsPrivacy setVisible={setVisible} />
            }
            {visible === 2 &&
                <HelpAndSupport setVisible={setVisible} />
            }
            {visible === 3 &&
                <DisplayAccess setVisible={setVisible} />
            }
        </div>
    )
}

export default UserMenu