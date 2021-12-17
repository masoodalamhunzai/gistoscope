/**
 * Individual page post comment reply form and drop down menu
 */
import * as React from 'react'
import { Button, Comment, Input, Dropdown, Menu } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import { CreateEdits } from '../../Components/Posts/Edits/CreateEdits'
import { CreateReplies } from '../../Components/Posts/Replies/CreateReplies'
import { CreateVersions } from '../../Components/Posts/Versions/CreateVersions'

function PostForm({ user, setMenuPostId, post, getPost, setDisabled, menuPostId }) {
  const menu = (
    <Menu style={{ position: 'absolute' }}>
      <Menu.Item key="0">
        <CreateEdits
          refreshFunction={() => getPost()}
          onModelOpen={data => setDisabled(data)}
          postId={menuPostId}
        />
      </Menu.Item>
      <Menu.Item key="1">
        <CreateVersions
          refreshFunction={() => getPost()}
          onModelOpen={data => setDisabled(data)}
          postId={menuPostId}
        />
      </Menu.Item>
      <Menu.Item key="2">
        <CreateReplies
          refreshFunction={() => getPost()}
          onModelOpen={data => setDisabled(data)}
          postId={menuPostId}
        />
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      <Comment
        avatar={<Avatar src={user?.userPicture} alt={user?.username} />}
        content={
          <React.Fragment>
            <Dropdown overlay={menu} trigger={['click']}>
              <Input
                onMouseOver={() => setMenuPostId(post.id)}
                placeholder="Can say it better. Tell us!"
                className="ipost-commentbox-input"
              />
            </Dropdown>
            <Button size="small" className="ipost-postbox-button" htmlType="submit">
              Post
            </Button>
          </React.Fragment>
        }
      />
    </>
  )
}

export default PostForm
