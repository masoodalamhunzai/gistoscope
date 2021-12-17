/**
 * Tree Node(subject) drop down menu
 */
import * as React from 'react'
import {Dropdown, Menu} from 'antd'
import {Link} from 'react-router-dom'
import {PostModal} from '../../Components/TreePage/PostModal'

function DropDownMenu({showModal, subjectId, setSubjectId}) {
  const everythingMenu = (
    <Menu>
      <Menu.Item key="0">
        <Link onClick={showModal}>Add a Subject</Link>
      </Menu.Item>
      <Menu.Item key="1">
        <PostModal subjectId={subjectId} />
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/">View Posts</Link>
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={everythingMenu} trigger={['click']}>
      <Link
        onMouseOver={() => setSubjectId(111)}
        role="button"
        type="button"
        className="btn btn-success ant-dropdown-link btn-sm px-1"
      >
        Everything
      </Link>
    </Dropdown>
  )
}

export default DropDownMenu
