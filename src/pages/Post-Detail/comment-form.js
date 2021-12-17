/**
 * Post comment Form
 */
import * as React from 'react'
import {Button, Input, Form} from 'antd'

function CommentForm({setCommentValue, commentValue, form, handleCommentSubmit, post}) {
  return (
    <React.Fragment>
      <Form form={form} name="login">
        <Form.Item onChange={e => setCommentValue(e.target.value)}>
          <Input
            placeholder="Post a comment"
            className="ipost-commentbox-input"
            value={commentValue}
          />
          <Button
            onClick={() => handleCommentSubmit(post.id)}
            size="small"
            className="ipost-commentbox-button"
            htmlType="submit"
          >
            Post
          </Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  )
}
export default CommentForm
