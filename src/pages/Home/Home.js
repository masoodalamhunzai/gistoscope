/**
 * responsible for rendering home page of the website
 */
import * as React from 'react'
import { Fragment, useEffect, useState } from 'react'
import moment from 'moment'
import { Form, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import RightSidePosts from '../Posts-By-Subjects/RightSidePosts'
import FutureMenu from './FutureMenu'
import SubjectName from './SubjectName'
import EditGist from './EditGist'
import MenuItems from './Menu'
import PostReplies from './post-replies'
import CommentReplies from './comment-replies'

import { SingleComment } from '../../Components/Comments/PostComments/SingleComment'
import { ReplyComment } from '../../Components/Comments/PostComments/ReplyComment'
import { RotationComponent } from '../../Components/Posts/Rotation-tool/RotationComponent'
import * as Actions from '../../store/actions'

import './styles.css'
import { restoreUserAction } from '../../store/actions/user-action'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
// Import Swiper styles
import 'swiper/swiper-bundle.css'
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/effect-cards/effect-cards.min.css'
import './swiper.min.css'
import './PostSlider.css'

// import Swiper core and required modules
import SwiperCore, { EffectCards } from 'swiper'
// install Swiper modules

SwiperCore.use([EffectCards])

export const Home = props => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)
  const [loading, setLoading] = useState(true)
  const [form] = Form.useForm()
  const { filteringPosts, subjects, commentToggle } = useSelector(state => state.post)
  // const state = useSelector(state => state)
  // console.log(state, "state")
  const [commentValue, setCommentValue] = useState('')
  const [success, setSuccess] = useState('')
  const [show, setShow] = useState(false)
  const [postIndex, setPostIndex] = useState(0)
  const [postId] = useState('')
  const [menuPostId, setMenuPostId] = useState('')
  const [editsIndex, setEditsIndex] = useState(-1)
  const [versionsIndex, setVersionsIndex] = useState(-1)
  const [disabled, setDisabled] = useState(false)

  let i = -1

  /**
   * create a new comment in the database
   */
  const handleCommentSubmit = async id => {
    if (!user) {
      message.error({
        content: 'You must be logged in to post a comment!',
        style: {
          marginTop: '20vh',
        },
      })
    } else {
      dispatch(Actions.handleCommentSubmitAction(id, () => user, commentValue))
      setCommentValue('')
    }
  }
  /**
   * update old data
   */
  const updateComponent = () => {
    Actions.getPostsAction()
    Actions.getMainSubjectsAction()
  }

  /**
   * Refetch updated posts from Database
   */
  const updateData = () => {
    Actions.getPostsAction()
  }

  const updatePosts = () => {
    Actions.getPostsAction()
  }

  useEffect(() => {
    dispatch(Actions.getPostsAction())
    dispatch(Actions.getMainSubjectsAction())
  }, [dispatch, commentToggle])

  useEffect(() => {
    if (user && user.verification === false) {
      props.history.push('/verify-email')
    }

    dispatch(restoreUserAction())
    setTimeout(() => { setLoading(false) }, 0)

  }, [])

  if (loading) return null

  return (
    <div className="row w-100">
      <div className="col-md-3 future-tree home-container">
        <FutureMenu />
      </div>
      <div className="col-md-9 col-sm-10 mt-3">
        <div className="home-header-fixed-width">
          {subjects.map((subj, index) => {
            const filterPosts = filteringPosts?.filter(
              post => post?.subjectId === subj?.id
            )
            i = i + 1
            return (
              filterPosts?.length > 0 && (
                <Fragment key={index}>
                  <div className="home-subject-container">
                    <SubjectName subj={subj} />
                  </div>
                  {filterPosts.length > 0 &&
                    filterPosts?.map((post, i) => {
                      const nuOfEdit = post?.children?.filter(c => c.type === 'edits' && c.subjectId !== null)
                      const EditArray = post?.children?.filter(
                        c => c.type === 'edits' || c.type === 'versions',
                      )
                      const nuOfVersions = post?.children?.filter(
                        c => c.type === 'versions'  && c.subjectId !== null,
                      )
                      const nuOfReply = post?.children?.filter(
                        c => c.type === 'replies'  && c.subjectId !== null,
                      )
                      let mainPostSpacing
                      let mainPostTopSpacing
                      if (EditArray?.length < 6) {
                        mainPostSpacing = EditArray && EditArray?.length * 0.6 + 'em'
                        mainPostTopSpacing =
                          EditArray && EditArray.length * 0.6 + 'em'
                      }
                      if (EditArray?.length >= 6) {
                        mainPostSpacing = EditArray && EditArray?.length * 0.1 + 'em'
                        mainPostTopSpacing =
                          EditArray && EditArray?.length * 0.1 + 'em'
                      }
                      return (
                        i === postIndex && (
                          <Fragment key={i}>
                            <div className="home-relative-position">
                              <Swiper grabCursor={true} effect={'cards'} className="SlderWrapper">
                                <SwiperSlide>
                                  <div className="containersFlexMain">
                                    <div className="home-relative-position">
                                      {/* <EditGist
                                        EditArray={EditArray}
                                        disabled={disabled}
                                        setSuccess={setSuccess}
                                        setShow={setShow}
                                        editsIndex={editsIndex}
                                        nuOfEdit={nuOfEdit}
                                        setEditsIndex={setEditsIndex}
                                        show={show}
                                        success={success}
                                        versionsIndex={versionsIndex}
                                        setVersionsIndex={setVersionsIndex}
                                        nuOfVersions={nuOfVersions}
                                        isAuthenticated={() => user}
                                        menu={
                                          <MenuItems
                                            updatePosts={updatePosts}
                                            onModelOpen={data => setDisabled(data)}
                                            menuPostId={menuPostId}
                                          />
                                        }
                                        setMenuPostId={setMenuPostId}
                                        post={post}
                                        form={form}
                                        handleCommentChange={e =>
                                          setCommentValue(e.target.value)
                                        }
                                        commentValue={commentValue}
                                        handleCommentSubmit={handleCommentSubmit}
                                        updateComponent={updateComponent}
                                        SingleComment={SingleComment}
                                        ReplyComment={ReplyComment}
                                      /> */}
                                      <RotationComponent
                                        nuOfEdit={nuOfEdit}
                                        nuOfVersions={nuOfVersions}
                                        post={post}
                                        mainPostSpacing={mainPostSpacing}
                                        mainPostTopSpacing={mainPostTopSpacing}
                                        nuOfReply={nuOfReply}
                                        updateData={updateData}
                                        updateIndex={i => setPostIndex(i)}
                                        menu={
                                          <MenuItems
                                            updatePosts={updatePosts}
                                            onModelOpen={data => setDisabled(data)}
                                            menuPostId={menuPostId}
                                          />
                                        }
                                      />


                                    </div>
                                  </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                  <div className="containersFlexMain">
                                    <div className="home-relative-position" >
                                      <div className="right-s-de-post">
                                        <RightSidePosts
                                          filterPosts={filterPosts}
                                          postIndex={postIndex}
                                          postId={postId}
                                          disabled={disabled}
                                          moment={moment}
                                          setSuccess={setSuccess}
                                          setShow={setShow}
                                          show={show}
                                          editsIndex={editsIndex}
                                          setEditsIndex={setEditsIndex}
                                          nuOfEdit={nuOfEdit}
                                          versionsIndex={versionsIndex}
                                          nuOfReply={nuOfReply}
                                          setVersionsIndex={setVersionsIndex}
                                          nuOfVersions={nuOfVersions}
                                          isAuthenticated={() => user}
                                          menu={
                                            <MenuItems
                                              updatePosts={updatePosts}
                                              onModelOpen={data => setDisabled(data)}
                                              menuPostId={menuPostId}
                                            />
                                          }
                                          setMenuPostId={setMenuPostId}
                                          post={post}
                                          success={success}
                                          form={form}
                                          handleCommentChange={e =>
                                            setCommentValue(e.target.value)
                                          }
                                          commentValue={commentValue}
                                          updateComponent={updateComponent}
                                          nuOfReply={nuOfReply}
                                          updateIndex={i => setPostIndex(i)}
                                          updateData={updateData}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </SwiperSlide>
                              </Swiper>
                              {/* <div className="no-class">
                                {nuOfReply && nuOfReply.length > 0 && (
                                  <div className="containersFlex">
                                    {nuOfReply.map(child => {
                                      const nuOfReplyEdit =
                                        child.children &&
                                        child.children.filter(
                                          c => c.type === 'edits',
                                        )
                                      const ReplyEditArray =
                                        child.children &&
                                        child.children.filter(
                                          c =>
                                            c.type === 'edits' ||
                                            c.type === 'versions',
                                        )
                                      const nuOfReplyVersions =
                                        child.children &&
                                        child.children.filter(
                                          c => c.type === 'versions',
                                        )
                                      const nuOfReplyReplies =
                                        child.children &&
                                        child.children.filter(
                                          c => c.type === 'replies',
                                        )
                                      let mainPostSpacing
                                      let mainPostTopSpacing
                                      if (ReplyEditArray.length < 6) {
                                        mainPostSpacing =
                                          ReplyEditArray &&
                                          ReplyEditArray.length * 0.6 + 'em'
                                        mainPostTopSpacing =
                                          ReplyEditArray &&
                                          ReplyEditArray.length * 0.6 + 'em'
                                      }
                                      if (ReplyEditArray.length >= 6) {
                                        mainPostSpacing =
                                          ReplyEditArray &&
                                          ReplyEditArray.length * 0.1 + 'em'
                                        mainPostTopSpacing =
                                          ReplyEditArray &&
                                          ReplyEditArray.length * 0.1 + 'em'
                                      }
                                      return (
                                        <div key={child.id}>
                                          <div className="mt-5 home-post-replies-container">
                                            {ReplyEditArray &&
                                              ReplyEditArray.length > 0 &&
                                              ReplyEditArray.map(
                                                (oneChild, index) => {
                                                  let space
                                                  let spaceTop
                                                  if (ReplyEditArray.length < 6) {
                                                    space = index * 0.6 + 'em'
                                                    spaceTop = index * 0.6 + 'em'
                                                  }
                                                  if (
                                                    ReplyEditArray.length >= 6
                                                  ) {
                                                    space = index * 0.1 + 'em'
                                                    spaceTop = index * 0.1 + 'em'
                                                  }
                                                  const nuOfChildEdit =
                                                    oneChild.children &&
                                                    oneChild.children.length >
                                                    0 &&
                                                    oneChild.children.filter(
                                                      c => c.type === 'edits',
                                                    )
                                                  const nuOfChildReply =
                                                    oneChild.children &&
                                                    oneChild.children.length >
                                                    0 &&
                                                    oneChild.children.filter(
                                                      c => c.type === 'replies',
                                                    )
                                                  return (
                                                    <PostReplies
                                                      child={child}
                                                      commentValue={commentValue}
                                                      disabled={disabled}
                                                      editsIndex={editsIndex}
                                                      form={form}
                                                      menuPostId={menuPostId}
                                                      nuOfChildEdit={nuOfChildEdit}
                                                      nuOfChildReply={nuOfChildReply}
                                                      nuOfEdit={nuOfEdit}
                                                      nuOfReplyVersions={nuOfReplyVersions}
                                                      nuOfVersions={nuOfVersions}
                                                      post={post}
                                                      setCommentValue={setCommentValue}
                                                      setDisabled={setDisabled}
                                                      setEditsIndex={setEditsIndex}
                                                      setMenuPostId={setMenuPostId}
                                                      setShow={setShow}
                                                      setSuccess={setSuccess}
                                                      setVersionsIndex={setVersionsIndex}
                                                      show={show}
                                                      space={space}
                                                      spaceTop={spaceTop}
                                                      success={success}
                                                      updateComponent={updateComponent}
                                                      updatePosts={updatePosts}
                                                      user={user}
                                                      versionsIndex={versionsIndex}
                                                      key={oneChild + index}
                                                    />
                                                  )
                                                },
                                              )}

                                            <RotationComponent
                                              nuOfEdit={nuOfReplyEdit}
                                              nuOfVersions={nuOfReplyVersions}
                                              post={child}
                                              mainPostSpacing={mainPostSpacing}
                                              mainPostTopSpacing={mainPostTopSpacing}
                                              nuOfReply={nuOfReplyReplies}
                                              updateData={updateData}
                                              menu={
                                                <MenuItems
                                                  updatePosts={updatePosts}
                                                  onModelOpen={data =>
                                                    setDisabled(data)
                                                  }
                                                  menuPostId={menuPostId}
                                                />
                                              }
                                              type="replies"

                                            />
                                            <Fragment>
                                              {nuOfReplyReplies &&
                                                nuOfReplyReplies.length > 0 && (
                                                  <Fragment>
                                                    {nuOfReplyReplies &&
                                                      nuOfReplyReplies.length >
                                                      0 &&
                                                      nuOfReplyReplies.map(
                                                        secondChild => {
                                                          const nuOfReplyEdit =
                                                            secondChild.children.filter(
                                                              c =>
                                                                c.type ===
                                                                'edits',
                                                            )
                                                          const secondChildReplyEditArray =
                                                            secondChild.children.filter(
                                                              c =>
                                                                c.type ===
                                                                'edits' ||
                                                                c.type ===
                                                                'versions',
                                                            )
                                                          const nuOfReplyVersions =
                                                            secondChild.children.filter(
                                                              c =>
                                                                c.type ===
                                                                'versions',
                                                            )
                                                          const nuOfReplyReplies =
                                                            secondChild.children.filter(
                                                              c =>
                                                                c.type ===
                                                                'replies',
                                                            )
                                                          let mainPostSpacing
                                                          let mainPostTopSpacing
                                                          if (
                                                            secondChildReplyEditArray.length <
                                                            6
                                                          ) {
                                                            mainPostSpacing =
                                                              secondChildReplyEditArray &&
                                                              secondChildReplyEditArray.length *
                                                              0.6 +
                                                              'em'
                                                            mainPostTopSpacing =
                                                              secondChildReplyEditArray &&
                                                              secondChildReplyEditArray.length *
                                                              0.6 +
                                                              'em'
                                                          }
                                                          if (
                                                            secondChildReplyEditArray.length >=
                                                            6
                                                          ) {
                                                            mainPostSpacing =
                                                              secondChildReplyEditArray &&
                                                              secondChildReplyEditArray.length *
                                                              0.1 +
                                                              'em'
                                                            mainPostTopSpacing =
                                                              secondChildReplyEditArray &&
                                                              secondChildReplyEditArray.length *
                                                              0.1 +
                                                              'em'
                                                          }
                                                          return (
                                                            <div
                                                              className="mt-5 home-comment-replires-container"
                                                              key={secondChild.children}
                                                            >
                                                              {secondChildReplyEditArray &&
                                                                secondChildReplyEditArray.map(
                                                                  (secondChildEdits, index) => {
                                                                    let space
                                                                    let spaceTop
                                                                    if (
                                                                      secondChildReplyEditArray.length <
                                                                      6
                                                                    ) {
                                                                      space =
                                                                        index *
                                                                        0.6 +
                                                                        'em'
                                                                      spaceTop =
                                                                        index *
                                                                        0.6 +
                                                                        'em'
                                                                    }
                                                                    if (
                                                                      secondChildReplyEditArray.length >=
                                                                      6
                                                                    ) {
                                                                      space =
                                                                        index *
                                                                        0.1 +
                                                                        'em'
                                                                      spaceTop =
                                                                        index *
                                                                        0.1 +
                                                                        'em'
                                                                    }
                                                                    const nuOfChildEdit =
                                                                      secondChildEdits.children.filter(
                                                                        c =>
                                                                          c.type ===
                                                                          'edits',
                                                                      )
                                                                    const nuOfChildVersions =
                                                                      secondChildEdits.children.filter(
                                                                        c =>
                                                                          c.type ===
                                                                          'versions',
                                                                      )
                                                                    const nuOfChildReply =
                                                                      secondChildEdits.children.filter(
                                                                        c =>
                                                                          c.type ===
                                                                          'replies',
                                                                      )
                                                                    return (
                                                                      <CommentReplies
                                                                        disabled={disabled}
                                                                        spaceTop={spaceTop}
                                                                        space={space}
                                                                        child={child}
                                                                        setSuccess={setSuccess}
                                                                        show={show}
                                                                        setShow={setShow}
                                                                        editsIndex={editsIndex}
                                                                        setEditsIndex={setEditsIndex}
                                                                        nuOfChildEdit={nuOfChildEdit}
                                                                        nuOfEdit={nuOfEdit}
                                                                        versionsIndex={versionsIndex}
                                                                        setVersionsIndex={setVersionsIndex}
                                                                        nuOfVersions={nuOfVersions}
                                                                        nuOfChildVersions={nuOfChildVersions}
                                                                        nuOfChildReply={nuOfChildReply}
                                                                        user={user}
                                                                        setMenuPostId={setMenuPostId}
                                                                        post={post}
                                                                        success={success}
                                                                        form={form}
                                                                        updateComponent={updateComponent}
                                                                        setCommentValue={setCommentValue}
                                                                        commentValue={commentValue}
                                                                        updatePosts={updatePosts}
                                                                        menuPostId={menuPostId}
                                                                        setDisabled={setDisabled}
                                                                        key={secondChildEdits + index}
                                                                      />
                                                                    )
                                                                  },
                                                                )}
                                                              <RotationComponent
                                                                nuOfEdit={nuOfReplyEdit}
                                                                nuOfVersions={nuOfReplyVersions}
                                                                post={secondChild}
                                                                replyId={child.id}
                                                                mainPostSpacing={mainPostSpacing}
                                                                mainPostTopSpacing={mainPostTopSpacing}
                                                                nuOfReply={nuOfReplyReplies}
                                                                updateData={updateData}
                                                                type="childReplies"
                                                              />
                                                            </div>
                                                          )
                                                        },
                                                      )}
                                                  </Fragment>
                                                )}
                                            </Fragment>
                                          </div>
                                        </div>
                                      )
                                    })}
                                  </div>
                                )}
                              </div> */}
                            </div>
                          </Fragment>
                        )
                      )
                    })}
                </Fragment>
              )
            )
          })}
        </div>
      </div>
    </div>
  )
}
