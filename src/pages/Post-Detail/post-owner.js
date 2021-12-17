/**
 * Post Author
 */
import * as React from 'react'
import moment from 'moment'
import Avatar from 'antd/lib/avatar/avatar'
import { Comment } from 'antd'

function PostOwner({ post }) {
  return (
    <Comment
      author={
        <div className="ipost-author-container">
          {post?.userId && post?.userId?.firstName}
          {post?.userId && post?.userId?.lastName}
        </div>
      }
      avatar={
        <Avatar
          src={
            post?.userId && post.userId?.userPicture
              ? post.userId?.userPicture
              : 'https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png'
          }
          alt="Han Solo"
        />
      }
      content={
        <React.Fragment>
          <div className="ipost-date-container"></div>
          Posted on: {post?.userId && post?.timeOfPost} (
          {moment(
            post?.userId && post?.timeOfPost,
            'dddd, MMMM Do YYYY, h:mm:ss a',
          ).fromNow()}
          )
        </React.Fragment>
      }
    />
  )
}

export default PostOwner
