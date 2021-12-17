import React from 'react'

const ChildTitleSummary = props => {
  return (
    <>
      <p className="text-white py-4 mb-0 px-4 postbysubject-title">{props.child.title}</p>
      <h6 className="text-white px-2 py-3 mb-0 px-4 postbysubject-summary">
        {props.child.summary}
      </h6>
    </>
  )
}

export default ChildTitleSummary
