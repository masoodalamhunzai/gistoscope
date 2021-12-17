import * as React from 'react'
import { Fragment } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Comment } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'

function PostHeader({ nuOfVersions, versionsIndex }) {
  return (
    <div className="px-4">
      {' '}
      <Comment
        author={
          <div className="reply-post-header-container">
            <Link
              to={
                '/'
                // '/dashboard/' + nuOfVersions[versionsIndex].userId &&
                // nuOfVersions[versionsIndex].userId._id
              }
            >
              {nuOfVersions[versionsIndex].userId &&
                nuOfVersions[versionsIndex].userId.firstName}{' '}
              {nuOfVersions[versionsIndex].userId &&
                nuOfVersions[versionsIndex].userId.lastName}{' '}
            </Link>
          </div>
        }
        avatar={
          <Avatar
            src={
              nuOfVersions[versionsIndex].userId &&
                nuOfVersions[versionsIndex].userId?.userPicture
                ? nuOfVersions[versionsIndex].userId?.userPicture
                : 'https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png'
            }
            alt="Han Solo"
          />
        }
        content={
          <Fragment>
            <div className="reply-post-meta"></div>
            Posted on:{' '}
            {nuOfVersions[versionsIndex].userId &&
              nuOfVersions[versionsIndex].timeOfPost}{' '}
            (
            {moment(
              nuOfVersions[versionsIndex].userId &&
              nuOfVersions[versionsIndex].timeOfPost,
              'dddd, MMMM Do YYYY, h:mm:ss a',
            ).fromNow()}
            )
          </Fragment>
        }
      />
    </div>
  )
}

export default PostHeader
