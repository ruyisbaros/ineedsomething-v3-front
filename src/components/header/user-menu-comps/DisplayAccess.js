import React from 'react'
import { MdViewCompact } from "react-icons/md"
import { useDispatch, useSelector } from 'react-redux';
import { setDarkTheme, setLightTheme } from '../../../redux/screenModeSlicer';
import Cookies from "js-cookie"

const DisplayAccess = ({ setVisible }) => {
    const { darkTheme } = useSelector(store => store.screenTheme)
    const dispatch = useDispatch()

    const handleDarkOff = () => {
        dispatch(setLightTheme())
        Cookies.set("darkTheme", JSON.stringify(false))
    }

    const handleDarkOn = () => {
        dispatch(setDarkTheme())
        Cookies.set("darkTheme", JSON.stringify(true))
    }
    return (
        <div className="absolute_wrap">
            <div className="absolute_wrap_header">
                <div
                    className="circle hover1"
                    onClick={() => {
                        setVisible(0);
                    }}
                >
                    <i className="arrow_back_icon"></i>
                </div>
                Display & Accessibility
            </div>
            <div className="menu_main">
                <div className="small_circle" style={{ width: "50px" }}>
                    <i className="dark_filled_icon"></i>
                </div>
                <div className="menu_col">
                    <span className="menu_span1">Dark Mode</span>
                    <span className="menu_span2">
                        Adjust the appearance to reduce glare and give your eyes
                        a break.
                    </span>
                </div>
            </div>
            <label htmlFor="darkOff" className="hover1"
                onClick={handleDarkOff}
            >
                <span>Off</span>
                <input type="radio" name="dark" id="darkOff" readOnly checked={!darkTheme} />
            </label>
            <label htmlFor="darkOn" className="hover1" onClick={handleDarkOn}>
                <span>On</span>
                <input type="radio" name="dark" id="darkOn" readOnly checked={darkTheme} />
            </label>
            <div className="menu_main">
                <div className="small_circle" style={{ width: "50px" }}>
                    {/* <i className="compact_icon"></i> */}
                    <MdViewCompact />
                </div>
                <div className="menu_col">
                    <span className="menu_span1">Compact mode</span>
                    <span className="menu_span2">
                        Make your font size smaller so more content can fit on the screen.
                    </span>
                </div>
            </div>
            <label htmlFor="compactOff" className="hover1">
                <span>Off</span>
                <input type="radio" name="compact" id="compactOff" />
            </label>
            <label htmlFor="compactOn" className="hover1">
                <span>On</span>
                <input type="radio" name="compact" id="compactOn" />
            </label>
            <div className="menu_item hover3">
                <div className="small_circle">
                    <i className="keyboard_icon"></i>
                </div>
                <span>Keyboard</span>
                <div className="rArrow">
                    <i className="right_icon"></i>
                </div>
            </div>
        </div>
    )
}

export default DisplayAccess