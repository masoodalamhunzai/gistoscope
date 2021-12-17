import React from 'react'
import { Comment, Avatar, Input, Button } from 'antd'
import Form from 'rc-field-form/es/Form'

const ComentDialouge = props => {
  return (
    <>
      {props?.success === props?.child?.id && props?.show && (
        <div className="ml-3 mt-3 row">
          <div className="col-md-6 col-sm-6">
            <Comment
              avatar={
                <Avatar
                  src={props?.isAuthenticated()?.userPicture}
                  alt={props?.isAuthenticated()?.username}
                />
              }
              content={
                <React.Fragment>
                  <Form form={props?.form} name="login">
                    <Form.Item onChange={props?.handleCommentChange}>
                      <Input
                        placeholder="Post a comment"
                        className="postbysubject-comment-dialog-input"
                        value={props?.commentValue}
                      />
                      <Button
                        onClick={() => props?.handleCommentSubmit(props?.child?.id)}
                        size="small"
                        className="postbysubject-comment-dialog-button"
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
      )}
    </>
  )
}
export default ComentDialouge
