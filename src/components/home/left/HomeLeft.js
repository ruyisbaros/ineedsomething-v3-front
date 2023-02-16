import React, { useState } from 'react'
import LeftLink from './LeftLink'
import { left } from '../../../utils/static'
import { IoIosArrowUp } from "react-icons/io"
import { BsLinkedin } from "react-icons/bs"
import { AiFillGithub } from "react-icons/ai"
import { Link } from 'react-router-dom';
import ArrowDown1 from './../../../svg/arrowDow1';
import "./homeLeft.css"


const HomeLeft = ({ user }) => {
    const [seeMore, setSeeMore] = useState(false)
    return (
        <div className='left_home scrollbar'>
            <Link to="/profile" className="left_link hover1">
                <img src={user?.picture} alt="" />
                <span>{user?.first_name}{" "}{user?.last_name}</span>
            </Link>
            {
                left.slice(0, 8).map((item, index) => (
                    <LeftLink key={index} img={item.img} text={item.text} notification={item.notification} />
                ))
            }
            {!seeMore && <div className="left_link" onClick={() => setSeeMore(true)}>
                <div className="small_circle">
                    <ArrowDown1 />
                </div>
                <span>See more</span>
            </div>}
            {seeMore && <div className="more_left">
                {
                    left.slice(8, left.length).map((item, index) => (
                        <LeftLink key={index} img={item.img} text={item.text} notification={item.notification} />
                    ))
                }
                <div className="left_link" onClick={() => setSeeMore(false)}>
                    <div className="small_circle">
                        <IoIosArrowUp />
                    </div>
                    <span>See less</span>
                </div>
            </div>}
            <div className="splitter"></div>
            <div className="shortcut">
                <div className="heading">Your Shortcuts</div>
                <div className="edit_shortcut">Edit</div>
            </div>
            <div className="shortcut_list">
                <a className='hover1' href="https://github.com/ruyisbaros" target="_blank" rel="noreferrer">
                    <AiFillGithub color='blue' size={20} />
                    <span>My Github profile</span>
                </a>
                <a className='hover1' href="https://www.linkedin.com/in/ahmet-erdonmez-085bb8141/" target="_blank" rel="noreferrer">
                    <BsLinkedin color='blue' size={20} />
                    <span>My LinkedIn profile</span>
                </a>
            </div>
            <div className="fb_copyright">
                Ahmet @2023
            </div>
        </div>
    )
}

export default HomeLeft