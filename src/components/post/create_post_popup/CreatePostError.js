import React from 'react'

const CreatePostError = ({ error, setError }) => {
    return (
        <div className='postError'>
            <div>{error}</div>
            <button onClick={() => setError("")} className="blue_btn">Try Again</button>
        </div>
    )
}

export default CreatePostError