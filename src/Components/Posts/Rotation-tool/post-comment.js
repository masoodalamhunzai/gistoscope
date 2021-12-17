import * as React from 'react'
import { Button, Comment, Input, Form } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'

function PostComment({
  user,
  handleCommentChange,
  handleCommentSubmit,
  nuOfVersions,
  versionsIndex,
  commentValue,
  form,
}) {
  return (
    <div className="ml-3 mt-3 row">
      <div className="col-md-6 col-sm-6">
        <div>
          <Comment
            avatar={<Avatar src={user?.userPicture} alt={user?.username} />}
            content={
              <React.Fragment>
                <Form form={form} name="login">
                  <Form.Item onChange={handleCommentChange}>
                    <Input
                      placeholder="Post a comment"
                      className="post-comment-input"
                      value={commentValue}
                    />
                    <Button
                      onClick={() =>
                        handleCommentSubmit(nuOfVersions[versionsIndex]?.id)
                      }
                      size="small"
                      className="post-comment-submit-button"
                      htmlType="submit"
                    >
                      Post
                    </Button>
                  </Form.Item>
                </Form>
              </React.Fragment>
            }
          />
        </div>
      </div>
    </div>
  )
}

export default PostComment
