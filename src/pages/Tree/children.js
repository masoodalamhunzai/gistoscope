/**
 * Individual Tree Node
 */
import * as React from 'react'
import {Dropdown, Menu} from 'antd'
import {Tree, TreeNode} from 'react-organizational-chart'
import {Link, useHistory} from 'react-router-dom'
import {EditSubjects} from '../../Components/TreePage/EditSubjects'
import {MoveSubjects} from '../../Components/TreePage/MoveSubjects'
import {PostModal} from '../../Components/TreePage/PostModal'
import renderChild from './render-childs'
import {useSelector} from 'react-redux'

function Children({
  childs,
  setSubjectId,
  showModal,
  subjectId,
  parentId,
  subjects,
  updateComponent,
  deleteHandler,
}) {
  const history = useHistory()
  const user = useSelector(state => state.user.user)

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link onClick={showModal}>Add a Subject</Link>
      </Menu.Item>
      <Menu.Item key="1">
        <PostModal subjectId={subjectId} parentId={parentId} />
      </Menu.Item>
      <Menu.Item key="2">
        <a
          onClick={() => {
            history.push('/subject/' + subjectId)
          }}
        >
          View Posts
        </a>
      </Menu.Item>
      {user?.role === 1 && (
        <React.Fragment>
          <Menu.Item key="3">
            <EditSubjects
              subjectId={subjectId}
              subjects={subjects}
              refreshFunction={updateComponent}
            />
          </Menu.Item>
          <Menu.Item key="4">
            <MoveSubjects
              subjectId={subjectId}
              subjects={subjects}
              refreshFunction={updateComponent}
            />
          </Menu.Item>
          <Menu.Item key="5">
            <Link onClick={deleteHandler}>Delete</Link>
          </Menu.Item>
        </React.Fragment>
      )}
    </Menu>
  )

  return (
    <React.Fragment>
      <TreeNode
        className="px-4"
        label={
          <Dropdown overlay={menu} trigger={['click']}>
            <Link
              onMouseOver={() => setSubjectId(childs.id)}
              className="btn btn-primary ant-dropdown-link btn-sm"
            >
              <span>{childs.name} </span>
            </Link>
          </Dropdown>
        }
      >
        {childs.children && (
          <Tree lineBorderRadius="15px" lineColor="green" lineWidth="3px">
            {renderChild(
              childs.children,
              setSubjectId,
              showModal,
              subjectId,
              subjects,
              updateComponent,
              deleteHandler,
            )}
          </Tree>
        )}
      </TreeNode>
    </React.Fragment>
  )
}

export default Children
