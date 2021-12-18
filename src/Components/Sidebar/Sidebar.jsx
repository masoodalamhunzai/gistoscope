import React from 'react'
import './Sidebar.css'
const Sidebar = ({title}) => {
  return (
    <div className="sidebar-wrapper">
      <div className="title">
        <h4>{title}</h4>
      </div>
      <div className="sidebar-item">
        <ul>
          <li>
            <a href="#">Tree Location</a>
          </li>
          <li>
            <a href="#">Subject</a>
          </li>
          <li>
            <a href="#">Tree Location</a>
          </li>
          <li>
            <a href="#">Subject</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
