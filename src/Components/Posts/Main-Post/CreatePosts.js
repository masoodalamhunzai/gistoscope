/**
 * Create a New Post
 */
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { message, Spin, TreeSelect } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import ImageResize from 'quill-image-resize-module-react'
import ReactQuill, { Quill } from 'react-quill'

import 'react-quill/dist/quill.snow.css'
import '../styles.css'

import toolbarContainer from '../../text-editor-styles'
import TreeNodeComponent from './tree-node'
import { createEditPostAction, getMainSubjects } from '../../../store/actions/post.action'

Quill.register('modules/imageResize', ImageResize)

export const CreatePosts = props => {
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()

  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [subjects, setSubjects] = useState([])
  const [postSubject, setPostSubject] = useState('')
  const [postData, setPostData] = useState({
    title: '',
    summary: '',
  })

  const { title, summary } = postData

  const handlePostChange = e => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    !user && props.history.push('/login')
    dispatch(getMainSubjects(setSubjects, message))
  }, [])

  const submitHandler = e => {
    e.preventDefault()
    setLoading(true)
    const data = new FormData()
    data.append('title', title)
    data.append('summary', summary)
    data.append('description', description)
    data.append('postSubject', postSubject)
    data.append('timeOfPost', moment().format('dddd, MMMM Do YYYY, h:mm:ss a'))

    /**
     * create new post in database
     */
    dispatch(createEditPostAction(data, setLoading, message))
  }

  const antIcon = <LoadingOutlined className="post-loader" spin />
  const treeSelectDropdownStyles = { maxHeight: 400, overflow: 'auto' }

  return loading ? (
    <div className="text-center fixed-top post-spinner-container">
      <Spin indicator={antIcon} />
    </div>
  ) : (
    <div className="create-post post-container">
      <form onSubmit={submitHandler} className="text-center w-50 create-posts">
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
        <TreeSelect
          showSearch
          className="post-tree-select"
          dropdownStyle={treeSelectDropdownStyles}
          placeholder="Please select"
          allowClear
          treeDefaultExpandAll
          onChange={value => setPostSubject(value)}
        >
          {subjects.map(subj => (
            <TreeNodeComponent key={subj._id} subject={subj} />
          ))}
        </TreeSelect>
        <div className="my-3">
          <ReactQuill
            modules={toolbarContainer}
            className="post-editor"
            placeholder="Post Description"
            theme="snow"
            value={description}
            onChange={value => setDescription(value)}
          />
        </div>
        <div className="post-button">
          <button type="submit" size="large" className="btn btn-outline-dark w-75 mb-4">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
