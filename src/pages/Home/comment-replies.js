import * as React from 'react'
import {Fragment} from 'react'
import Draggable from 'react-draggable'
import {CheckCircleFilled, FlagFilled, VerifiedOutlined} from '@ant-design/icons'
import moment from 'moment'
import PostedBy from '../Posts-By-Subjects/PostedBy'
import More from '../Posts-By-Subjects/More'
import Coments from '../Posts-By-Subjects/Coments'
import Edit from '../Posts-By-Subjects/Edit'
import Version from '../Posts-By-Subjects/Version'
import Reply from '../Posts-By-Subjects/Reply'
import Coment from '../Posts-By-Subjects/Coment'
import ComentDialouge from '../Posts-By-Subjects/ComentDialouge'
import ComentReply from '../Posts-By-Subjects/ComentReply'
import MenuItems from './Menu'

import './styles.css'

function CommentReplies({
  disabled,
  spaceTop,
  space,
  child,
  setSuccess,
  show,
  setShow,
  editsIndex,
  setEditsIndex,
  nuOfChildEdit,
  nuOfEdit,
  versionsIndex,
  setVersionsIndex,
  nuOfVersions,
  nuOfChildVersions,
  nuOfChildReply,
  user,
  setMenuPostId,
  post,
  success,
  form,
  updateComponent,
  setCommentValue,
  commentValue,
  updatePosts,
  menuPostId,
  setDisabled,
}) {
  const menu = (
    <MenuItems
      updatePosts={updatePosts}
      onModelOpen={data => setDisabled(data)}
      menuPostId={menuPostId}
    />
  )

  const containerStyles = {top: spaceTop, left: space}
  return (
    <Fragment>
      <Draggable disabled={disabled}>
        <div className="handle home-comment-replies-container" style={containerStyles}>
          <div className="pb-4 home-comment-replies-container-drawer">
            <div className="home-comment-replies-subcontainer-drawer">
                <PostedBy child={child} moment={moment} />
                <More child={child} />
              <div className="float-right moderator-icons mr-4">
                <FlagFilled className="home-flag-filled" />
                <VerifiedOutlined className="home-verified-outlined" />
                <CheckCircleFilled className="home-checked-circle-filled" />
              </div>
              <div className="border-top mt-5 pt-3 pl-2">
                <div className="card-bottom-icons home-bottom-card-icons-container">
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
                      isAuthenticated={() => user}
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
                  isAuthenticated={() => user}
                  form={form}
                  handleCommentChange={e => setCommentValue(e.target.value)}
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

export default CommentReplies
