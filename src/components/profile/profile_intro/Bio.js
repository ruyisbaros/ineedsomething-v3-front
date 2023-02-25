import React from 'react'

const Bio = ({ setShowBio, value, onChange, updateUserDetails, placeholder, name, detail, relation }) => {
    return (
        <div className='add_bio_wrap'>
            {
                relation ?
                    <select name={name} onChange={onChange} value={value}>
                        <option value="Single">Single</option>
                        <option value="In a relationship">In a relationship</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                    </select>
                    :
                    <textarea
                        className='textarea_blue details_input'
                        placeholder={placeholder}
                        name={name}
                        maxLength={detail ? 30 : 100}
                        value={value}
                        onChange={onChange}
                    ></textarea>
            }
            {!detail && <div className="remaining">characters remaining: {value?.length}/100 </div>}
            <div className="flex">
                <div className="flex flex_left">
                    <i className="public_icon"></i>
                    Public
                </div>
                <div className="flex flex_right">
                    <button className="gray_btn"
                        onClick={() => setShowBio(false)}>Cancel</button>
                    <button className="blue_btn" onClick={() => {
                        updateUserDetails()
                        setShowBio(false)
                    }}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default Bio