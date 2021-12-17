import React, {Fragment, memo, useEffect, useState} from 'react'
import moment from 'moment'
import {message, Modal} from 'antd'
import ReactQuill, {Quill} from 'react-quill'
import {useDispatch, useSelector} from 'react-redux'
import ImageResize from 'quill-image-resize-module-react'
import {BookOutlined} from '@ant-design/icons'
// import { Link } from 'react-router-dom'

import toolbarContainer from '../../text-editor-styles'

import 'react-quill/dist/quill.snow.css'
import {
  createANewPostVersion,
  getPostByIdAction,
} from '../../../store/actions/post.action'

import '../styles.css'

Quill.register('modules/imageResize', ImageResize)

export const CreateVersions = memo(props => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()

  const postId = props?.postId
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [description, setDescription] = useState('')
  const [, setLoading] = useState(false)
  const [postData, setPostData] = useState(null)
  const [version, setVersion] = useState({
    title: '',
    summary: '',
  })

  const {title, summary} = version
  const showModal = () => {
    if (!user) {
      message.error({
        content: 'You must be logged in!',
        style: {
          marginTop: '20vh',
        },
      })
    } else {
      setIsModalVisible(true)
      props.onModelOpen(true)
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    props.onModelOpen(false)
  }
  const handlePostChange = e => {
    setVersion({
      ...version,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    dispatch(getPostByIdAction(postId, setPostData, setDescription, message))
  }, [])

  const submitHandler = e => {
    e.preventDefault()
    setLoading(true)
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
     * Create a new post version in database
     */
    dispatch(
      createANewPostVersion(
        data,
        props.refreshFunction,
        props.onModelOpen,
        setLoading,
        setIsModalVisible,
        message,
      ),
    )
  }

  return (
    <Fragment>
      <span className="reply-btn" onClick={showModal}>
        <BookOutlined className="pr-2" /> Create Version
      </span>
      <Modal
        width={800}
        title="Create Version"
        visible={isModalVisible}
        footer={false}
        onCancel={handleCancel}
      >
        <form onSubmit={submitHandler} className="text-center w-100 create-posts">
          <h4 className="mb-2 mt-4">Create Version</h4>
          <div className="form-group mt-4">
            <input
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
              modules={toolbarContainer}
              className="post-editor"
              placeholder="Post Description"
              theme="snow"
              value={description || ''}
              onChange={value => setDescription(value)}
            />
          </div>
          <div className="post-button">
            <button type="submit" size="large" className="btn btn-outline-dark w-75 mb-4">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </Fragment>
  )
})
