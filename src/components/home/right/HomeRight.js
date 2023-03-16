import React from 'react'
import NewRoom from './../../../svg/newRoom';
import Search from './../../../svg/search';
import Dots from './../../../svg/dots';
import FriendOffers from './FriendOffers';
import { TbReload } from "react-icons/tb"
import "./homeRight.css"

const HomeRight = ({ user }) => {
    const color = "#65676b"
    return (
        <div className='right_home'>
            {/* <div className="heading">Sponsored</div>
            <div className="splitter1"></div> */}
            <div className="contacts_wrap">
                <div className='contact hover3'>
                    <div className="contact_img">
                        <img src={user?.picture} alt="" />
                    </div>
                    <span>{user?.first_name}{" "}{user?.last_name}</span>
                </div>
                <div className="contacts_header">
                    <h5>People you may know</h5>
                    <TbReload size={20} />
                    {/*  <div className="contacts_header_right">
                        <div className="contact_circle">
                            <NewRoom color={color} />
                        </div>
                        <div className="contact_circle">
                            <Search color={color} />
                        </div>
                        <div className="contact_circle">
                            <Dots color={color} />
                        </div>
                    </div> */}
                </div>

            </div>
        </div>
    )
}

export default HomeRight