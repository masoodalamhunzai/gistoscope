/**
 * handles Individual Post reply
 */
import * as React from 'react'

import {IndSingleComment} from './IndSingleComment'

export const IndReplyComment = props => {
  return (
    <React.Fragment>
      {props.CommentList &&
        props.CommentList.comments &&
        props.CommentList.comments.length > 0 &&
        props.CommentList.comments.map(com => {
          return (
            <React.Fragment key={com.commentId}>
              {com.responseTo === props.ParentCommentId && (
                <div>
                  <IndSingleComment
                    comment={com}
                    postId={props.postId}
                    parentId={props.parentId}
                    refreshFunction={props.refreshFunction}
                  />
                  <IndReplyComment
                    CommentList={props.CommentList}
                    ParentCommentId={com.commentId}
                    parentId={props.parentId}
                    postId={props.postId}
                    refreshFunction={props.refreshFunction}
                  />
                </div>
              )}
            </React.Fragment>
          )
        })}
    </React.Fragment>
  )
}
