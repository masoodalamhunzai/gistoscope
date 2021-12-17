/**
 * Tree Page Edit Subject Name Model
 */
import {message} from 'antd'
import {useDispatch} from 'react-redux'
import React, {useEffect, useState} from 'react'
import Modal from 'antd/lib/modal/Modal'

import './styles.css'
import {
  getSubjectNameAction,
  updateSubjectNameAction,
} from '../../store/actions/tree-action'

export const EditSubjects = props => {
  const dispatch = useDispatch()

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [subjectData, setSubjectData] = useState({
    name: '',
  })

  const {name} = subjectData

  const handleSubjectName = e => {
    setSubjectData({
      ...subjectData,
      [e.target.name]: e.target.value,
    })
  }

  /**
   * Get Subject Name from the database
   */
  useEffect(() => {
    dispatch(getSubjectNameAction(props.subjectId, setSubjectData))
  }, [])

  /**
   * Persist changed subject name in database
   */
  const editHandler = e => {
    e.preventDefault()
    const data = new FormData()
    data.append('subjectName', name)

    dispatch(
      updateSubjectNameAction(
        data,
        props.subjectId,
        message,
        props.refreshFunction,
        setIsModalVisible,
      ),
    )
  }

  return (
    <React.Fragment>
      <a onClick={() => setIsModalVisible(true)}>Edit</a>
      <Modal
        width={800}
        footer={false}
        title="Edit Subjects"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
      >
        <form className="tree-form-container" onSubmit={editHandler}>
          <h4 className="mb-5">Edit Your Subjects</h4>
          <div className="form-group tree-input-wrapper">
            <input
              type="text"
              className="form-control mb-2 border"
              id="name"
              value={name}
              name="name"
              onChange={handleSubjectName}
            />
          </div>
          <button type="submit" className="btn btn-dark mt-4 tree-submit-button">
            Submit
          </button>
        </form>
      </Modal>
    </React.Fragment>
  )
}
