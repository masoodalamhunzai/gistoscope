/**
 * Responsible for Stacking different Versions of Post one on another
 */
import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Form, message} from 'antd'
import moment from 'moment'
import NoEdits from './no-edits'
import {submitCommentAction} from '../../../store/actions/post.action'
import '../styles.css'

export const RotationComponent = props => {
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()

  const [form] = Form.useForm()
  const [commentValue, setCommentValue] = useState('')
  const [success, setSuccess] = useState('')
  const [show, setShow] = useState(false)
  const [menuPostId, setMenuPostId] = useState('')
  const [editsIndex, setEditsIndex] = useState(-1)
  const [versionsIndex, setVersionsIndex] = useState(-1)
  const [rotationId, setRotationId] = useState('')
  const [disabled, setDisabled] = useState(false)

  const nuOfEdit = props?.nuOfEdit
  const nuOfVersions = props?.nuOfVersions
  const post = props?.post
  const nuOfReply = props?.nuOfReply
  const index = props?.index
  const handleCommentSubmit = async id => {
    if (!user) {
      message.error({
        content: 'You must be logged in to post a comment!',
        style: {
          marginTop: '20vh',
        },
      })
    } else {
      const data = {
        postId: id,
        commentValue,
        timeOfSubmit: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
        userPicture: user?.userPicture,
        username: user?.username,
      }

      dispatch(submitCommentAction(data, () => {}, setCommentValue))
    }
  }

  const updatePosts = newArgu => {
    props.updateData(newArgu)
  }

  const updateIndex = newArgu => {
    props.updateIndex(newArgu)
  }

  const updateComponent = newArgu => {
    props.updateData(newArgu)
  }
  return (
    <>
      <NoEdits
        type={props.type}
        page={props.page}
        replyId={props.replyId}
        updateData={props.updateData}
        post={post}
        updateIndex={updateIndex}
        index={index}
        disabled={disabled}
        setShow={setShow}
        show={show}
        setSuccess={setSuccess}
        editsIndex={editsIndex}
        rotationId={rotationId}
        nuOfEdit={nuOfEdit}
        user={user}
        nuOfReply={nuOfReply}
        setEditsIndex={setEditsIndex}
        setRotationId={setRotationId}
        nuOfVersions={nuOfVersions}
        setVersionsIndex={setVersionsIndex}
        versionsIndex={versionsIndex}
        setMenuPostId={setMenuPostId}
        updatePosts={updatePosts}
        onModelOpen={data => setDisabled(data)}
        menuPostId={menuPostId}
        success={success}
        form={form}
        handleCommentChange={e => setCommentValue(e.target.value)}
        handleCommentSubmit={handleCommentSubmit}
        commentValue={commentValue}
        updateComponent={updateComponent}
      />
    </>
  )
}
