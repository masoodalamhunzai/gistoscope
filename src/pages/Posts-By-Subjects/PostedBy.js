import React, { Fragment } from 'react'
import { Comment, Avatar } from 'antd'
import { Link } from 'react-router-dom'

const PostedBy = props => {
  return (
    <div className="px-4">
      <Comment
        author={
          <div
            style={{
              marginTop: '6px',
              fontSize: '23px',
              fontWeight: '600',
              marginBottom: '0px',
            }}
          >
            <Link to={'/' /* '/dashboard/' + props.child.userId._id */}>
              {props.child.userId && props.child.userId?.firstName}
              {props.child.userId && props.child.userId?.lastName}
            </Link>
          </div>
        }
        avatar={
          <Avatar
            src={
              props.child.userId && props?.child?.userId?.userPicture
                ? props.child?.userId?.userPicture
                : 'https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png'
            }
            alt="Han Solo"
          />
        }
        content={
          <Fragment>
            <div
              className=""
              style={{
                display: 'flex',
                float: 'right',
                marginTop: '-40px',
              }}
            ></div>
            Posted on:
            {props.child.userId && props.child.timeOfPost}(
            {props
              .moment(
                props.child.userId && props.child.timeOfPost,
                'dddd, MMMM Do YYYY, h:mm:ss a',
              )
              .fromNow()}
            )
          </Fragment>
        }
      />
    </div>
  )
}

export default PostedBy
