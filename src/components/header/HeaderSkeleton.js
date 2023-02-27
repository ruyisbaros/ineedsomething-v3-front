import React from 'react'
import { Link } from 'react-router-dom';

const HeaderSkeleton = () => {
    return (
        <header>
            <div className="header_left" >
                <Link to="/" className='header_logo'>
                    <div className="circle">
                        <img src="" alt="" />
                    </div>
                </Link>
                <div className="search search1" >
                    <input
                        type="text"
                        placeholder='Search iNeedSomething'
                        className='hide_input'
                    />
                </div>
            </div>

            <div className="header_middle">
                <Link to="/" className="`middle_icon">

                </Link>
                <Link to="/" className='middle_icon hover1'>

                </Link>
                <Link to="/" className='middle_icon hover1'>

                    <div className="middle_notification"></div>
                </Link>
                <Link to="/" className='middle_icon hover1'>

                </Link>
                <Link to="/" className='middle_icon hover1'>

                </Link>
            </div>
            <div className="header_right">
                <Link to="/profile" className="profile_link hover1 profile">
                    <img src="" alt="" />
                    <span></span>
                </Link>
                <div className="circle_icon active_header hover1" >
                    <div >
                        <div style={{ transform: "translateY(2px)" }}>

                        </div>
                    </div>

                </div>
                <div className="circle_icon hover1">

                </div>
                <div className="circle_icon hover1">

                    <div className="right_notifications">9</div>
                </div>
                <div className="circle_icon active_header" >
                    <div >

                    </div>

                </div>
            </div>
        </header>
    )
}

export default HeaderSkeleton