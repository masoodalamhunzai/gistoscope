import * as React from 'react'
import {Fragment} from 'react'
import Edit from './Edit'
import Coments from './Coments'
import Version from './Version'
import Reply from './Reply'
import Coment from './Coment'
import More from './More'
import PostedBy from './PostedBy'
import ComentDialouge from './ComentDialouge'
import ComentReply from './ComentReply'
import ChildTitleSummary from './ChildTitleSummary'
import {RotationComponent} from '../../Components/Posts/Rotation-tool/RotationComponent'

import {Swiper, SwiperSlide} from 'swiper/react/swiper-react'
// Import Swiper styles
import 'swiper/swiper-bundle.css'
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/effect-cards/effect-cards.min.css'
import '../Home/PostSlider.css'
import '../Home/swiper.min.css'

// import Swiper core and required modules
import SwiperCore, {EffectCards} from 'swiper'
// install Swiper modules

SwiperCore.use([EffectCards])

const RightSidePosts = props => {
  return (
    <>
      <Swiper grabCursor={true} effect={'cards'} className="SlderWrapper">
        {props?.filterPosts &&
          props?.filterPosts?.length > 0 &&
          props?.filterPosts?.map((filter, index) => {
            const SecondCznEditArray = filter?.children?.filter(
              c => c.type === 'edits' || c.type === 'versions',
            )
            const SecondCznEdits = filter?.children?.filter(c => c.type === 'edits')
            const SecondCznVersions = filter?.children?.filter(c => c.type === 'versions')
            let mainFilterPostSpacing
            let mainFilterPostTopSpacing
            if (SecondCznEditArray?.length < 6) {
              mainFilterPostSpacing =
                SecondCznEditArray && SecondCznEditArray?.length * 0.6 + 'em'
              mainFilterPostTopSpacing =
                SecondCznEditArray && SecondCznEditArray?.length * 0.6 + 'em'
            }
            if (SecondCznEditArray?.length >= 6) {
              mainFilterPostSpacing =
                SecondCznEditArray && SecondCznEditArray?.length * 0.1 + 'em'
              mainFilterPostTopSpacing =
                SecondCznEditArray && SecondCznEditArray?.length * 0.1 + 'em'
            }
            return (
              index !== props?.postIndex &&
              filter?.id !== props?.postId && (
                <SwiperSlide key={index}>
                  <div className="slider-container">
                    <Fragment>
                      {SecondCznEditArray &&
                        SecondCznEditArray?.length > 0 &&
                        SecondCznEditArray?.map((filterChild, index) => {
                          let space
                          let spaceTop
                          if (SecondCznEditArray?.length < 6) {
                            space = index * 0.6 + 'em'
                            spaceTop = index * 0.6 + 'em'
                          }
                          if (SecondCznEditArray?.length >= 6) {
                            space = index * 0.1 + 'em'
                            spaceTop = index * 0.1 + 'em'
                          }
                          return (
                            <Fragment key={index}>
                              {/* <Fragment key={filterChild.id}> */}
                              <div disabled={props?.disabled}>
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
                                    <>
                                      <ChildTitleSummary child={filterChild} />
                                    </>
                                    <div
                                      style={{
                                        background: 'white',
                                        border: '1px solid gray',
                                        borderTop: 'none',
                                      }}
                                    >
                                      <>
                                        <PostedBy
                                          child={filterChild}
                                          moment={props?.moment}
                                        />
                                      </>
                                      <>
                                        <More child={filterChild} />
                                      </>
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
                                            setSuccess={props?.setSuccess}
                                            setShow={props?.setShow}
                                            child={props?.filterChild}
                                            show={props?.show}
                                          />
                                          <Edit
                                            editsIndex={props?.editsIndex}
                                            setEditsIndex={props?.setEditsIndex}
                                            nuOfChildEdit={props?.SecondCznEdits}
                                            nuOfEdit={props?.nuOfEdit}
                                          />
                                          <Version
                                            versionsIndex={props?.versionsIndex}
                                            setVersionsIndex={props?.setVersionsIndex}
                                            nuOfChildVersions={props?.SecondCznVersions}
                                            nuOfVersions={props?.nuOfVersions}
                                          />

                                          <Reply nuOfChildReply={props?.SecondCznReply} />
                                          <Coment
                                            isAuthenticated={props?.isAuthenticated}
                                            menu={props?.menu}
                                            setMenuPostId={props?.setMenuPostId}
                                            post={props?.post}
                                          />
                                        </div>
                                      </div>
                                      <>
                                        <ComentDialouge
                                          success={props?.success}
                                          child={props?.filterChild}
                                          show={props?.show}
                                          isAuthenticated={props?.isAuthenticated}
                                          form={props?.form}
                                          handleCommentChange={props?.handleCommentChange}
                                          commentValue={props?.commentValue}
                                        />

                                        <ComentReply
                                          success={props?.success}
                                          child={props?.filterChild}
                                          show={props?.show}
                                          updateComponent={props?.updateComponent}
                                        />
                                      </>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Fragment>
                          )
                        })}
                      <RotationComponent
                        nuOfEdit={SecondCznEdits}
                        nuOfVersions={SecondCznVersions}
                        post={filter}
                        mainPostSpacing={mainFilterPostSpacing}
                        mainPostTopSpacing={mainFilterPostTopSpacing}
                        nuOfReply={props?.nuOfReply}
                        index={index}
                        updateIndex={props?.updateIndex}
                        updateData={props?.updateData}
                        type="2nd-Cousin"
                      />
                    </Fragment>
                  </div>
                </SwiperSlide>
              )
            )
          })}
      </Swiper>
    </>
  )
}

export default RightSidePosts
