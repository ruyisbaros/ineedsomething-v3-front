import React from 'react'

import { reactsArray } from '../../../utils/static'

const ReactsPopup = ({ showPopup, setShowPopup }) => {


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
            <div key={i} className="react">
              <img src={react.image} alt="" />
            </div>
          ))
        }
      </div>}
    </>
  )
}

export default ReactsPopup