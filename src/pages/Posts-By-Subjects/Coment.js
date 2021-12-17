import React from 'react'
import { Comment, Avatar, Dropdown, Input, Button } from 'antd'

const Coment = props => {
  return (
    <div className="mt-0 pt-0 comment-box ml-4">
      <Comment
        className="postbysubject-comment-container"
        avatar={
          <Avatar
            src={props?.isAuthenticated()?.userPicture}
            alt={props?.isAuthenticated()?.username}
          />
        }
        content={
          <React.Fragment>
            <Dropdown overlay={props?.menu} trigger={['click']}>
              <Input
                onMouseEnter={() => props?.setMenuPostId(props?.post?.id)}
                placeholder="Can say it better. Tell us!"
                className="postbysubject-dropdown-input"
              />
            </Dropdown>
            <Button
              size="small"
              className="postbysubject-dropdown-button"
              htmlType="submit"
            >
              Post
            </Button>
          </React.Fragment>
        }
      />
    </div>
  )
}

export default Coment
