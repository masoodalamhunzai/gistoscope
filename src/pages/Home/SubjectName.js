import React from 'react'

const SubjectName = props => {
  return (
    <div className="subject-name subject-name-container">
      <span className="subject-name-text">{props.subj.name} </span>
    </div>
  )
}
export default SubjectName
