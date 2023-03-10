import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import logo from "../../assets/output-onlinejpgtools (1).png"
import { Search, HomeActive, Menu, Notifications, Home } from "../../svg"
import Friends from './../../svg/friends';
import Watch from './../../svg/watch';
import Market from './../../svg/market';
import Gaming from './../../svg/gaming';
import Messenger from './../../svg/messenger';
import ArrowDown from './../../svg/arrowDown';
import SearchMenu from './SearchMenu'
import AllMenu from './AllMenu'
import { useOutsideClick } from './../../utils/helpers';
import UserMenu from './UserMenu'
import "./header.css"

const Header = ({ page }) => {
    const color = "#65676b"
    const { loggedUser } = useSelector(store => store.currentUser)
    const { unRead } = useSelector(store => store.notifications)
    const [showSearchMenu, setShowSearchMenu] = useState(false)
    const [showAllMenu, setShowAllMenu] = useState(false)
    const [showUserMenu, setShowUserMenu] = useState(false)
    const allMenuRef = useRef(null)
    const userMenuRef = useRef(null)
    /* Outside click close */
    useOutsideClick(allMenuRef, () => {

        setShowAllMenu(false)
    })

    useOutsideClick(userMenuRef, () => {
        setShowUserMenu(false)
    })

    return (
        <header>
            <div className="header_left" >
                <Link to="/" className='header_logo'>
                    <div className="circle">
                        <img src={logo} alt="" />
                    </div>
                </Link>
                <div className="search search1" onClick={() => setShowSearchMenu(!showSearchMenu)}>
                    <Search color={color} />
                    <input
                        type="text"
                        placeholder='Search iNeedSomething'
                        className='hide_input'
                    />
                </div>
            </div>
            {showSearchMenu && <SearchMenu setShowSearchMenu={setShowSearchMenu}
                showSearchMenu={showSearchMenu} />}
            <div className="header_middle">
                <Link to="/" className={`middle_icon ${page === "home" ? "active" : "hover1"}`}>
                    {page === "home" ? <HomeActive color={color} /> :
                        <Home color={color} />}
                </Link>
                <Link to="/" className='middle_icon hover1'>
                    <Friends color={color} />
                </Link>
                <Link to="/" className='middle_icon hover1'>
                    <Watch color={color} />
                    <div className="middle_notification">9+</div>
                </Link>
                <Link to="/" className='middle_icon hover1'>
                    <Market color={color} />
                </Link>
                <Link to="/" className='middle_icon hover1'>
                    <Gaming color={color} />
                </Link>
            </div>
            <div className="header_right">
                <Link to="/profile" className={`profile_link hover1 ${page === "profile" ? "active_link" : ""}`}>
                    <img src={loggedUser?.picture} alt="" />
                    <span>{loggedUser?.first_name}</span>
                </Link>
                <div ref={allMenuRef} className={showAllMenu ? "circle_icon active_header hover1" : "circle_icon hover1"} >
                    <div onClick={() => setShowAllMenu(!showAllMenu)}>
                        <div style={{ transform: "translateY(2px)" }}>
                            <Menu />
                        </div>
                    </div>
                    {showAllMenu && <AllMenu />}
                </div>
                <div className="circle_icon hover1">
                    <Messenger />
                </div>
                <Link to="/notifications" className={`circle_icon hover1 ${page === "notification" ? "active_link" : ""}`}>
                    <Notifications />
                    {unRead > 0 && <div className="right_notifications">{unRead === 0 ? "" : unRead <= 9 ? unRead : "9+"}</div>}
                </Link>
                <div ref={userMenuRef} className={showUserMenu ? "circle_icon active_header hover1" : "circle_icon hover1"} >
                    <div onClick={() => {
                        setShowUserMenu((prev) => !prev)
                    }}>
                    <ArrowDown />
                    </div>
                    {showUserMenu && <UserMenu user={loggedUser} />}
                </div>
            </div>
        </header>
    )
}

export default Header