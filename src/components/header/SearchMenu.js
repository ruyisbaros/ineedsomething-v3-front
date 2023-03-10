import React, { useRef, useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addSearchHistory, deleteFromSearchHistory, getSearchHistory, searchUsersRegex, useDebounce } from '../../services/SearchService';
import { PacmanLoader } from "react-spinners"
import { Return, Search } from '../../svg'
import { useOutsideClick } from './../../utils/helpers';

const SearchMenu = ({ setShowSearchMenu, showSearchMenu }) => {
    const color = "#65676b"
    const [iconShow, setIconShow] = useState(true)
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [history, setHistory] = useState([])
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
                //console.log(res)
            } 
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }, [])

    useEffect(() => {
        if (debouncedValue) {
            searchUserHandler(debouncedValue)
        } else {
            setSearchResults([])
        }
    }, [searchUserHandler, debouncedValue])

    const handleAddSearchHistory = async (id) => {
        await addSearchHistory(id)
        setShowSearchMenu(false)
    }
    const handleRemoveFromSearchHistory = async (id) => {
        await deleteFromSearchHistory(id)
        setHistory(history.filter(item => item.user._id !== id))
    }

    const handleGetSearchHistory = useCallback(async () => {
        const res = await getSearchHistory()
        //console.log(res)
        setHistory(res)
    }, [])
    useEffect(() => {
        handleGetSearchHistory()
    }, [handleGetSearchHistory])

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
            {search === "" &&
                <>
                <div className="search_history_header">
                    <span>Recent searches</span>
                    <a href="#">Edit</a>
                </div>
                    <div className="search_history scrollbar">
                        {history.length > 0 &&
                            history
                                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                .map(src => (
                                    <div key={src.user.username} className="search_user_item hover1">
                                        <Link className='flex' to={`/profile/${src.user.username}`}
                                            onClick={() => handleAddSearchHistory(src.user?._id)}>
                                            <img src={src.user?.picture} alt="" />
                                            <span>{src.user?.first_name}{" "}{src.user?.last_name}</span>
                                        </Link>
                                        <i onClick={() => handleRemoveFromSearchHistory(src.user?._id)} className="exit_icon"></i>
                                    </div>
                                ))
                        }
                    </div>
                </>
            }
            <div className="search_results scrollbar">
                <div className='search_loader'>
                    <PacmanLoader size={15} color='#65676b'
                        loading={loading} />
                </div>

                {searchResults.length > 0 &&
                    searchResults.map(src => (
                        <Link key={src?.email} to={`/profile/${src.username}`} className="search_user_item hover1"
                            onClick={() => handleAddSearchHistory(src._id)}>
                            <img src={src?.picture} alt="" />
                            <span>{src?.first_name}{" "}{src?.last_name}</span>
                        </Link>
                    ))}
            </div>
        </div>
    )
}

export default SearchMenu