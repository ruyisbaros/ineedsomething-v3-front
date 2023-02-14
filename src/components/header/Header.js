import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import logo from "../../assets/output-onlinejpgtools (1).png"
import { Search, HomeActive, Menu, Notifications } from "../../svg"
import Friends from './../../svg/friends';
import Watch from './../../svg/watch';
import Market from './../../svg/market';
import Gaming from './../../svg/gaming';
import "./header.css"
import Messenger from './../../svg/messenger';
import ArrowDown from './../../svg/arrowDown';
import SearchMenu from './SearchMenu'
import AllMenu from './AllMenu'

const Header = () => {
    const color = "#65676b"
    const { user } = useSelector(store => store.currentUser.loggedUser)
    const [showSearchMenu, setShowSearchMenu] = useState(false)
    const [showAllMenu, setShowAllMenu] = useState(false)
    /* Outside click close */

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
            {showSearchMenu && <SearchMenu setShowSearchMenu={setShowSearchMenu} showSearchMenu={setShowSearchMenu} />}
            <div className="header_middle">
                <Link to="/" className='middle_icon active'>
                    <HomeActive color={color} />
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
                <Link to="/profile" className='profile_link hover1'>
                    <img src={user?.picture} alt="" />
                    <span>{user?.first_name}</span>
                </Link>
                <div className="circle_icon hover1" onClick={() => setShowAllMenu(!showAllMenu)}>
                    <Menu />
                    {showAllMenu && <AllMenu />}
                </div>
                <div className="circle_icon hover1">
                    <Messenger />
                </div>
                <div className="circle_icon hover1">
                    <Notifications />
                    <div className="right_notifications">9</div>
                </div>
                <div className="circle_icon hover1">
                    <ArrowDown />
                </div>
            </div>
        </header>
    )
}

export default Header