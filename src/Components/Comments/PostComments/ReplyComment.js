/**
 * Nested comment replies
 */
import React from 'react'
import {Comment} from 'antd'
import CommentDateTime from '../comment-date-time'
import {useSelector} from 'react-redux'

import CommentAction from '../comment-actions'

export const ReplyComment = props => {
  const user = useSelector(state => state.user.user)
  return (
    <React.Fragment>
      <span>
        {props?.CommentList.map(reply => (
          <Comment
            key={reply.id}
            className="comment-component"
            actions={[<CommentAction key={reply.commentId} comment={reply} />]}
            content={<p>{reply.text}</p>}
            datetime={
              <CommentDateTime
                refreshFunction={props?.refreshFunction}
                comment={reply}
                postId={reply?.postId}
                user={user}
              />
            }
          />
        ))}
      </span>
    </React.Fragment>
  )
}
