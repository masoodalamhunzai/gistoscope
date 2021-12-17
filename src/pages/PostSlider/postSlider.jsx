import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import Sidebar from '../../Components/Sidebar/Sidebar'
import './styles.css'
import Slider from '../../Components/PostComponents/NestSlider/PostSlider'

const PostSlider = () => {
  const postState = useSelector(state => state.post)
  const [post, setPost] = useState(null)

  useEffect(() => {
    setPost(postState)
  }, [postState])
  return (
    <div className="row container-fluid">
      <div className="col-md-3">
        <div id="post-wrapper">
          <div className="sidebar-content">
            <Sidebar title="Future Menu" />
            <Sidebar title="Improve Your Feeds" />
          </div>
        </div>
      </div>
      <div className="col-md-9">
        <div className="post-content">
          <Slider data={post} />
        </div>
      </div>
    </div>
  )
}

export default PostSlider
