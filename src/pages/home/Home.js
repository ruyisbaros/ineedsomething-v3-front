import React from 'react'
import Header from './../../components/header/Header';
import { useSelector } from 'react-redux';
import HomeLeft from '../../components/home/left/HomeLeft';
import HomeRight from './../../components/home/right/HomeRight';
import Stories from '../../components/home/stories/Stories';
import "./home.css"
import CreatePost from '../../components/post/create_post/CreatePost';
import NotActivateUser from './../../components/home/activation/NotActivateUser';

const Home = ({ setShowCreatePostPopup }) => {
    const { user } = useSelector(store => store.currentUser.loggedUser)

    return (
        <div className='home'>
            <Header />
            <HomeLeft user={user} />
            <div className="home_middle">
                <Stories />
                {!user.verified && <NotActivateUser />}
                <CreatePost user={user} setShowCreatePostPopup={setShowCreatePostPopup} />
            </div>
            <HomeRight user={user} />
        </div>
    )
}

export default Home