/**
 * responsible for rendering home page of the website
 */
import * as React from 'react'
import { Fragment, useEffect, useState } from 'react'
import moment from 'moment'
import { Form } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import RightSidePosts from '../Posts-By-Subjects/RightSidePosts'
import FutureMenu from './FutureMenu'
import SubjectName from './SubjectName'
import MenuItems from './Menu'
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
  //  console.log(state, "state")
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
                      const nuOfVersions = post?.children?.filter(
                        c => c.type === 'versions'  && c.subjectId !== null,
                      )
                      const nuOfReply = post?.children?.filter(
                        c => c.type === 'replies'  && c.subjectId !== null,
                      )
                      return (
                        i === postIndex && (
                            <div className="home-relative-position" key={i}>
                              <Swiper grabCursor={true} effect={'cards'} className="SlderWrapper">
                                <SwiperSlide>
                                  <div className="containersFlexMain">
                                    <div className="home-relative-position">
                                      <RotationComponent
                                        nuOfEdit={nuOfEdit}
                                        nuOfVersions={nuOfVersions}
                                        post={post}
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
                                    <div className="home-relative-position">
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
                                          updateIndex={i => setPostIndex(i)}
                                          updateData={updateData}
                                        />
                                    </div>
                                  </div>
                                </SwiperSlide>
                              </Swiper>
                            </div>
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
