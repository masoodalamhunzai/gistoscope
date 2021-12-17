/**
 * Responsible for Stacking different Versions of Post one on another
 */
import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Form, message} from 'antd'
import moment from 'moment'
import {
  CheckCircleFilled,
  FlagFilled,
  MessageOutlined,
  VerifiedOutlined,
} from '@ant-design/icons'

import NoEdits from './no-edits'
import PostComment from './post-comment'
import PostEdit from './post-edits'
import PostVersion from './post-versions'
import PostReplies from './post-replies'
import PostHeader from './post-header'
import PostReply from './reply-form'

import {SingleComment} from '../../Comments/PostComments/SingleComment'
import {ReplyComment} from '../../Comments/PostComments/ReplyComment'
import {submitCommentAction} from '../../../store/actions/post.action'

import '../styles.css'
import RotationBody from './post-body'

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
  const mainPostTopSpacing = props?.mainPostTopSpacing
  const mainPostSpacing = props?.mainPostSpacing
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
  // console.log(nuOfVersions, "nuOfVersions")
  return (
    <>
      {editsIndex !== -1 ? (
        <div
          className="handle protational-container"
          style={{
            top: mainPostTopSpacing,
            left: mainPostSpacing,
          }}
        >
          <div className="pb-4 protation-sub-container">
            <div className="protation-header-container">
              <PostHeader nuOfVersions={nuOfVersions} versionsIndex={versionsIndex} />
              <div className="text ml-4" style={{position: 'relative'}}>
                <span
                  id="content"
                  dangerouslySetInnerHTML={{
                    __html:
                      nuOfEdit[editsIndex].description.length > 404
                        ? nuOfEdit[editsIndex].description.substring(0, 404) + '...'
                        : nuOfEdit[editsIndex].description,
                  }}
                ></span>
                <span
                  className="protation-full-post-view-link"
                  // to={'/post/' + nuOfEdit[editsIndex]?.id}
                >
                  {' '}
                  (More)
                </span>
              </div>
              {props.page === 'users-page' && (
                <div className="float-right moderator-icons mr-4">
                  <FlagFilled className="protation-flat" />
                  <VerifiedOutlined className="protation-version" />
                  <CheckCircleFilled className="protation-circle" />
                </div>
              )}

              <div className="border-top mt-5 pt-3 pl-2">
                <div className="card-bottom-icons protation-bottom-icons-card">
                  <span
                    onClick={() => {
                      setSuccess(nuOfEdit[editsIndex]?.id)
                      setShow(!show)
                    }}
                  >
                    Comments{' '}
                    {nuOfEdit[editsIndex]?.comments && (
                      <span>({nuOfEdit[editsIndex]?.comments?.length})</span>
                    )}
                  </span>
                  <PostEdit
                    editsIndex={editsIndex}
                    nuOfEdit={nuOfEdit}
                    post={post}
                    rotationId={rotationId}
                    setEditsIndex={setEditsIndex}
                    setRotationId={setRotationId}
                  />
                  <PostVersion
                    nuOfVersions={nuOfVersions}
                    post={post}
                    rotationId={rotationId}
                    setRotationId={setRotationId}
                    setVersionsIndex={setVersionsIndex}
                    versionsIndex={versionsIndex}
                  />
                  <PostReply
                    commentValue={commentValue}
                    form={form}
                    handleCommentChange={e => setCommentValue(e.target.value)}
                    handleCommentSubmit={handleCommentSubmit}
                    post={post}
                  />
                </div>
              </div>
              {success === nuOfEdit[editsIndex].id && show && (
                <PostComment
                  commentValue={commentValue}
                  form={form}
                  handleCommentChange={e => setCommentValue(e.target.value)}
                  handleCommentSubmit={handleCommentSubmit}
                  nuOfVersions={nuOfVersions}
                  user={user}
                  versionsIndex={versionsIndex}
                />
              )}
              <div className="ml-4">
                {success === nuOfEdit[editsIndex].id && show
                  ? nuOfEdit[editsIndex]?.comments &&
                    nuOfEdit[editsIndex]?.comments?.length > 0 &&
                    nuOfEdit[editsIndex]?.comments.map(com => {
                      return (
                        !com.responseTo && (
                          <React.Fragment>
                            <SingleComment
                              comment={com}
                              postId={nuOfEdit[editsIndex]?.id}
                              refreshFunction={updateComponent}
                            />
                            <div style={{marginLeft: '100px'}}>
                              <ReplyComment
                                CommentList={nuOfEdit[editsIndex]}
                                ParentCommentId={com.commentId}
                                refreshFunction={updateComponent}
                                postId={nuOfEdit[editsIndex]?.id}
                              />
                            </div>
                          </React.Fragment>
                        )
                      )
                    })
                  : null}
              </div>
            </div>
          </div>
        </div>
      ) : versionsIndex !== -1 ? (
        <RotationBody
          page={props.page}
          type={props.type}
          updateData={props.updateData}
          replyId={props.replyId}
          disabled={disabled}
          mainPostSpacing={mainPostSpacing}
          mainPostTopSpacing={mainPostTopSpacing}
          nuOfVersions={nuOfVersions}
          versionsIndex={versionsIndex}
          setSuccess={setSuccess}
          success={success}
          setShow={setShow}
          show={show}
          updateComponent={updateComponent}
          editsIndex={editsIndex}
          nuOfEdit={nuOfEdit}
          rotationId={rotationId}
          setRotationId={setRotationId}
          setEditsIndex={setEditsIndex}
          post={post}
          setVersionsIndex={setVersionsIndex}
          nuOfReply={nuOfReply}
          setMenuPostId={setMenuPostId}
          user={user}
          commentValue={commentValue}
          handleCommentSubmit={handleCommentSubmit}
          form={form}
          setCommentValue={setCommentValue}
          setDisabled={setDisabled}
          menuPostId={menuPostId}
          updatePosts={updatePosts}
        />
      ) : (
        <NoEdits
          type={props.type}
          page={props.page}
          replyId={props.replyId}
          updateData={props.updateData}
          post={post}
          updateIndex={updateIndex}
          index={index}
          disabled={disabled}
          mainPostTopSpacing={mainPostTopSpacing}
          mainPostSpacing={mainPostSpacing}
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
      )}
    </>
  )
}
