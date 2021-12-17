/**
 * Renders Individual Posts page
 */
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { ArrowLeftOutlined, MessageOutlined } from '@ant-design/icons'
import { Button, Comment, Form, message } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import ImageResize from 'quill-image-resize-module-react'
import ReactQuill, { Quill } from 'react-quill'

import toolbarContainer from '../../Components/text-editor-styles.js'
import PostOwner from './post-owner.js'
import { restoreUserAction } from '../../store/actions/user-action.js'

import './styles.css'
import 'react-quill/dist/quill.snow.css'
import CommentForm from './comment-form.js'
import PostForm from './post-form.js'
import PostComments from './post-comments.js'
import {
  createNewPostAction,
  getIndividualPostAction,
  submitCommentAction,
} from '../../store/actions/post.action.js'
Quill.register('modules/imageResize', ImageResize)

export const IndPost = React.memo(props => {
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  const history = useHistory()

  const postId = props.match.params.id
  const [loading, setLoading] = useState(true)
  const [commentValue, setCommentValue] = useState('')
  const [form] = Form.useForm()
  const [description, setDescription] = useState('')
  const [post, setPost] = useState({})
  const [success, setSuccess] = useState('')
  const [menuPostId, setMenuPostId] = useState('')
  const [show, setShow] = useState(false)
  const [, setDisabled] = useState(false)

  const getPost = async () => {
    dispatch(getIndividualPostAction(postId, setPost, setDescription, message))
  }

  useEffect(() => {
    dispatch(restoreUserAction())
    setTimeout(() => {
      setLoading(false)
    }, 0)

    getPost()

    !user && !loading && props.history.push('/login')

    if (user && user.verification === false) {
      props.history.push('/verify-email')
    }
  }, [])

  /**
   * create new post comment in database
   */
  const handleCommentSubmit = async () => {
    if (!user) {
      message.error({
        content: 'You must be logged in to post a comment!',
        style: {
          marginTop: '20vh',
        },
      })
    } else {
      const data = {
        postId: postId,
        commentValue,
        timeOfSubmit: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
        userPicture: user?.userPicture,
        username: user?.username,
      }

      dispatch(submitCommentAction(data, getPost, setCommentValue))
    }
  }

  /**
   * create new post in database
   */
  const submitHandler = e => {
    e.preventDefault()
    const data = new FormData()
    data.append('title', post.title)
    data.append('summary', post.summary)
    data.append('description', description)
    data.append('parentId', post.id)
    data.append('timeOfPost', moment().format('dddd, MMMM Do YYYY, h:mm:ss a'))

    const dummy = () => { }
    dispatch(createNewPostAction(data, message, dummy, dummy, dummy))
  }

  return loading ? null : (
    <div className="individual-post ipost-container">
      <div className="pb-4 ipost-back-button-wrapper">
        {/* <Link onClick={() => history.goBack()}>
          <ArrowLeftOutlined className="ipost-back-icon" />
        </Link> */}
      </div>
      <div className="w-75 post-container mt-5">
        <div className="pb-4 ipost-title-container">
          <p className="text-white py-4 mb-0 px-4 ipost-title">{post.title}</p>
          <h6 className="text-white px-2 py-3 mb-0 px-4 ipost-summary">{post.summary}</h6>
          <div className="ipost-body">
            <div className="px-4">
              <PostOwner post={post} />
            </div>
            <div className="my-3">
              {console.log(description, "description")}
              <ReactQuill
                modules={toolbarContainer}
                placeholder="Post Description"
                theme="snow"
              // value={description}
              // onChange={value => setDescription(value)}
              />
            </div>
            <div className="float-right mr-2">
              <Button className="mb-2" type="primary" onClick={submitHandler}>
                Save as a new post
              </Button>
            </div>
            <div className="mt-5 pt-3 pl-2">
              <div className="card-bottom-icons ipost-bottom-icons">
                <span
                  onClick={() => {
                    setSuccess(post?.id)
                    setShow(!show)
                  }}
                >
                  <MessageOutlined className="comment-icon ipost-message-outlined-icon" />
                  Comment
                  {post.comments && <span>({post?.comments?.length})</span>}
                </span>
              </div>
            </div>
            <div className="ml-3 comment-row mt-3 row">
              <div className="col-md-6 col-sm-6">
                <Comment
                  avatar={<Avatar src={user?.userPicture} alt={user?.username} />}
                  content={
                    <CommentForm
                      commentValue={commentValue}
                      form={form}
                      handleCommentSubmit={handleCommentSubmit}
                      post={post}
                      setCommentValue={setCommentValue}
                    />
                  }
                />
              </div>
              <div className="col-md-6 col-sm-6">
                <PostForm
                  getPost={getPost}
                  menuPostId={menuPostId}
                  post={post}
                  setDisabled={setDisabled}
                  setMenuPostId={setMenuPostId}
                  user={user}
                />
              </div>
            </div>
            <div className="ml-4">
              {success === post.id && show
                ? post.comments &&
                post.comments.length > 0 &&
                post.comments.map(com => (
                  <PostComments
                    comment={com}
                    getPost={getPost}
                    post={post}
                    key={com.id}
                  />
                ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})
