/**
 * Render comment meta
 */
import * as React from 'react'
import moment from 'moment'
// import {Link} from 'react-router-dom'

import './styles.css'

function CommentAction({comment, openReply, setOpenReply}) {
  let commentCreateTime = new Date(comment?.timeOfSubmit)
  return (
    <div>
      <span className="comment-date">
        {moment(commentCreateTime, 'dddd, MMMM Do YYYY, h:mm:ss a').fromNow()}
      </span>
      <span>
        {openReply === true ||
          (openReply === false && (
            <span className="comment-link-text" onClick={() => setOpenReply(!openReply)}>
              Reply
            </span>
          ))}
      </span>
    </div>
  )
}
export default CommentAction
