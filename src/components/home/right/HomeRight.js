import React from 'react'
import "./homeRight.css"
import NewRoom from './../../../svg/newRoom';
import Search from './../../../svg/search';
import Dots from './../../../svg/dots';
import Contact from './Contact';

const HomeRight = ({ user }) => {
    const color = "#65676b"
    return (
        <div className='right_home'>
            <div className="heading">Sponsored</div>
            <div className="splitter1"></div>
            <div className="contacts_wrap">
                <div className="contacts_header">
                    <div className="contacts_header_left">Contacts</div>
                    <div className="contacts_header_right">
                        <div className="contact_circle">
                            <NewRoom color={color} />
                        </div>
                        <div className="contact_circle">
                            <Search color={color} />
                        </div>
                        <div className="contact_circle">
                            <Dots color={color} />
                        </div>
                    </div>
                </div>
                <div className="contacts_list">
                    <Contact user={user} />
                </div>
            </div>
        </div>
    )
}

export default HomeRight