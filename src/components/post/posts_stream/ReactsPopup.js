import React from 'react'
import { reactsArray } from '../../../utils/static'
import { addPostReact } from './../../../services/PostReactService';

const ReactsPopup = ({ showPopup, setShowPopup, handleReact }) => {

  return (
    <>
      {showPopup && <div className='reacts_popup'
        onMouseOver={() => {
          setTimeout(() => {
            setShowPopup(true)
          }, 500)
        }}
        onMouseLeave={() => {
          setTimeout(() => {
            setShowPopup(false)
          }, 500)
        }}
      >
        {
          reactsArray.map((react, i) => (
            <div key={i} className="react" onClick={() => handleReact(react.name)}>
              <img src={react.image} alt="" />
            </div>
          ))
        }
      </div>}
    </>
  )
}

export default ReactsPopup