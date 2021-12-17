/**
 * Tree Page tree-subjects move functionality
 */
import React, {useEffect, useState} from 'react'
import {message} from 'antd'
import {useDispatch} from 'react-redux'
import Modal from 'antd/lib/modal/Modal'
import {Tree, TreeNode} from 'react-organizational-chart'
import {getParentIdAction, moveSubjectUpAction} from '../../store/actions/tree-action'

export const MoveSubjects = props => {
  const dispatch = useDispatch()

  const subjectId = props.subjectId
  const subjects = props.subjects
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [parentId, setParentId] = useState('')

  /**
   * Persist Moved Subjects position in the database
   */
  const editHandler = e => {
    e.preventDefault()
    const data = new FormData()
    data.append('parentId', parentId)

    dispatch(
      moveSubjectUpAction(
        data,
        subjectId,
        message,
        props.refreshFunction,
        setIsModalVisible,
      ),
    )
  }

  useEffect(() => {
    dispatch(getParentIdAction(subjectId, setParentId))
  }, [])

  const Children = props => (
    <React.Fragment>
      <TreeNode
        className="px-4"
        label={
          props.childs._id === parentId ? (
            <button className="btn btn-success btn-sm">{props.childs.name} </button>
          ) : (
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setParentId(props.childs._id)}
            >
              {props.childs.name}{' '}
            </button>
          )
        }
      >
        {props.childs.children && (
          <Tree lineBorderRadius="15px" lineColor="green" lineWidth="3px">
            {renderChild(props.childs.children)}
          </Tree>
        )}
      </TreeNode>
    </React.Fragment>
  )

  const renderChild = item => item.map(it => <Children key={it} childs={it} />)

  return (
    <React.Fragment>
      <a onClick={() => setIsModalVisible(true)}>Move</a>
      <Modal
        width={800}
        footer={false}
        title="Edit Subjects"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
      >
        <form className="tree-form-container " onSubmit={editHandler}>
          <h4 className="mb-5">Edit Your Subjects</h4>
          <div className="Tree">
            <Tree
              lineBorderRadius="10px"
              lineColor="green"
              lineHeight="10px"
              lineWidth="3px"
              label={
                <a
                  role="button"
                  type="button"
                  className="btn btn-success ant-dropdown-link btn-sm px-1"
                >
                  Everything
                </a>
              }
            >
              {renderChild(subjects)}
            </Tree>
          </div>
          <button type="submit" className="btn btn-dark mt-4 tree-submit-button">
            Submit
          </button>
        </form>
      </Modal>
    </React.Fragment>
  )
}
