/**
 * Admin Page Sidemenu
 */
import * as React from 'react'
import {Menu} from 'antd'
import Sider from 'antd/lib/layout/Sider'
import {NavLink} from 'react-router-dom'

import 'antd/dist/antd.css'
import './styles.css'

export const AdminSideBar = () => {
  return (
    <div>
      <Sider className="admin-sidebar">
        <div className="logo" />
        <Menu mode="inline" defaultSelectedKeys={['4']}>
          <Menu.Item key="10">
            <NavLink activeClassName="active-side" to="/admin/users">
              Users
            </NavLink>
          </Menu.Item>
          <Menu.Item key="7">
            <NavLink to="/admin/subjects">Subjects </NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  )
}
