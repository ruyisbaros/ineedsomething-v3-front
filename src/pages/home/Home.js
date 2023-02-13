import React, { useRef } from 'react'
import "./home.css"
import Header from './../../components/header/Header';
import { useOutsideClick } from './../../utils/helpers';

const Home = () => {
    const el = useRef(null)
    const write = () => {
        console.log("clicked")
    }
    useOutsideClick(el, write)
    return (
        <div>
            <Header />
        </div>
    )
}

export default Home