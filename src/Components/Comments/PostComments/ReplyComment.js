/**
 * Nested comment replies
 */
import React from 'react'

import { SingleComment } from './SingleComment'

export const ReplyComment = props => {
  console.log(props?.CommentList?.text, "props", props?.ParentCommentId)
  return (
    <React.Fragment>
      <span>Replied:{props?.CommentList?.text}</span>
      {/* {props?.CommentList &&
        props?.CommentList?.comments &&
        props?.CommentList?.comments?.length > 0 &&
        props?.CommentList?.comments?.map(com => {
          return (
            <React.Fragment key={com?.commentId}>
              {com.responseTo === props?.ParentCommentId && (
                <div>
                  <SingleComment
                    comment={com}
                    postId={props?.postId}
                    parentId={props?.parentId}
                    refreshFunction={props?.refreshFunction}
                  />
                  <ReplyComment
                    CommentList={props?.CommentList}
                    parentId={props?.parentId}
                    ParentCommentId={com?.commentId}
                    postId={props?.postId}
                    refreshFunction={props?.refreshFunction}
                  />
                </div>
              )}
            </React.Fragment>
          )
        })} */}
    </React.Fragment>
  )
}
