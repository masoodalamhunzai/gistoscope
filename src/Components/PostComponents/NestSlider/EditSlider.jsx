import React, {Component, Fragment, useRef} from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
// import './NestSlider.css'
import {BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill} from 'react-icons/bs'
import {FaRegCommentDots} from 'react-icons/fa'
import EditPost from '../Post/Post'
import Slider from 'react-slick'
import PostHeader from '../PostHeader/PostHeader'
import User from '../../../images/avatar.jpg'

const EditSlider = ({post}) => {
  let slider = useRef(null)

  const next = () => {
    slider.slickNext()
  }

  const previous = () => {
    slider.slickPrev()
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
  // console.log(post, 'Edit slider')
  return (
    <Fragment>
      {/* Item One */}
      <div className="SliderItem">
        <PostHeader />
        <Slider className="SmallSlider" ref={c => (slider = c)} {...EditSlider}>
          <EditPost user="Ali Hasan" />
          <EditPost user="Jhon Wick" />
          <EditPost user="Michel Wilson" />
        </Slider>
        <div className="post-activity">
          <div className="row activity-left">
            <div className="comments">
              <FaRegCommentDots />{' '}
              <p>
                View Comments<span>(2)</span>
              </p>
            </div>
            <div className="Edit">
              <button className="EditLeftArr" onClick={next}>
                <BsFillArrowLeftSquareFill />
              </button>
              <span>01</span>
              <span>Edits</span> <span>05</span>
              <button className="EditRightArr" onClick={previous}>
                <BsFillArrowRightSquareFill />
              </button>
            </div>
            <div className="Version">
              <button className="VerLeftArr" onClick={next}>
                <BsFillArrowLeftSquareFill />
              </button>
              <span>01</span>
              <span>Version</span> <span>05</span>
              <button className="VerRightArr" onClick={previous}>
                <BsFillArrowRightSquareFill />
              </button>
            </div>
            <div className="replies">
              <p>
                Replies <span style={{color: '#4e4eec'}}>(09)</span>
              </p>
            </div>
          </div>
          <div className="row activity-right">
            <div className="write-post">
              <img className="user-image" src={User} alt="user" />
              <input type="text" placeholder="Can you say better?" />
              <button>Tell Us</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default EditSlider
