import React from 'react'
import { useSelector } from 'react-redux'
import Avatar from 'antd/lib/avatar/avatar'
import { Button, Comment, Input, Form } from 'antd'

function PostReply({ form, handleCommentChange, commentValue, handleCommentSubmit, handleGetComments, post }) {
  const user = useSelector(state => state.user.user)


  const handleComment = () => {
    setTimeout(() => {
      handleGetComments();
    }, 3000);
  }

  return (
    <div className="ml-3 mt-3 row">
      <div className="col-md-6 col-sm-6">
        <Comment
          avatar={<Avatar src={user?.userPicture} alt={user?.username} />}
          content={
            <Form form={form} name="login" className='w-100'>
              <Form.Item onChange={handleCommentChange}>
                <Input
                  placeholder="Post a comment"
                  className="reply-form-container "
                  value={commentValue}
                />
                <span onClick={handleComment}>
                  <Button
                    onClick={() => { handleCommentSubmit(post?.id) }}
                    size="small"
                    className="reply-form-submit-button"
                    htmlType="submit"
                  >
                    Post
                  </Button>
                </span>
              </Form.Item>
            </Form>
          }
        />
      </div>
    </div>
  )
}

export default PostReply
