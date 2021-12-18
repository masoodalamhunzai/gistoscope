import * as React from 'react'
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
            const SecondCznEdits = filter?.children?.filter(c => c.type === 'edits')
            const SecondCznVersions = filter?.children?.filter(c => c.type === 'versions')
            return (
              index !== props?.postIndex &&
              filter?.id !== props?.postId && (
                <SwiperSlide key={index}>
                  <div className="slider-container">
                    <RotationComponent
                      nuOfEdit={SecondCznEdits}
                      nuOfVersions={SecondCznVersions}
                      post={filter}
                      nuOfReply={props?.nuOfReply}
                      index={index}
                      updateIndex={props?.updateIndex}
                      updateData={props?.updateData}
                      type="2nd-Cousin"
                    />
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
