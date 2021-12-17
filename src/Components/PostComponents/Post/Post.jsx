import React from 'react'
import './Post.css'
import Avatar from '../../../images/avatar.jpg'

const Post = props => {
  return (
    <div className="post-info">
      <div className="post-inner">
        <div className="row post-head">
          <div className="PostUser">
            <div className="user-photo">
              <img src={Avatar} alt="user" />
            </div>
            <div className="user-info">
              <h4>{props.user}</h4>
              <p>Posted on: Tuesday, August 23th 2021, 01:24:22 am (2 months ago) </p>
            </div>
          </div>
        </div>
        <div className="post-content">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,
            specimen book
          </p>
          <p>
            when an unknown printer took a galley of type and scrambled it to make a type
          </p>
          <a href>(More)</a>
        </div>
      </div>
    </div>
  )
}

export default Post
