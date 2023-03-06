import React from 'react'

import { reactsArray } from '../../../utils/static'
import { useSelector } from 'react-redux';
import { addPostReact } from './../../../services/PostReactService';

const ReactsPopup = ({ showPopup, setShowPopup, postId }) => {
  //const {loggedUser}=useSelector(store=>store.currentUser)

  const handleReact = async (react) => {
    const res = await addPostReact(react, postId)
  }

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