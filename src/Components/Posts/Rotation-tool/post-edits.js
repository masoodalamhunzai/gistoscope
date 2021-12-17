import * as React from 'react'
import {LeftSquareFilled, RightSquareFilled} from '@ant-design/icons'

function PostEdit({setRotationId, post, nuOfEdit, count, handleSlider, next, previous}) {
  return (
    <div className="post-edits-container">
      {nuOfEdit?.length > 0 ? (
        <LeftSquareFilled
          onMouseOver={() => setRotationId(post?.id)}
          onClick={() => {
            previous()
            handleSlider(true, false)
          }}
          className="post-edits-icon"
        />
      ) : (
        <LeftSquareFilled
          onMouseOver={() => setRotationId(post?.id)}
          className="post-edits-icon"
          style={{cursor: 'unset'}}
        />
      )}
      <span className="mx-1 text-primary" style={{fontSize: '16px', fontWeight: '600'}}>
        {nuOfEdit?.length > 0 ? count : 0}
      </span>
      <span className="post-edits-title text-primary">Edits</span>
      <span className="mx-1 text-primary" style={{fontSize: '16px', fontWeight: '600'}}>
        {nuOfEdit?.length}
      </span>
      {nuOfEdit?.length > 0 ? (
        <RightSquareFilled
          onMouseOver={() => setRotationId(post?.id)}
          onClick={() => {
            next()
            handleSlider(true, false)
          }}
          className="post-edits-icon"
        />
      ) : (
        <RightSquareFilled
          onMouseOver={() => setRotationId(post?.id)}
          className="post-edits-icon"
          style={{cursor: 'unset'}}
        />
      )}
    </div>
  )
}

export default PostEdit
