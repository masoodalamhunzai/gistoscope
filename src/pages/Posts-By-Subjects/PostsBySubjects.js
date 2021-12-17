import React, {Fragment, useEffect, useState} from 'react'
import Draggable from 'react-draggable'
import RightSidePosts from './RightSidePosts'
import {useDispatch, useSelector} from 'react-redux'
import {CheckCircleFilled, FlagFilled, VerifiedOutlined} from '@ant-design/icons'
import {Button, Form, message, Menu} from 'antd'
import moment from 'moment'
import Edit from './Edit'
import Version from './Version'
import Reply from './Reply'
import Coment from './Coment'
import ComentDialouge from './ComentDialouge'
import ComentReply from './ComentReply'
import {CreateEdits} from '../../Components/Posts/Edits/CreateEdits'
import {CreateVersions} from '../../Components/Posts/Versions/CreateVersions'
import {CreateReplies} from '../../Components/Posts/Replies/CreateReplies'
import {RotationComponent} from '../../Components/Posts/Rotation-tool/RotationComponent'
import Coments from './Coments'
import More from './More'
import PostedBy from './PostedBy'
import SubjectName from './SubjectName'
import ChildTitleSummary from './ChildTitleSummary'
import SubjectLocation from './SubjectLocation'

import {
  getFilteredPostsAction,
  getMainSubjects as getMainSubjectsAction,
  getSubjectsAction,
  getSubjectsByIdAction,
} from '../../store/actions/post.action'

import './styles.css'
import PostBody from './post-body'

export const PostsBySubjects = props => {
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()

  const subjectId = props.match.params.id
  const [form] = Form.useForm()
  const [filterPosts, setFilterPosts] = useState([])
  const [subjectData, setSubjectData] = useState({})
  const [, setSubjects] = useState([])
  const [commentValue, setCommentValue] = useState('')
  const [success, setSuccess] = useState(false)
  const [postId] = useState('')
  const [show, setShow] = useState(false)
  const [postIndex, setPostIndex] = useState(0)
  const [menuPostId, setMenuPostId] = useState('')
  const [editsIndex, setEditsIndex] = useState(-1)
  const [versionsIndex, setVersionsIndex] = useState(-1)
  const [disabled, setDisabled] = useState(false)

  const getSubject = () => {
    getSubjectsAction(subjectId, setSubjectData)
  }

  const getPosts = async () => {
    dispatch(getFilteredPostsAction(subjectId, setFilterPosts))
  }

  const handleCommentChange = e => {
    setCommentValue(e.target.value)
  }

  const updateComponent = () => {
    getPosts()
  }

  const updatePosts = () => {
    getPosts()
  }

  const onModelOpen = data => {
    setDisabled(data)
  }

  const isAuthenticated = () => user

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <CreateEdits
          refreshFunction={updatePosts}
          onModelOpen={onModelOpen}
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
          postId={menuPostId}
        />
      </Menu.Item>
    </Menu>
  )

  const updateData = () => {
    getPosts()
  }

  const updateIndex = i => {
    setPostIndex(i)
  }

  const getMainSubjects = async () => {
    dispatch(getMainSubjectsAction(setSubjects, message))
  }

  const getSubjectById = id => {
    dispatch(getSubjectsByIdAction(id, renderChild))
  }

  const renderChild = data => {
    data.parentId && getSubjectById(data.parentId._id)
  }

  const showLinearTree = async () => {
    document.getElementById('myList').style.display = 'block'
    document
      .getElementById('myList')
      .append(...Array.from(document.getElementById('myList').childNodes).reverse())
  }

  useEffect(() => {
    getPosts()
    getSubject()
    getMainSubjects()
  }, [])

  return (
    <div>
      <div className="row">
        <div
          className="col-md-2 future-tree"
          style={{
            background: '#FFFFFF',
            paddingRight: '0px',
            width: '340px',
            borderRight: '4px solid rgba(0, 0, 0, 0.05)',
          }}
        >
          <div
            className="ml-4 mt-5 pb-4"
            style={{
              minHeight: '314px',
              width: '280px',
              background: '#F7F7F7',
            }}
          >
            <div className="subject-location">
              <SubjectLocation />
            </div>
            <div>{renderChild(subjectData)}</div>
            <div className="text-center mt-2 mb-4">
              <Button onClick={showLinearTree}>Show subject in tree</Button>
            </div>
            <div
              className="parent-Evthng"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <p>Everything</p>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div id="myList">
                <div
                  style={{
                    background: 'red',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  {subjectData.name}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-9 col-sm-9">
          {/* <div>
            <div> */}
          <div className="subject-data">
            <SubjectName subjectData={subjectData} />
          </div>
          {filterPosts.length > 0 &&
            filterPosts.map((post, i) => {
              const nuOfEdit = post.children.filter(c => c.type === 'edits')
              const EditArray = post.children.filter(
                c => c.type === 'edits' || c.type === 'versions',
              )
              const nuOfVersions = post.children.filter(c => c.type === 'versions')
              const nuOfReply = post.children.filter(c => c.type === 'replies')
              let mainPostSpacing
              let mainPostTopSpacing
              if (EditArray.length < 6) {
                mainPostSpacing = EditArray && EditArray.length * 0.6 + 'em'
                mainPostTopSpacing = EditArray && EditArray.length * 0.6 + 'em'
              }
              if (EditArray.length >= 6) {
                mainPostSpacing = EditArray && EditArray.length * 0.1 + 'em'
                mainPostTopSpacing = EditArray && EditArray.length * 0.1 + 'em'
              }
              return (
                i === postIndex && (
                  <Fragment>
                    <div>
                      <div className="mt-3" style={{position: 'relative'}}>
                        <div className="containersFlexMain">
                          <>
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
                                const nuOfChildEdit = child.children.filter(
                                  c => c.type === 'edits',
                                )
                                const nuOfChildVersions = child.children.filter(
                                  c => c.type === 'versions',
                                )
                                const nuOfChildReply = child.children.filter(
                                  c => c.type === 'replies',
                                )
                                return (
                                  <PostBody
                                    key={child._id}
                                    child={child}
                                    disabled={disabled}
                                    spaceTop={spaceTop}
                                    space={space}
                                    success={success}
                                    setShow={setShow}
                                    setEditsIndex={setEditsIndex}
                                    setMenuPostId={setMenuPostId}
                                    setSuccess={setSuccess}
                                    show={show}
                                    editsIndex={editsIndex}
                                    nuOfChildEdit={nuOfChildEdit}
                                    nuOfEdit={nuOfEdit}
                                    versionsIndex={versionsIndex}
                                    setVersionsIndex={setVersionsIndex}
                                    nuOfChildVersions={nuOfChildVersions}
                                    nuOfVersions={nuOfVersions}
                                    updatePosts={updatePosts}
                                    onModelOpen={onModelOpen}
                                    menuPostId={menuPostId}
                                    form={form}
                                    post={post}
                                    isAuthenticated={isAuthenticated}
                                    nuOfChildReply={nuOfChildReply}
                                    commentValue={commentValue}
                                    handleCommentChange={handleCommentChange}
                                    updateComponent={updateComponent}
                                  />
                                )
                              })}
                            <RotationComponent
                              nuOfEdit={nuOfEdit}
                              nuOfVersions={nuOfVersions}
                              post={post}
                              mainPostSpacing={mainPostSpacing}
                              mainPostTopSpacing={mainPostTopSpacing}
                              nuOfReply={nuOfReply}
                              updateData={updateData}
                              updateIndex={updateIndex}
                              menu={menu}
                            />
                          </>
                          <>
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
                              setVersionsIndex={setVersionsIndex}
                              nuOfVersions={nuOfVersions}
                              isAuthenticated={isAuthenticated}
                              menu={menu}
                              setMenuPostId={setMenuPostId}
                              post={post}
                              success={success}
                              form={form}
                              handleCommentChange={handleCommentChange}
                              commentValue={commentValue}
                              updateComponent={updateComponent}
                              nuOfReply={nuOfReply}
                              updateIndex={updateIndex}
                              updateData={updateData}
                            />
                          </>
                        </div>
                        <div className="edit-version">
                          {nuOfReply && nuOfReply.length > 0 && (
                            <div className="containersFlex">
                              {nuOfReply.map(child => {
                                const nuOfReplyEdit =
                                  child.children &&
                                  child.children.filter(c => c.type === 'edits')
                                const ReplyEditArray =
                                  child.children &&
                                  child.children.filter(
                                    c => c.type === 'edits' || c.type === 'versions',
                                  )
                                const nuOfReplyVersions =
                                  child.children &&
                                  child.children.filter(c => c.type === 'versions')
                                const nuOfReplyReplies =
                                  child.children &&
                                  child.children.filter(c => c.type === 'replies')
                                let mainPostSpacing
                                let mainPostTopSpacing
                                if (ReplyEditArray.length < 6) {
                                  mainPostSpacing =
                                    ReplyEditArray && ReplyEditArray.length * 0.6 + 'em'
                                  mainPostTopSpacing =
                                    ReplyEditArray && ReplyEditArray.length * 0.6 + 'em'
                                }
                                if (ReplyEditArray.length >= 6) {
                                  mainPostSpacing =
                                    ReplyEditArray && ReplyEditArray.length * 0.1 + 'em'
                                  mainPostTopSpacing =
                                    ReplyEditArray && ReplyEditArray.length * 0.1 + 'em'
                                }
                                return (
                                  <>
                                    <div
                                      className="mt-5"
                                      style={{
                                        position: 'relative',
                                        marginRight: '40px',
                                      }}
                                    >
                                      {ReplyEditArray &&
                                        ReplyEditArray.length > 0 &&
                                        ReplyEditArray.map((oneChild, index) => {
                                          let space
                                          let spaceTop
                                          if (ReplyEditArray.length < 6) {
                                            space = index * 0.6 + 'em'
                                            spaceTop = index * 0.6 + 'em'
                                          }
                                          if (ReplyEditArray.length >= 6) {
                                            space = index * 0.1 + 'em'
                                            spaceTop = index * 0.1 + 'em'
                                          }
                                          const nuOfChildEdit =
                                            oneChild.children &&
                                            oneChild.children.length > 0 &&
                                            oneChild.children.filter(
                                              c => c.type === 'edits',
                                            )
                                          const nuOfChildReply =
                                            oneChild.children &&
                                            oneChild.children.length > 0 &&
                                            oneChild.children.filter(
                                              c => c.type === 'replies',
                                            )
                                          return (
                                            <Fragment key={oneChild._id}>
                                              <Draggable disabled={disabled}>
                                                <div
                                                  className="handle"
                                                  style={{
                                                    position: 'absolute',
                                                    top: spaceTop,
                                                    left: space,
                                                    display: 'block',
                                                    width: '69vw',
                                                    background: 'white',
                                                  }}
                                                >
                                                  <div
                                                    className="pb-4 "
                                                    style={{
                                                      marginBottom: '0px',
                                                      position: 'relative',
                                                      borderTopRightRadius: '170px',
                                                      borderTopLeftRadius: '17px',
                                                    }}
                                                  >
                                                    <div>
                                                      <ChildTitleSummary child={child} />
                                                    </div>
                                                    <div
                                                      style={{
                                                        background: 'white',
                                                        border: '1px solid gray',
                                                        borderTop: 'none',
                                                      }}
                                                    >
                                                        <PostedBy
                                                          child={child}
                                                          moment={moment}
                                                        />
                                                        <More child={child} />
                                                      <div className="float-right moderator-icons mr-4">
                                                        <FlagFilled
                                                          style={{
                                                            color: '#FF0000',
                                                          }}
                                                        />
                                                        <VerifiedOutlined
                                                          style={{
                                                            color: '#0077B6',
                                                          }}
                                                        />
                                                        <CheckCircleFilled
                                                          style={{
                                                            color: '#38C172',
                                                          }}
                                                        />
                                                      </div>
                                                      <div className="border-top mt-5 pt-3 pl-2">
                                                        <div
                                                          className="card-bottom-icons"
                                                          style={{
                                                            display: 'flex',
                                                            marginLeft: '21px',
                                                          }}
                                                        >
                                                            <Coments
                                                              setSuccess={setSuccess}
                                                              setShow={setShow}
                                                              child={child}
                                                              show={show}
                                                            />
                                                            <Edit
                                                              editsIndex={editsIndex}
                                                              setEditsIndex={
                                                                setEditsIndex
                                                              }
                                                              nuOfChildEdit={
                                                                nuOfChildEdit
                                                              }
                                                              nuOfEdit={nuOfEdit}
                                                            />
                                                            <Version
                                                              versionsIndex={
                                                                versionsIndex
                                                              }
                                                              setVersionsIndex={
                                                                setVersionsIndex
                                                              }
                                                              nuOfChildVersions={
                                                                nuOfReplyVersions
                                                              }
                                                              nuOfVersions={nuOfVersions}
                                                            />
                                                            <Reply
                                                              nuOfChildReply={
                                                                nuOfChildReply
                                                              }
                                                            />
                                                            <Coment
                                                              isAuthenticated={
                                                                isAuthenticated
                                                              }
                                                              menu={menu}
                                                              setMenuPostId={
                                                                setMenuPostId
                                                              }
                                                              post={post}
                                                            />
                                                        </div>
                                                      </div>
                                                        <ComentDialouge
                                                          success={success}
                                                          child={child}
                                                          show={show}
                                                          isAuthenticated={
                                                            isAuthenticated
                                                          }
                                                          form={form}
                                                          handleCommentChange={
                                                            handleCommentChange
                                                          }
                                                          commentValue={commentValue}
                                                        />
                                                        <ComentReply
                                                          success={success}
                                                          child={child}
                                                          show={show}
                                                          updateComponent={
                                                            updateComponent
                                                          }
                                                        />
                                                    </div>
                                                  </div>
                                                </div>
                                              </Draggable>
                                            </Fragment>
                                          )
                                        })}

                                      <RotationComponent
                                        nuOfEdit={nuOfReplyEdit}
                                        nuOfVersions={nuOfReplyVersions}
                                        post={child}
                                        mainPostSpacing={mainPostSpacing}
                                        mainPostTopSpacing={mainPostTopSpacing}
                                        nuOfReply={nuOfReplyReplies}
                                        updateData={updateData}
                                        menu={menu}
                                        type="replies"
                                      />
                                      <>
                                        {nuOfReplyReplies && nuOfReplyReplies.length > 0 && (
                                          <>
                                            {nuOfReplyReplies &&
                                              nuOfReplyReplies.length > 0 &&
                                              nuOfReplyReplies.map(secondChild => {
                                                const nuOfReplyEdit =
                                                  secondChild.children.filter(
                                                    c => c.type === 'edits',
                                                  )
                                                const secondChildReplyEditArray =
                                                  secondChild.children.filter(
                                                    c =>
                                                      c.type === 'edits' ||
                                                      c.type === 'versions',
                                                  )
                                                const nuOfReplyVersions =
                                                  secondChild.children.filter(
                                                    c => c.type === 'versions',
                                                  )
                                                const nuOfReplyReplies =
                                                  secondChild.children.filter(
                                                    c => c.type === 'replies',
                                                  )
                                                let mainPostSpacing
                                                let mainPostTopSpacing
                                                if (
                                                  secondChildReplyEditArray.length < 6
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
                                                  secondChildReplyEditArray.length >= 6
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
                                                    className="mt-5"
                                                    style={{
                                                      position: 'relative',
                                                      marginRight: '60px',
                                                    }}
                                                    key={secondChild._id}
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
                                                            space = index * 0.6 + 'em'
                                                            spaceTop = index * 0.6 + 'em'
                                                          }
                                                          if (
                                                            secondChildReplyEditArray.length >=
                                                            6
                                                          ) {
                                                            space = index * 0.1 + 'em'
                                                            spaceTop = index * 0.1 + 'em'
                                                          }
                                                          const nuOfChildEdit =
                                                            secondChildEdits.children.filter(
                                                              c => c.type === 'edits',
                                                            )
                                                          const nuOfChildReply =
                                                            secondChildEdits.children.filter(
                                                              c => c.type === 'replies',
                                                            )
                                                          return (
                                                            <Fragment
                                                              key={secondChildEdits}
                                                            >
                                                              <Draggable
                                                                disabled={disabled}
                                                              >
                                                                <div
                                                                  className="handle"
                                                                  style={{
                                                                    position: 'absolute',
                                                                    top: spaceTop,
                                                                    left: space,
                                                                    width: '69vw',
                                                                    background: 'white',
                                                                  }}
                                                                >
                                                                  <div
                                                                    className="pb-4 "
                                                                    style={{
                                                                      marginBottom: '0px',
                                                                      position:
                                                                        'relative',
                                                                      borderTopRightRadius:
                                                                        '170px',
                                                                      borderTopLeftRadius:
                                                                        '17px',
                                                                    }}
                                                                  >
                                                                    <div>
                                                                      <ChildTitleSummary
                                                                        child={child}
                                                                      />
                                                                    </div>{' '}
                                                                    <div
                                                                      style={{
                                                                        background:
                                                                          'white',
                                                                        border:
                                                                          '1px solid gray',
                                                                        borderTop: 'none',
                                                                      }}
                                                                    >
                                                                      <div>
                                                                        <PostedBy
                                                                          child={child}
                                                                          moment={moment}
                                                                        />
                                                                      </div>
                                                                      <div>
                                                                        <More
                                                                          child={child}
                                                                        />
                                                                      </div>
                                                                      <div className="float-right moderator-icons mr-4">
                                                                        <FlagFilled
                                                                          style={{
                                                                            color:
                                                                              '#FF0000',
                                                                          }}
                                                                        />
                                                                        <VerifiedOutlined
                                                                          style={{
                                                                            color:
                                                                              '#0077B6',
                                                                          }}
                                                                        />
                                                                        <CheckCircleFilled
                                                                          style={{
                                                                            color:
                                                                              '#38C172',
                                                                          }}
                                                                        />
                                                                      </div>
                                                                      <div></div>
                                                                      <div className="border-top mt-5 pt-3 pl-2">
                                                                        <div
                                                                          className="card-bottom-icons"
                                                                          style={{
                                                                            display:
                                                                              'flex',
                                                                            marginLeft:
                                                                              '21px',
                                                                          }}
                                                                        >
                                                                          <div>
                                                                            <Coments
                                                                              setSuccess={
                                                                                setSuccess
                                                                              }
                                                                              setShow={
                                                                                setShow
                                                                              }
                                                                              child={
                                                                                child
                                                                              }
                                                                              show={show}
                                                                            />
                                                                          </div>
                                                                          <div>
                                                                            <Edit
                                                                              editsIndex={
                                                                                editsIndex
                                                                              }
                                                                              setEditsIndex={
                                                                                setEditsIndex
                                                                              }
                                                                              nuOfChildEdit={
                                                                                nuOfChildEdit
                                                                              }
                                                                              nuOfEdit={
                                                                                nuOfEdit
                                                                              }
                                                                            />
                                                                          </div>
                                                                          <div>
                                                                            <Version
                                                                              versionsIndex={
                                                                                versionsIndex
                                                                              }
                                                                              setVersionsIndex={
                                                                                setVersionsIndex
                                                                              }
                                                                              nuOfChildVersions={
                                                                                nuOfReplyVersions
                                                                              }
                                                                              nuOfVersions={
                                                                                nuOfVersions
                                                                              }
                                                                            />
                                                                          </div>
                                                                          <div>
                                                                            <Reply
                                                                              nuOfChildReply={
                                                                                nuOfChildReply
                                                                              }
                                                                            />
                                                                          </div>
                                                                          <div>
                                                                            <Coment
                                                                              isAuthenticated={
                                                                                isAuthenticated
                                                                              }
                                                                              menu={menu}
                                                                              setMenuPostId={
                                                                                setMenuPostId
                                                                              }
                                                                              post={post}
                                                                            />
                                                                          </div>
                                                                        </div>
                                                                      </div>
                                                                      <div>
                                                                        <ComentDialouge
                                                                          success={
                                                                            success
                                                                          }
                                                                          child={child}
                                                                          show={show}
                                                                          isAuthenticated={
                                                                            isAuthenticated
                                                                          }
                                                                          form={form}
                                                                          handleCommentChange={
                                                                            handleCommentChange
                                                                          }
                                                                          commentValue={
                                                                            commentValue
                                                                          }
                                                                        />
                                                                      </div>
                                                                      <div>
                                                                        <ComentReply
                                                                          success={
                                                                            success
                                                                          }
                                                                          child={child}
                                                                          show={show}
                                                                          updateComponent={
                                                                            updateComponent
                                                                          }
                                                                        />
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </Draggable>
                                                            </Fragment>
                                                          )
                                                        },
                                                      )}
                                                    <RotationComponent
                                                      nuOfEdit={nuOfReplyEdit}
                                                      nuOfVersions={nuOfReplyVersions}
                                                      post={secondChild}
                                                      replyId={child._id}
                                                      mainPostSpacing={mainPostSpacing}
                                                      mainPostTopSpacing={
                                                        mainPostTopSpacing
                                                      }
                                                      nuOfReply={nuOfReplyReplies}
                                                      updateData={updateData}
                                                      type="childReplies"
                                                    />
                                                  </div>
                                                )
                                              })}
                                          </>
                                        )}
                                      </>
                                    </div>
                                  </>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Fragment>
                )
              )
            })}
        </div>
        {/* </div>
        </div> */}
      </div>
    </div>
  )
}
