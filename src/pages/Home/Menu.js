/**
 * Menu tooltop - renders when post-form of individual post is clicked
 */
import React from 'react'
import {Menu} from 'antd'
import {CreateEdits} from '../../Components/Posts/Edits/CreateEdits'
import {CreateVersions} from '../../Components/Posts/Versions/CreateVersions'
import {CreateReplies} from '../../Components/Posts/Replies/CreateReplies'

const MenuItem = ({updatePosts, onModelOpen, menuPostId}) => {
  return (
    <Menu>
      <Menu.Item key="0">
        <CreateEdits
          refreshFunction={updatePosts}
          onModelOpen={onModelOpen}
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
          postId={menuPostId}
        />
      </Menu.Item>
    </Menu>
  )
}

export default MenuItem
