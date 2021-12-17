/**
 * Reply to a Post
 */
import React, {useEffect, useState} from 'react'
import moment from 'moment'
import {message} from 'antd'
import {useDispatch, useSelector} from 'react-redux'
import Modal from 'antd/lib/modal/Modal'
import ReactQuill, {Quill} from 'react-quill'
import {MessageTwoTone} from '@ant-design/icons'
// import { Link } from 'react-router-dom'
import ImageResize from 'quill-image-resize-module-react'

import toolbarContainer from '../../text-editor-styles'

import 'react-quill/dist/quill.snow.css'
import '../styles.css'
import {getPostByIdAction, replyToPostAction} from '../../../store/actions/post.action'
Quill.register('modules/imageResize', ImageResize)

export const CreateReplies = props => {
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()

  const postId = props.postId
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [description, setDescription] = useState('')
  const [success, setSuccess] = useState(false)
  const [postData, setPostData] = useState({
    title: '',
    summary: '',
  })

  const {title, summary} = postData

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
      setSuccess(true)
      props.onModelOpen(true)
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    props.onModelOpen(false)
  }

  const handlePostChange = e => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    dispatch(getPostByIdAction(postId, setPostData, setDescription, message))
  }, [success])

  const submitHandler = e => {
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
     * Create a New post reply in database
     */
    dispatch(
      replyToPostAction(
        data,
        message,
        props.refreshFunction,
        setIsModalVisible,
        props.onModelOpen,
      ),
    )
  }
  return (
    <React.Fragment>
      <span className="reply-btn" onClick={showModal}>
        <MessageTwoTone /> Reply
      </span>
      <Modal
        keyboard
        className="post-model"
        width={800}
        title="Reply the post"
        visible={isModalVisible}
        footer={false}
        onCancel={handleCancel}
      >
        <div>
          <form onSubmit={submitHandler} className="text-center w-100 create-posts">
            <h4 className="mb-2 mt-4">Reply the post</h4>
            <div className="form-group mt-4">
              <input
                type="text"
                className="form-control mb-2 post-title-input "
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
    </React.Fragment>
  )
}
