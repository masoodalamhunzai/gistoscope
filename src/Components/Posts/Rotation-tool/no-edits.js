import React, {useState, useEffect, useRef} from 'react'
import {
  CheckCircleFilled,
  FlagFilled,
  MessageOutlined,
  VerifiedOutlined,
} from '@ant-design/icons'
import {Button, Comment, Input, Dropdown, Menu} from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import {useDispatch} from 'react-redux'
import {SingleComment} from '../../Comments/PostComments/SingleComment'
import {ReplyComment} from '../../Comments/PostComments/ReplyComment'
import PostReply from './reply-form'
import PostVersion from './post-versions'
import PostEdit from './post-edits'
import {CreateEdits} from '../Edits/CreateEdits'
import {CreateVersions} from '../Versions/CreateVersions'
import {CreateReplies} from '../Replies/CreateReplies'
import {getAllCommentByIDAction} from '../../../store/actions/tree-action'
import PostSliderCard from './PostSliderCard'

import Slider from 'react-slick'

function NoEdits({
  type,
  page,
  replyId,
  updateData,
  post,
  updateIndex,
  index,
  disabled,
  setShow,
  show,
  setSuccess,
  editsIndex,
  rotationId,
  nuOfEdit,
  user,
  nuOfReply,
  setEditsIndex,
  setRotationId,
  nuOfVersions,
  setVersionsIndex,
  versionsIndex,
  setMenuPostId,
  updatePosts,
  onModelOpen,
  menuPostId,
  success,
  form,
  handleCommentChange,
  handleCommentSubmit,
  commentValue,
  updateComponent,
}) {
  const dispatch = useDispatch()
  const [showMore, setShowMore] = useState(false)
  const [comments, setComments] = useState(null)
  const [showEdit, setShowEdit] = useState(false)
  const [showVersion, setShowVersion] = useState(false)
  let [editCount, setEditCount] = useState(1)
  let [versionCount, setVersionCount] = useState(1)
  // const [count, setCount] = useState({
  //   editCount: 0,
  //   versionCount: 0,
  // })
  // const [showReplies, setShowReplies] = useState(false)
  // const [allComments, setAllComments] = useState([])
  // const commentArray = useSelector(state => state?.comment)

  // useEffect(() => {
  //   if (commentArray) {
  //     setAllComments({ ...commentArray.comments })
  //   }
  // }, [commentArray])

  useEffect(() => {
    setShowEdit(false)
    setShowVersion(false)
  }, [])

  let slider = useRef(null)

  const next = () => {
    if (showEdit && editCount < nuOfEdit?.length) {
      ++editCount
      slider.slickNext()
      setEditCount(editCount)
    }
    if (showVersion && versionCount < nuOfVersions?.length) {
      ++versionCount
      slider.slickNext()
      setVersionCount(versionCount)
    }
  }

  const previous = () => {
    if (showEdit && editCount > 1) {
      --editCount
      slider.slickPrev()
      setEditCount(editCount)
    }
    if (showVersion && versionCount > 1) {
      --versionCount
      slider.slickPrev()
      setVersionCount(versionCount)
    }
  }
  const handleSlider = (edit, version) => {
    setShowEdit(edit)
    setShowVersion(version)
  }

  const EditSlider = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    centerMode: true,
    centerPadding: '0',
    arrows: false,
    nextArrow: '.slickNext',
    prevArrow: '.slickPrev',
  }
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <CreateEdits
          refreshFunction={updatePosts}
          onModelOpen={onModelOpen}
          refresh={updateData}
          postId={menuPostId}
        />
      </Menu.Item>
      <Menu.Item key="1">
        <CreateVersions
          refreshFunction={updatePosts}
          onModelOpen={onModelOpen}
          postId={menuPostId}
        />
      </Menu.Item>
      <Menu.Item key="2">
        <CreateReplies
          refreshFunction={updatePosts}
          onModelOpen={onModelOpen}
          postId={type === 'childReplies' ? replyId : menuPostId}
        />
      </Menu.Item>
    </Menu>
  )

  const handleMore = () => {
    setShowMore(!showMore)
  }
  const handleIsActiveEditVersion = () => {
    setShowEdit(false)
    setShowVersion(false)
  }
  const handleGetComments = id => {
    dispatch(getAllCommentByIDAction(id, setComments))
  }

  return (
    <div className="slider-container">
      {showEdit && nuOfEdit?.length > 0 ? (
        <Slider className="SmallSlider" ref={c => (slider = c)} {...EditSlider}>
          {nuOfEdit?.map((edit, index) => (
            <div
              className="slider"
              key={index}
              onClick={() => handleIsActiveEditVersion()}
            >
              <PostSliderCard
                title={edit?.title}
                summary={edit?.summary}
                description={edit?.description}
                user={edit?.user}
                timeOfPost={edit?.timeOfPost}
                showMore={showMore}
                handleMore={handleMore}
              />
            </div>
          ))}
        </Slider>
      ) : showVersion && nuOfVersions?.length > 0 ? (
        <Slider className="SmallSlider" ref={c => (slider = c)} {...EditSlider}>
          {nuOfVersions?.map((version, index) => (
            <div
              className="slider"
              key={index}
              onClick={() => handleIsActiveEditVersion()}
            >
              <PostSliderCard
                title={version?.title}
                summary={version?.summary}
                description={version?.description}
                user={version?.user}
                timeOfPost={version?.timeOfPost}
                showMore={showMore}
                handleMore={handleMore}
              />
            </div>
          ))}
        </Slider>
      ) : (
        <div className="slider" onClick={() => handleIsActiveEditVersion()}>
          {post.subjectId !== null && (
            <PostSliderCard
              title={post?.title}
              summary={post?.summary}
              description={post?.description}
              user={post?.user}
              timeOfPost={post?.timeOfPost}
              showMore={showMore}
              handleMore={handleMore}
            />
          )}
        </div>
      )}

      <div className="protation-header-container">
        {page === 'users-page' && (
          <div className="float-right moderator-icons mr-4">
            <FlagFilled className="protation-flat" />
            <VerifiedOutlined className="protation-version" />
            <CheckCircleFilled className="protation-circle" />
          </div>
        )}
        <div className="border-top py-2">
          <div className="card-bottom-icons">
            <span
              onClick={() => {
                setSuccess(post?.id)
                setShow(!show)
                handleGetComments(post?.id)
              }}
              style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}
            >
              <MessageOutlined className="comment-icon" />{' '}
              <span style={{margin: '0 3px'}}>Comments </span>
              {post?.comments && <span className="text-primary">({post?.comments})</span>}
            </span>
            {/* Post Edits */}
            <PostEdit
              nuOfEdit={nuOfEdit}
              post={post}
              setRotationId={setRotationId}
              next={next}
              previous={previous}
              count={editCount}
              handleSlider={handleSlider}
            />
            {/* Post Versions */}
            <PostVersion
              nuOfVersions={nuOfVersions}
              post={post}
              setRotationId={setRotationId}
              next={next}
              previous={previous}
              count={versionCount}
              handleSlider={handleSlider}
            />
            <div className="reply-post-container">
              <p>
                Replies{' '}
                {nuOfReply && <span className="text-primary">({nuOfReply?.length})</span>}
              </p>
            </div>
            <div className="comment-box">
              <Comment
                style={{height: '40px'}}
                avatar={<Avatar src={user?.userPicture} alt={user?.username} />}
                content={
                  <React.Fragment>
                    <Dropdown overlay={menu} trigger={['click']}>
                      <Input
                        onMouseEnter={() => setMenuPostId(post?.id)}
                        placeholder="Can say it better. Tell us!"
                        className="no-edit-post-input"
                      />
                    </Dropdown>
                    <Button size="small" className="reply-post-button" htmlType="submit">
                      Post
                    </Button>
                  </React.Fragment>
                }
              />
            </div>
          </div>
        </div>
        {success === post?.id && show && (
          <PostReply
            commentValue={commentValue}
            form={form}
            handleCommentChange={handleCommentChange}
            handleCommentSubmit={handleCommentSubmit}
            post={post}
            handleGetComments={() => handleGetComments(post?.id)}
          />
        )}

        {show && (
          <div
            className={comments?.comments.length > 10 ? `ml-4 comments-section` : 'ml-4 '}
          >
            {comments?.comments?.map((comment, index) => {
              return success === comment?.postId ? (
                <React.Fragment key={index}>
                  <SingleComment
                    comment={comment}
                    postId={post?.id}
                    refreshFunction={updateComponent}
                  />
                  {comment.commentId === comment?.responseTo && (
                    <div style={{marginLeft: '100px'}}>
                      <ReplyComment
                        CommentList={comment}
                        ParentCommentId={comment?.commentId}
                        refreshFunction={updateComponent}
                        postId={post?.id}
                      />
                    </div>
                  )}
                </React.Fragment>
              ) : null
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default NoEdits
