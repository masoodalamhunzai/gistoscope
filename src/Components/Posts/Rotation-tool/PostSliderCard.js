import React from 'react'
import Avatar from 'antd/lib/avatar/avatar'
import moment from 'moment'

const PostSliderCard = ({
  title,
  summary,
  description,
  showMore,
  timeOfPost,
  handleMore,
  user,
}) => {
  let postDate = new Date(timeOfPost).toString()
  let newFormatedPostTime = postDate === 'Invalid Date' ? timeOfPost : postDate
  return (
    <>
      <div className="header-top">
        <h5>{title} </h5>
      </div>
      <div className="post-header">
        <p>{summary}</p>
      </div>
      <div className="post-info post-inner">
        <div className="row post-head">
          <div className="PostUser">
            <div className="user-photo avatar-header">
              <Avatar
                src={
                  user?.userId && user.userId?.userPicture
                    ? user?.userId?.userPicture
                    : 'https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png'
                }
                alt="Han Solo"
              />
            </div>
            <div className="user-info">
              <h4>
                {user && user?.firstName} {user && user?.lastName}
              </h4>{' '}
              <p>
                Posted on: {newFormatedPostTime}{' '}
                {moment(newFormatedPostTime, 'dddd, MMMM Do YYYY, h:mm:ss a').fromNow()}
              </p>
            </div>
          </div>
        </div>
        <div className="post-content reply-post-meta">
          <p className="py-3">
            <span
              id="content"
              dangerouslySetInnerHTML={{
                __html:
                  showMore && description?.length > 150
                    ? description?.substring(0, 150) + '...'
                    : description,
              }}
            ></span>
            <span className="protation-full-post-view-link" onClick={handleMore}>
              {/* <Link className="protation-full-post-view-link" to={'/post/' + post.id}>  */}
              {description?.length > 0
                ? showMore
                  ? '(more)'
                  : '(less)'
                : <span className="not-found">record not found</span>}
            </span>
          </p>
        </div>
      </div>
    </>
  )
}
export default PostSliderCard
