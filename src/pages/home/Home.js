import React from 'react'
import Header from './../../components/header/Header';
import { useSelector } from 'react-redux';
import HomeLeft from '../../components/home/left/HomeLeft';
import HomeRight from './../../components/home/right/HomeRight';
import Streams from '../../components/home/streams/Streams';
import "./home.css"

const Home = () => {
    const { user } = useSelector(store => store.currentUser.loggedUser)
    return (
        <div className='home'>
            <Header />
            <HomeLeft user={user} />
            <div className="home_middle">
                <Streams user={user} />
            </div>
            <HomeRight user={user} />
        </div>
    )
}

export default Home