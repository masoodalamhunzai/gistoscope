import * as React from 'react'
import { Button, Comment, Input, Dropdown, Menu } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import { CreateEdits } from '../Edits/CreateEdits'
import { CreateVersions } from '../Versions/CreateVersions'
import { CreateReplies } from '../Replies/CreateReplies'

function PostReplies({
  type,
  updateData,
  replyId,
  post,
  nuOfReply,
  user,
  setMenuPostId,
  updatePosts,
  onModelOpen,
  menuPostId,
}) {
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <CreateEdits
          refreshFunction={updatePosts}
          onModelOpen={onModelOpen}
          refresh={updateData}
          postId={menuPostId}
        />
      </Menu.Item>
      <Menu.Item key="1">
        <CreateVersions
          refreshFunction={updatePosts}
          onModelOpen={onModelOpen}
          postId={menuPostId}
        />
      </Menu.Item>
      <Menu.Item key="2">
        <CreateReplies
          refreshFunction={updatePosts}
          onModelOpen={onModelOpen}
          postId={type === 'childReplies' ? replyId : menuPostId}
        />
      </Menu.Item>
    </Menu>
  )

  return (
    <React.Fragment>
      <div className="reply-post-container">
        <p>Replies {nuOfReply && <span>({nuOfReply.length})</span>}</p>
      </div>
      <div className="comment-box">
        <Comment
          style={{ height: '40px' }}
          avatar={<Avatar src={user?.userPicture} alt={user?.username} />}
          content={
            <React.Fragment>
              <Dropdown overlay={menu} trigger={['click']}>
                <Input
                  onMouseEnter={() => setMenuPostId(post?.id)}
                  placeholder="Can say it better. Tell us!"
                  style={{ width: '140%', borderRadius: '23px' }}
                />
              </Dropdown>
              <Button size="small" className="reply-post-button" htmlType="submit">
                Post
              </Button>
            </React.Fragment>
          }
        />
      </div>
    </React.Fragment>
  )
}

export default PostReplies
