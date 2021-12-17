import React, {Fragment} from 'react'
import Draggable from 'react-draggable'
import Avatar from 'antd/lib/avatar/avatar'
import moment from 'moment'
import {Button, Comment, Input, Form, Dropdown} from 'antd'
import {LeftSquareFilled, MessageOutlined, RightSquareFilled} from '@ant-design/icons'

import {Swiper, SwiperSlide} from 'swiper/react/swiper-react'
// Import Swiper styles
import 'swiper/swiper-bundle.css'
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/effect-cards/effect-cards.min.css'
import './swiper.min.css'
import './PostSlider.css'

// import Swiper core and required modules
import SwiperCore, {EffectCards} from 'swiper'
// install Swiper modules

SwiperCore.use([EffectCards])

const EditGist = ({
  EditArray,
  disabled,
  setSuccess,
  setShow,
  editsIndex,
  nuOfEdit,
  setEditsIndex,
  success,
  show,
  versionsIndex,
  setVersionsIndex,
  nuOfVersions,
  isAuthenticated,
  menu,
  setMenuPostId,
  post,
  form,
  handleCommentChange,
  commentValue,
  handleCommentSubmit,
  SingleComment,
  ReplyComment,
  updateComponent,
}) => {
  return (
    <Fragment>
      {EditArray &&
        EditArray.length > 0 &&
        EditArray.map((child, index) => {
          let space
          let spaceTop
          if (EditArray.length < 6) {
            space = index * 0.6 + 'em'
            spaceTop = index * 0.6 + 'em'
          }
          if (EditArray.length >= 6) {
            space = index * 0.1 + 'em'
            spaceTop = index * 0.1 + 'em'
          }
          const nuOfChildEdit = child.children.filter(c => c.type === 'edits')
          const nuOfChildVersions = child.children.filter(c => c.type === 'versions')
          const nuOfChildReply = child.children.filter(c => c.type === 'replies')
          return (
            <SwiperSlide>
              <Fragment key={child + index}>
                <Draggable disabled={disabled}>
                  <div
                    className="handle edit-gist-container"
                    style={{
                      top: spaceTop,
                      left: space,
                    }}
                  >
                    <div className="pb-4 edit-gist-subcontainer">
                      <div className="gist-edit-author-container">
                        <div className="px-4">
                          {' '}
                          <Comment
                            author={
                              <div className="gist-comment-author-container">
                                <span>
                                  {child?.userId && child?.userId?.firstName}{' '}
                                  {child?.userId && child?.userId?.lastName}{' '}
                                </span>
                              </div>
                            }
                            avatar={
                              <Avatar
                                src={
                                  child?.userId && child?.userId?.userPicture
                                    ? child?.userId?.userPicture
                                    : 'https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png'
                                }
                                alt="Han Solo"
                              />
                            }
                            content={
                              <Fragment>
                                <div className="gist-comment-container"></div>
                                Posted on: {child?.userId && child?.timeOfPost} (
                                {moment(
                                  child?.userId && child?.timeOfPost,
                                  'dddd, MMMM Do YYYY, h:mm:ss a',
                                ).fromNow()}
                                )
                              </Fragment>
                            }
                          />
                        </div>
                        <div
                          className="text ml-4"
                          style={{
                            position: 'relative',
                          }}
                        >
                          <span
                            id="content"
                            dangerouslySetInnerHTML={{
                              __html:
                                child.description.length > 404
                                  ? child?.description.substring(0, 404) + '...'
                                  : child?.description,
                            }}
                          ></span>
                          <span
                            className="big-posts post-view-more-link"
                            to={'/post/' + child?.id}
                          >
                            {' '}
                            (More)
                          </span>
                        </div>
                        <div className="border-top mt-5 pt-3 pl-2">
                          <div className="card-bottom-icons gist-post-icon-container">
                            <span
                              onClick={() => {
                                setSuccess(child.id)
                                setShow(!show)
                              }}
                            >
                              <MessageOutlined className="comment-icon gist-message-icon" />{' '}
                              Comments{' '}
                              {child.comments && <span>({child.comments.length})</span>}
                            </span>
                            <div className="ml-4 pt-2">
                              <p>
                                <LeftSquareFilled
                                  // onClick={() =>
                                  //   editsIndex + 1 === 0 && setEditsIndex(editsIndex - 1)
                                  // }
                                  className="gist-edits-right-left-square"
                                />
                                <span className="mr-2 ml-2 mt-2 gist-edits-count">
                                  {editsIndex + 1}
                                </span>
                                <span className="gist-edit-text">Edits</span>
                                <span className="ml-2 mr-2 gist-edits-count">
                                  {nuOfChildEdit.length}
                                </span>
                                <RightSquareFilled
                                  // onClick={() =>
                                  //   editsIndex + 1 === nuOfEdit.length &&
                                  //   setEditsIndex(editsIndex + 1)
                                  // }
                                  className="gist-edits-right-left-square"
                                />
                              </p>
                            </div>
                            <div className="ml-4 pt-2 gist-versions-container">
                              <p>
                                <LeftSquareFilled
                                  // onClick={() =>
                                  //   versionsIndex + 1 === 0 &&
                                  //   setVersionsIndex(versionsIndex - 1)
                                  // }
                                  className="gist-version-left-right-square"
                                />
                                <span className="mr-2 ml-2 mt-2 gist-version-count">
                                  {versionsIndex + 1}
                                </span>
                                <span className="gist-version-text">Versions</span>
                                <span className="ml-2 mr-2 gist-version-count">
                                  {nuOfChildVersions.length}
                                </span>
                                <RightSquareFilled
                                  // onClick={() =>
                                  //   versionsIndex + 1 === nuOfVersions.length &&
                                  //   setVersionsIndex(versionsIndex + 1)
                                  // }
                                  className="gist-version-left-right-square"
                                />
                              </p>
                            </div>
                            <div className="ml-4 px-2 gist-child-replires-container">
                              <p>
                                Replies{' '}
                                {nuOfChildReply && (
                                  <span>({nuOfChildReply?.length})</span>
                                )}
                              </p>
                            </div>
                            <div className="mt-0 pt-0 comment-box ml-4">
                              <Comment
                                style={{
                                  height: '40px',
                                }}
                                avatar={
                                  <Avatar
                                    src={isAuthenticated()?.userPicture}
                                    alt={isAuthenticated()?.username}
                                  />
                                }
                                content={
                                  <React.Fragment>
                                    <Dropdown overlay={menu} trigger={['click']}>
                                      <Input
                                        onMouseEnter={() => setMenuPostId(post?.id)}
                                        placeholder="Can say it better. Tell us!"
                                        className="edit-gist-post-comment-input"
                                      />
                                    </Dropdown>
                                    <Button
                                      size="small"
                                      className="gist-post-submit-button"
                                      htmlType="submit"
                                    >
                                      Post
                                    </Button>
                                  </React.Fragment>
                                }
                              />
                            </div>
                          </div>
                        </div>
                        {success === child.id && show && (
                          <div className="ml-3 mt-3 row">
                            <div className="col-md-6 col-sm-6">
                              <Comment
                                avatar={
                                  <Avatar
                                    src={isAuthenticated()?.userPicture}
                                    alt={isAuthenticated()?.username}
                                  />
                                }
                                content={
                                  <React.Fragment>
                                    <Form form={form} name="login">
                                      <Form.Item onChange={handleCommentChange}>
                                        <Input
                                          placeholder="Post a comment"
                                          className="edit-gist-comment-value-input"
                                          value={commentValue}
                                        />
                                        <Button
                                          onClick={() => handleCommentSubmit(child.id)}
                                          size="small"
                                          className="gist-post-submit-button"
                                          htmlType="submit"
                                        >
                                          Post
                                        </Button>
                                      </Form.Item>
                                    </Form>
                                  </React.Fragment>
                                }
                              />
                            </div>
                          </div>
                        )}
                        <div className="ml-4">
                          {success === child?.id && show
                            ? child?.comments &&
                              child?.comments?.length > 0 &&
                              child?.comments?.map(com => {
                                return (
                                  !com.responseTo && (
                                    <React.Fragment>
                                      <SingleComment
                                        comment={com}
                                        postId={child.id}
                                        refreshFunction={updateComponent}
                                      />
                                      <div
                                        style={{
                                          marginLeft: '100px',
                                        }}
                                      >
                                        <ReplyComment
                                          CommentList={child}
                                          ParentCommentId={com.commentId}
                                          postId={child.id}
                                          refreshFunction={updateComponent}
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
              </Fragment>
            </SwiperSlide>
          )
        })}
    </Fragment>
  )
}

export default EditGist
