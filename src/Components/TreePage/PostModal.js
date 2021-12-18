/**
 * Tree Page Create new Post Model
 */
import React, {useState} from 'react'
import {message, Spin} from 'antd'
import {useDispatch, useSelector} from 'react-redux'
import {ConsoleSqlOutlined, LoadingOutlined} from '@ant-design/icons'
import moment from 'moment'
import ReactQuill, {Quill} from 'react-quill'
import ImageResize from 'quill-image-resize-module-react'
import Modal from 'antd/lib/modal/Modal'

import toolbarContainer from '../text-editor-styles'

import 'react-quill/dist/quill.snow.css'
import {createNewPostAction} from '../../store/actions/tree-action'

Quill.register('modules/imageResize', ImageResize)

export const PostModal = React.memo(props => {
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  const subjectId = props?.subjectId
  const parentId = parseInt(props?.parentId)
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [postData, setPostData] = useState({
    title: '',
    summary: '',
  })

  const {title, summary} = postData

  const handlePostChange = e => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    })
  }

  const showModal = () => {
    if (!user) {
      message.error({
        content: 'You must be logged in to post a new gist!',
        style: {
          marginTop: '20vh',
        },
      })
    } else {
      setIsModalVisible(true)
    }
  }

  /**
   * Creates New Post
   */
  const submitHandler = async e => {
    e.preventDefault()
    setLoading(true)
    const data = {
      title,
      summary,
      description,
      subjectId,
      parentId,
      timeOfPost: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
    }
    dispatch(createNewPostAction(data, message, setLoading))
  }

  const antIcon = <LoadingOutlined className="tree-loader" spin />

  return loading ? (
    <div className="text-center fixed-top tree-spinner-wrapper ">
      <Spin indicator={antIcon} />
    </div>
  ) : (
    <React.Fragment>
      <a onClick={showModal}>Add a Post</a>
      <Modal
        width={800}
        footer={false}
        title="Create a New Post"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
      >
        <div className="create-post">
          <form onSubmit={submitHandler} className="text-center w-100 create-posts">
            <h4 className="mb-2 mt-4">Create a Post</h4>
            <div className="form-group mt-4">
              <input
                type="text"
                className="form-control mb-2"
                id="title"
                name="title"
                placeholder="Enter Post Title"
                onChange={handlePostChange}
              />
            </div>

            <div className="form-group mt-2">
              <input
                type="text"
                className="form-control mb-2"
                id="summary"
                name="summary"
                placeholder="Enter Post Summary"
                onChange={handlePostChange}
              />
            </div>
            <div className="my-3">
              <ReactQuill
                modules={toolbarContainer}
                className="tree-text-editor-styles"
                placeholder="Post Description"
                theme="snow"
                value={description}
                onChange={value => setDescription(value)}
              />
            </div>
            <div className="tree-button-wrapper">
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
})
