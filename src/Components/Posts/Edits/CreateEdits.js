/**
 * Edit existing post and create a new Version
 */
import React, {memo, useEffect, useState} from 'react'
import moment from 'moment'
import {message} from 'antd'
// import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import ReactQuill, {Quill} from 'react-quill'
import Modal from 'antd/lib/modal/Modal'
import {EditOutlined} from '@ant-design/icons'
import ImageResize from 'quill-image-resize-module-react'

import toolbarContainer from '../../text-editor-styles'
import {createNewPostAction, editPostAction} from '../../../store/actions/post.action'

import 'react-responsive-modal/styles.css'
import 'react-quill/dist/quill.snow.css'
import '../styles.css'

Quill.register('modules/imageResize', ImageResize)

export const CreateEdits = memo(props => {
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()

  const postId = props.postId
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [description, setDescription] = useState('')
  const [postData, setPostData] = useState(null)
  const [edit, setEdit] = useState({
    title: '',
    summary: '',
  })

  const {title, summary} = edit
  const showModal = () => {
    if (!user) {
      message.error({
        content: 'You must be logged in!',
        style: {
          marginTop: '20vh',
        },
      })
    } else {
      props.onModelOpen(true)
      setIsModalVisible(true)
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    props.onModelOpen(false)
  }

  const handlePostChange = e => {
    setEdit({
      ...edit,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    dispatch(editPostAction(postId, setPostData, setDescription, message))
  }, [])

  const submitHandler = async e => {
    e.preventDefault()
    // const data = new FormData()
    // data.append('title', title)
    // data.append('summary', summary)
    // data.append('description', description)
    // data.append('parentId', postId)
    // data.append('timeOfPost', moment().format('dddd, MMMM Do YYYY, h:mm:ss a'))

    const data = {
      title,
      summary,
      description,
      postId,
      parentId: postId,
      subjectId: postId,
      timeOfPost: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
    }

    /**
     * Persist edited post in database
     */
    dispatch(
      createNewPostAction(
        data,
        message,
        props.refreshFunction,
        setIsModalVisible,
        props.onModelOpen,
      ),
    )
  }

  return (
    <div className="create-edits">
      <span className="reply-btn" onClick={showModal}>
        <EditOutlined className="pr-2" /> Create Edit
      </span>
      <Modal
        width={800}
        title="Edit the Post"
        visible={isModalVisible}
        footer={false}
        onCancel={handleCancel}
      >
        <div>
          <form onSubmit={submitHandler} className="text-center w-100 create-posts">
            <h4 className="mb-2 mt-4">Edit the Post</h4>
            <div className="form-group mt-4">
              <input
                // disabled
                type="text"
                className="form-control mb-2 post-title-input"
                id="title"
                name="title"
                value={title}
                placeholder="Enter Post Title"
                onChange={handlePostChange}
              />
            </div>

            <div className="form-group mt-2">
              <input
                type="text"
                className="form-control mb-2 post-summary-input"
                id="summary"
                name="summary"
                value={summary}
                placeholder="Enter Post Summary"
                onChange={handlePostChange}
              />
            </div>
            <div className="my-3">
              <ReactQuill
                className="post-editor"
                modules={toolbarContainer}
                placeholder="Post Description"
                theme="snow"
                value={description || ' '}
                onChange={value => setDescription(value)}
              />
            </div>
            <div className="post-button">
              <button
                type="submit"
                size="large"
                className="btn btn-outline-dark w-75 mb-4"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  )
})
