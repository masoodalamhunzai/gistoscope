/**
 * Renders comments of each post
 */
import React, {Fragment, useState} from 'react'
import moment from 'moment'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Comment, Input, message, Avatar, Form} from 'antd'

import CommentAction from '../comment-actions'
import CommentDateTime from '../comment-date-time'
import {createNewCommentAction} from '../../../store/actions/comment-action'

import '../styles.css'

export const SingleComment = props => {
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()

  const [form] = Form.useForm()
  const [openReply, setOpenReply] = useState(false)
  const [commentValue, setCommentValue] = useState('')

  /**
   * add new comment to database
   */
  const handleSingleCommentSubmit = async () => {
    if (!user) {
      message.error({
        content: 'You must be logged in to post a comment!',
        style: {
          marginTop: '20vh',
        },
      })
    } else {
      const data = {
        postId: props?.postId,
        responseTo: props?.comment?.commentId,
        commentValue,
        timeOfSubmit: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
        userPicture: user.userPicture,
        username: user.username,
      }

      dispatch(
        createNewCommentAction(
          data,
          props.refreshFunction,
          setOpenReply,
          setCommentValue,
          openReply,
          user,
        ),
      )
    }
  }
  console.log(props, 'props')
  return (
    <React.Fragment>
      <div className="single-comment">
        <Comment
          className="comment-component"
          actions={[
            <CommentAction
              key={props?.comment.commentId}
              comment={props?.comment}
              openReply={openReply}
              setOpenReply={setOpenReply}
            />,
          ]}
          author={
            <h6>{props?.comment?.username ? props?.comment?.username : 'no username'}</h6>
          }
          avatar={
            <Avatar src={props?.comment?.userPicture} alt={props?.comment?.username} />
          }
          content={<p>{props?.comment?.text}</p>}
          datetime={
            <CommentDateTime
              refreshFunction={props?.refreshFunction}
              comment={props?.comment}
              postId={props?.postId}
              user={user}
            />
          }
        />
        {openReply && (
          <Comment
            avatar={<Avatar src={user?.userPicture} alt={user?.username} />}
            content={
              <Fragment>
                <Form form={form} name="Comment" onFinish={handleSingleCommentSubmit}>
                  <Form.Item onChange={e => setCommentValue(e.target.value)}>
                    <Input className="comment-input-styles" value={commentValue} />
                    <Button className="comment-button-styles" htmlType="submit">
                      Post
                    </Button>
                  </Form.Item>
                </Form>
              </Fragment>
            }
          />
        )}
      </div>
    </React.Fragment>
  )
}
