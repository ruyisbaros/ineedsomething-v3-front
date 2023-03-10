import React, { useRef, useState, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify';
import { searchUsersRegex, useDebounce } from '../../services/SearchService';
import { Return, Search } from '../../svg'
import { useOutsideClick } from './../../utils/helpers';

const SearchMenu = ({ setShowSearchMenu, showSearchMenu }) => {
    const color = "#65676b"
    const [iconShow, setIconShow] = useState(true)
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const menuRef = useRef(null)
    const inputRef = useRef(null)
    const debouncedValue = useDebounce(search, 1000) //make soft search

    useOutsideClick(menuRef, () => {
        setShowSearchMenu(!showSearchMenu)
    })

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    const searchUserHandler = useCallback(async (query) => {
        try {
            setSearch(query)
            if (query) {
                const res = await searchUsersRegex(query, setLoading)
                setSearchResults(res)
                console.log(res)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }, [])

    useEffect(() => {
        if (debouncedValue) {
            searchUserHandler(debouncedValue)
        }
    }, [searchUserHandler, debouncedValue])

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
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
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