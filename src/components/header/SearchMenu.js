import React, { useRef } from 'react'
import { Return, Search } from '../../svg'
import { useOutsideClick } from './../../utils/helpers';

const SearchMenu = ({ setShowSearchMenu, showSearchMenu }) => {
    const color = "#65676b"
    const el = useRef(null)
    useOutsideClick(el, () => {
        setShowSearchMenu(!showSearchMenu)
    })
    return (
        <div className='header_left search_area scrollbar' ref={el}>
            <div className="search_wrap">
                <div className="header_logo">
                    <div className="circle hover1">
                        <Return color={color} />
                    </div>
                </div>
                <div className="search">
                    <div>
                        <Search color={color} />
                    </div>
                    <input type="text" placeholder='Search iNeedSomething' />
                </div>
            </div>
            <div className="search_history_header">
                <span>Recent searches</span>
                <a href="#">Edit</a>
            </div>
            <div className="search_history">

            </div>
            <div className="search_results scrollbar"></div>
        </div>
    )
}

export default SearchMenu