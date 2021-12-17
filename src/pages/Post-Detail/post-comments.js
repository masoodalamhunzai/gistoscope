import * as React from 'react'
import {IndSingleComment} from '../../Components/Comments/PostDetailsComments/IndSingleComment'
import {IndReplyComment} from '../../Components/Comments/PostDetailsComments/IndReplyComment'

function PostComments({comment, post, getPost}) {
  return (
    !comment.responseTo && (
      <React.Fragment>
        <IndSingleComment
          comment={comment}
          postId={post.id}
          refreshFunction={() => getPost()}
        />
        <div style={{marginLeft: '100px'}}>
          <IndReplyComment
            CommentList={post}
            ParentCommentId={comment.commentId}
            postId={post.id}
            refreshFunction={() => getPost()}
          />
        </div>
      </React.Fragment>
    )
  )
}

export default PostComments
