import React from 'react'
import { SingleComment } from '../../Components/Comments/PostComments/SingleComment'
import { ReplyComment } from '../../Components/Comments/PostComments/ReplyComment'
const ComentReply = props => {
  return (
    <div className="ml-4">
      {props.success === props?.child?.id && props?.show
        ? props?.child?.comments &&
        props?.child?.comments?.length > 0 &&
        props?.child?.comments.map(com => {
          return (
            !com.responseTo && (
              <React.Fragment>
                <SingleComment
                  comment={com}
                  postId={props?.child?.id}
                  refreshFunction={props?.updateComponent}
                />
                <div
                  style={{
                    marginLeft: '100px',
                  }}
                >
                  <ReplyComment
                    CommentList={props?.child}
                    ParentCommentId={com.commentId}
                    postId={props?.child?.id}
                    refreshFunction={props?.updateComponent}
                  />
                </div>
              </React.Fragment>
            )
          )
        })
        : null}
    </div>
  )
}

export default ComentReply
