import * as React from 'react'
import {LeftSquareFilled, RightSquareFilled} from '@ant-design/icons'

function PostVersion({
  setRotationId,
  post,
  nuOfVersions,
  count,
  handleSlider,
  next,
  previous,
}) {
  return (
    <div className="post-version-container">
      {nuOfVersions?.length > 0 ? (
        <LeftSquareFilled
          onMouseOver={() => setRotationId(post?.id)}
          onClick={() => {
            previous()
            handleSlider(false, true)
          }}
          className="post-version-icon"
        />
      ) : (
        <LeftSquareFilled
          onMouseOver={() => setRotationId(post?.id)}
          className="post-version-icon"
          style={{cursor: 'unset'}}
        />
      )}
      <span className="mx-1 text-primary" style={{fontSize: '16px', fontWeight: '600'}}>
        {nuOfVersions?.length > 0 ? count : 0}
      </span>
      <span className="post-version-count text-primary">Versions</span>
      <span className="mx-1 text-primary" style={{fontSize: '16px', fontWeight: '600'}}>
        {nuOfVersions?.length}
      </span>
      {nuOfVersions?.length > 0 ? (
        <RightSquareFilled
          onMouseOver={() => setRotationId(post?.id)}
          onClick={() => {
            next()
            handleSlider(false, true)
          }}
          className="post-version-icon"
        />
      ) : (
        <RightSquareFilled
          onMouseOver={() => setRotationId(post?.id)}
          className="post-version-icon"
          style={{cursor: 'unset'}}
        />
      )}
    </div>
  )
}

export default PostVersion
