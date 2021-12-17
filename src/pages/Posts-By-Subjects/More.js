import React from 'react'
// import { Link } from 'react-router-dom'

const More = props => {
  return (
    <div
      className="text ml-4"
      style={{
        position: 'relative',
      }}
    >
      <span
        id="content"
        dangerouslySetInnerHTML={{
          __html:
            props?.child?.description?.length > 404
              ? props?.child?.description.substring(0, 404) + '...'
              : props?.child?.description,
        }}
      ></span>
      <span
        style={{
          position: 'relative',
          top: '0',
          left: '0',
          color: 'rgba(52, 144, 220, 1)',
        }}
        to={'/post/' + props?.child?.id}
      >
        (More)
      </span>
    </div>
  )
}

export default More
