/**
 * Toggle Admin Sidebar based on props.sidebar(Boolean)
 */

import * as React from 'react'

import {AdminSideBar} from '../Admin-Sidebar/AdminSideBar'

export const Layout = props => {
  return (
    <div>
      {props.sidebar ? (
        <div className="row w-100">
          <div className="col-md-2">
            <AdminSideBar />
          </div>
          <div className="col-md-10 bg-light pr-5">{props.children}</div>
        </div>
      ) : (
        props.children
      )}
    </div>
  )
}
