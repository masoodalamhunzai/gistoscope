import * as React from 'react'
import Draggable from 'react-draggable'
import {
  CheckCircleFilled,
  FlagFilled,
  MessageOutlined,
  VerifiedOutlined,
} from '@ant-design/icons'

import PostComment from './post-comment'
import PostEdit from './post-edits'
import PostVersion from './post-versions'
import PostReplies from './post-replies'

import {SingleComment} from '../../Comments/PostComments/SingleComment'
import {ReplyComment} from '../../Comments/PostComments/ReplyComment'

function RotationBody({
  page,
  type,
  disabled,
  updateData,
  replyId,
  mainPostSpacing,
  mainPostTopSpacing,
  nuOfVersions,
  versionsIndex,
  setSuccess,
  success,
  setShow,
  show,
  updateComponent,
  editsIndex,
  nuOfEdit,
  rotationId,
  setRotationId,
  setEditsIndex,
  post,
  setVersionsIndex,
  nuOfReply,
  setMenuPostId,
  user,
  commentValue,
  handleCommentSubmit,
  form,
  setCommentValue,
  setDisabled,
  menuPostId,
  updatePosts,
}) {
  return (
    <Draggable disabled={disabled}>
      <div
        className="handle protation-draggable-card-container "
        style={{
          top: mainPostTopSpacing,
          left: mainPostSpacing,
        }}
      >
        <div className="pb-4 protation-draggable-card-sub-container">
          versionIndex = -1
          <div className="protation-draggable-card-content-container">
            <div className="text ml-4" style={{position: 'relative'}}>
              <span
                id="content"
                dangerouslySetInnerHTML={{
                  __html:
                    nuOfVersions[versionsIndex].description.length > 404
                      ? nuOfVersions[versionsIndex].description.substring(0, 404) + '...'
                      : nuOfVersions[versionsIndex].description,
                }}
              ></span>
              <span
                className="protation-full-post-view-link"
                to={'/post/' + nuOfVersions[versionsIndex]?.id}
              >
                {' '}
                (More)
              </span>
            </div>
            {page === 'users-page' && (
              <div className="float-right moderator-icons mr-4">
                <FlagFilled className="protation-flat" />
                <VerifiedOutlined className="protation-version" />
                <CheckCircleFilled className="protation-circle" />
              </div>
            )}

            <div></div>
            <div className="border-top mt-5 pt-3 pl-2">
              <div className="card-bottom-icons protation-bottom-icons-card">
                <div className="">
                  <span
                    onClick={() => {
                      setSuccess(nuOfVersions[versionsIndex]?.id)
                      setShow(!show)
                    }}
                  >
                    <MessageOutlined className="comment-icon protation-comment-icon" />{' '}
                    Comments{' '}
                    {nuOfVersions[versionsIndex].comments && (
                      <span>({nuOfVersions[versionsIndex].comments.length})</span>
                    )}
                  </span>
                </div>
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
                <PostReplies
                  type={type}
                  updateData={updateData}
                  replyId={replyId}
                  nuOfReply={nuOfReply}
                  post={post}
                  setMenuPostId={setMenuPostId}
                  user={user}
                  menuPostId={menuPostId}
                  onModelOpen={data => setDisabled(data)}
                  updatePosts={updatePosts}
                />
              </div>
            </div>
            {success === nuOfVersions[versionsIndex]?.id && show && (
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
              {success === nuOfVersions[versionsIndex]?.id && show
                ? nuOfVersions[versionsIndex]?.comments &&
                  nuOfVersions[versionsIndex]?.comments.length > 0 &&
                  nuOfVersions[versionsIndex]?.comments.map(com => {
                    return (
                      !com.responseTo && (
                        <React.Fragment>
                          <SingleComment
                            comment={com}
                            postId={nuOfVersions[versionsIndex]?.id}
                            refreshFunction={updateComponent}
                          />
                          <div style={{marginLeft: '100px'}}>
                            <ReplyComment
                              CommentList={nuOfVersions[versionsIndex]}
                              ParentCommentId={com.commentId}
                              refreshFunction={updateComponent}
                              postId={nuOfVersions[versionsIndex]?.id}
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
    </Draggable>
  )
}

export default RotationBody
