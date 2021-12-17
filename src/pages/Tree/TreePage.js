import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { message, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { Tree } from 'react-organizational-chart'

/**
 * Renders Tree Page
 */
import {
  createNewSubjectAction,
  deleteSubjectAction,
  getAllSubjectsAction,
} from '../../store/actions/tree-action'
import DropDownMenu from './drop-down'
import renderChild from './render-childs'
import TreeModel from './tree-model'

import './styles.css'

export const TreePage = props => {
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [subjectId, setSubjectId] = useState('')
  const [subject, setSubject] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [subjects, setSubjects] = useState([])

  const getAllSubjects = () => {
    dispatch(getAllSubjectsAction(setSubjects, message))
  }

  const showModal = () => {
    if (!user) {
      message.error({
        content: 'You must be logged in to post a new subject!',
        style: {
          marginTop: '20vh',
        },
      })
    } else {
      setIsModalVisible(true)
    }
  }

  /**
   * Create a new subject in database
   */
  const submitHandler = e => {
    e.preventDefault()
    setLoading(true)
    // const data = new FormData()
    // data.append('name', subject)
    // console.log(subject, 'subject')
    // if (subjectId != null) {
    //   data.append('parentId', subjectId)
    // }
    const data = {
      name: subject,
      mainSubjectName: 'every parent has a child',
    }
    dispatch(
      createNewSubjectAction(
        data,
        setSuccess,
        setLoading,
        setSubjectId,
        setIsModalVisible,
        message,
      ),
    )
  }

  /**
   * Delete selected subject
   */
  const deleteHandler = async () => {
    dispatch(deleteSubjectAction(subjectId, setSuccess, message))
  }
  const updateComponent = data => {
    getAllSubjects()
  }

  useEffect(() => {
    if (user && user.verification === false) {
      props.history.push('/verify-email')
    }

    setTimeout(function () {
      window.scroll(window.screen.width / 1.5, 0)
    }, 1000)

    getAllSubjects()
  }, [success])

  const antIcon = <LoadingOutlined className="tree-page-loader" spin />

  const TreeView = () => {
    return (
      <div className="Tree">
        <Tree
          lineBorderRadius="10px"
          lineColor="green"
          lineHeight="30px"
          lineWidth="3px"
          label={
            <DropDownMenu
              setSubjectId={setSubjectId}
              showModal={showModal}
              subjectId={subjectId}
            />
          }
        >
          {renderChild(
            subjects,
            setSubjectId,
            showModal,
            subjectId,
            subjects,
            updateComponent,
            deleteHandler,
          )}
          {showModal}
        </Tree>
        {loading ? (
          <div className="text-center fixed-top tree-page-spinner-wrapper">
            <Spin indicator={antIcon} />
          </div>
        ) : (
          <TreeModel
            handleCancel={() => setIsModalVisible(false)}
            handleSubjectChange={e => setSubject(e.target.value)}
            isModalVisible={isModalVisible}
            submitHandler={submitHandler}
          />
        )}
      </div>
    )
  }

  return loading ? null : <div className="pt-5">{TreeView()}</div>
}
