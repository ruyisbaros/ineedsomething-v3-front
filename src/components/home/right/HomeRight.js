import React from 'react'
import { TbReload } from "react-icons/tb"
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FriendOffers from './FriendOffers';
import PuffLoader from "react-spinners/PuffLoader"
import "./homeRight.css"

const HomeRight = ({ user }) => {
    const { suggestions, loading } = useSelector(store => store.suggestions)
    console.log(suggestions)

    return (
        <div className='right_home'>
            <div className="contacts_wrap">
                <Link to={`/profile/${user.username}`} className='contact hover3'>
                    <div className="contact_img">
                        <img src={user?.picture} alt="" />
                    </div>
                    <span>{user?.first_name}{" "}{user?.last_name}</span>
                </Link>
                <div className="contacts_header">
                    <h5>People you may know</h5>
                    <span style={{ cursor: "pointer" }}><TbReload size={20} /></span>
                </div>
                <div className="contact_list">
                    {
                        loading ?
                            <div className="puffLoader">
                                <PuffLoader loading={loading} color="#1876f2" size={30} />
                            </div> :
                            <div className="contact_list_content">
                                {
                                    suggestions.length > 0 &&
                                    suggestions.map(sug => (
                                        <FriendOffers key={sug._id} sug={sug} />
                                    ))
                                }
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default HomeRight