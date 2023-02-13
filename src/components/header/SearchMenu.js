import React, { useRef, useState, useEffect } from 'react'
import { Return, Search } from '../../svg'
import { useOutsideClick } from './../../utils/helpers';

const SearchMenu = ({ setShowSearchMenu, showSearchMenu }) => {
    const color = "#65676b"
    const [iconShow, setIconShow] = useState(true)
    const menuRef = useRef(null)
    const inputRef = useRef(null)

    useOutsideClick(menuRef, () => {
        setShowSearchMenu(!showSearchMenu)
    })

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    return (
        <div className='header_left search_area scrollbar' ref={menuRef}>
            <div className="search_wrap">
                <div className="header_logo">
                    <div className="circle hover1" onClick={() => setShowSearchMenu(!showSearchMenu)}>
                        <Return color={color} />
                    </div>
                </div>
                <div className="search" onClick={() => {
                    inputRef.current.focus()
                }}>
                    {iconShow && <div>
                        <Search color={color} />
                    </div>}
                    <input
                        type="text"
                        placeholder='Search iNeedSomething'
                        ref={inputRef}
                        onFocus={() => setIconShow(false)}
                        onBlur={() => setIconShow(true)}
                    />
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