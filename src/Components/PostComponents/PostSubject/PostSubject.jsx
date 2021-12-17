import React from 'react'
import './PostSubject.css'

const PostSubject = ({data}) => {
  return (
    <>
      {data?.subjects?.map((subject, index) => (
        <div className="post-subject" key={index}>
          <h4>{subject?.name}</h4>
        </div>
      ))}
    </>
  )
}

export default PostSubject
