import React from 'react'
// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react/swiper-react'
// Import Swiper styles
import 'swiper/swiper-bundle.css'
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/effect-cards/effect-cards.min.css'
import './swiper.min.css'
import EditSlider from './EditSlider'
import PostSubject from '../PostSubject/PostSubject'
// Custom CSS
import './PostSlider.css'
// import Swiper core and required modules
import SwiperCore, {EffectCards} from 'swiper'
// install Swiper modules
SwiperCore.use([EffectCards])
const PostSlider = ({data}) => {
  return (
    <>
      {/* {data?.filteringPosts?.map(post => (
        <>
          <PostSubject data={data} />
          <Swiper grabCursor={true} effect={'cards'} className="SlderWrapper">
            <SwiperSlide>
              <EditSlider post={post} />
            </SwiperSlide>
          </Swiper>
        </>
      ))} */}

      <Swiper grabCursor={true} effect={'cards'} className="SlderWrapper">
        <SwiperSlide>
          <EditSlider post="Jobayer Abdullah" />
        </SwiperSlide>
        <SwiperSlide>
          <EditSlider post="Jobayer Abdullah" />
        </SwiperSlide>
        <SwiperSlide>
          <EditSlider post="Jobayer Abdullah" />
        </SwiperSlide>
        <SwiperSlide>
          <EditSlider post="Jobayer Abdullah" />
        </SwiperSlide>
        <SwiperSlide>
          <EditSlider post="Jobayer Abdullah" />
        </SwiperSlide>
        <SwiperSlide>
          <EditSlider post="Jobayer Abdullah" />
        </SwiperSlide>
      </Swiper>
    </>
  )
}
export default PostSlider
