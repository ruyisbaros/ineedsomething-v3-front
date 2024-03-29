import React from 'react'

const Icons = ({ setContent, content }) => {
  const reactions = [
    '❤️', '😆', '😯', '😢', '😡', '👍', '👎', '😄',
    '😂', '😍', '😘', '😗', '😚', '😳', '😭', '😓',
    '😤', '🤤', '👻', '💀', '🤐', '😴', '😷', '😵'
  ]
  return (
    <div className="nav-item dropdown "
    >

      <span className="nav-link position-relative px-1" id="navbarDropdown"
        role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span style={{ opacity: 0.7 }}>😄</span>
      </span>

      <div className="dropdown-menu icon_container" aria-labelledby="navbarDropdown">
        <div className="reactions">
          {
            reactions.map(icon => (
              <span style={{ cursor: 'pointer' }} key={icon} onClick={() => setContent(content + icon)}>
                {icon}
              </span>
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Icons

