import React from 'react'
import { useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate()
    return (
        <div className="error-container">
            <div className="oops">Oops!</div>
            <p className="not-found">Error 404: Page Not Found!</p>
            <button className="back-button button" onClick={() => navigate("/")}>Back Home</button>
        </div>
    )
}

export default Error