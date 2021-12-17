import React from 'react'

const SubjectName = props => {
  return (
      <div className="subject-name-contaienr">
        <div className="subject-name subject-name-sub-container">
          <span className="subject-name-text">{props.subjectData.name}</span>
        </div>
      </div>
  )
}
export default SubjectName
