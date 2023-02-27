import React from 'react'
import { Link } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css"

const HeaderSkeleton = () => {
    return (
        <header>
            <div className="header_left" >
                <Link to="/" className='header_logo'>
                    <div className="circle">
                        <Skeleton
                            height="40px"
                            width="40px"
                            baseColor="#EFF1F6"
                            circle
                            containerClassName='avatar-skeleton'
                        />
                    </div>
                </Link>
                <div className="search search1" >
                    <input
                        type="text"

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
            <div className="header_right" style={{ alignItems: "center" }} >
                <Link to="/profile" className="profile_link hover1 profile">
                    <Skeleton
                        height="40px"
                        width="40px"
                        baseColor="#EFF1F6"
                        circle
                        containerClassName='avatar-skeleton'
                    />
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

                    <div className="right_notifications" style={{ background: "#f0f2f5" }}></div>
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