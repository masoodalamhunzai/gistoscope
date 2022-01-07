/**
 * Handles Delete Comment
 */

import * as React from 'react'
import {Tooltip} from 'antd'
// import { Link } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {DeleteOutlined} from '@ant-design/icons'

import {deleteCommentAction} from '../../store/actions/comment-action'

import './styles.css'

function CommentDateTime({comment, user, postId, refreshFunction}) {
  const dispatch = useDispatch()

  /**
   * Delete comment from database
   */
  const commentDeleteHanlder = async () => {
    const data = {postId, commentId: comment?.commentId}
    dispatch(deleteCommentAction(data, refreshFunction, user))
  }

  return (
    <span className="ml-5">
      {comment?.userId === user?.id && (
        <span className="comment-date-time">
          <span onClick={() => commentDeleteHanlder(comment?.commentId)}>
            <Tooltip title="Delete">
              <DeleteOutlined />
            </Tooltip>
          </span>
        </span>
      )}
    </span>
  )
}
export default CommentDateTime
