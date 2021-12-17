import React, {Fragment} from 'react'
import Draggable from 'react-draggable'
import moment from 'moment'
import Edit from './Edit'
import Version from './Version'
import Reply from './Reply'
import Coment from './Coment'
import ComentDialouge from './ComentDialouge'
import ComentReply from './ComentReply'
import Coments from './Coments'
import More from './More'
import PostedBy from './PostedBy'
import ChildTitleSummary from './ChildTitleSummary'
import {Menu} from 'antd'
import {CreateEdits} from '../../Components/Posts/Edits/CreateEdits'
import {CreateVersions} from '../../Components/Posts/Versions/CreateVersions'
import {CreateReplies} from '../../Components/Posts/Replies/CreateReplies'

function PostBody({
  child,
  disabled,
  spaceTop,
  space,
  success,
  setShow,
  setEditsIndex,
  setMenuPostId,
  setSuccess,
  show,
  editsIndex,
  nuOfChildEdit,
  nuOfEdit,
  versionsIndex,
  setVersionsIndex,
  nuOfChildVersions,
  nuOfVersions,
  updatePosts,
  onModelOpen,
  menuPostId,
  form,
  post,
  isAuthenticated,
  nuOfChildReply,
  commentValue,
  handleCommentChange,
  updateComponent,
}) {
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

  return (
    <Fragment key={child.id}>
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
            className="pb-4"
            style={{
              marginBottom: '0px',
              position: 'relative',
              borderTopRightRadius: '170px',
              borderTopLeftRadius: '17px',
            }}
          >
            <ChildTitleSummary child={child} />
            <div
              style={{
                background: 'white',
                border: '1px solid gray',
                borderTop: 'none',
              }}
            >
              <PostedBy child={child} moment={moment} />
              <More child={child} />
              <div className="border-top mt-5 pt-3 pl-2">
                <div
                  className="card-bottom-icons"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
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
                    setEditsIndex={setEditsIndex}
                    nuOfChildEdit={nuOfChildEdit}
                    nuOfEdit={nuOfEdit}
                  />
                  <Version
                    versionsIndex={versionsIndex}
                    setVersionsIndex={setVersionsIndex}
                    nuOfChildVersions={nuOfChildVersions}
                    nuOfVersions={nuOfVersions}
                  />
                  <Reply nuOfChildReply={nuOfChildReply} />
                  <Coment
                    isAuthenticated={isAuthenticated}
                    menu={menu}
                    setMenuPostId={setMenuPostId}
                    post={post}
                  />
                </div>
              </div>
              <ComentDialouge
                success={success}
                child={child}
                show={show}
                isAuthenticated={isAuthenticated}
                form={form}
                handleCommentChange={handleCommentChange}
                commentValue={commentValue}
              />
              <ComentReply
                success={success}
                child={child}
                show={show}
                updateComponent={updateComponent}
              />
            </div>
          </div>
        </div>
      </Draggable>
    </Fragment>
  )
}

export default PostBody
