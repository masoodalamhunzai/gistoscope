/**
 * Primary Navbar
 */
import * as React from 'react'
import { Dropdown, Menu } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { logoutUserAction } from '../../store/actions/user-action'
import NavigationLinks from './navigation-links'

import './styles.css'

export const Navbar = () => {
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()

  const menu = (
    <Menu style={{ padding: '10px' }}>
      <Menu.Item onClick={() => dispatch(logoutUserAction())}>
        <Link to="/login">Logout</Link>
      </Menu.Item>
    </Menu>
  )

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="logo pl-4 navbar-logo-container">
          <Link className="navbar-brand text-white" to="/">
            <img src="/assets/web-logo.png" width="160" height="100" />
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse ml-md-4" id="navbarTogglerDemo02">
          <NavigationLinks user={user} />
          <div className="float-md-right">
            {user ? (
              <Dropdown overlay={menu}>
                <a className="ant-dropdown-link navbar-dropdown">
                  <span className="px-3 pr-4 py-2 navbar-user-profile-container">
                    <DownOutlined className="pr-2 navbar-username-text" />
                    Hi, {user?.username}
                  </span>
                  <img
                    src={user?.userPicture}
                    alt="pic"
                    width="40"
                    height="40"
                    className="rounded-circle mr-3 navbar-avatar "
                  />
                </a>
              </Dropdown>
            ) : (
              <Link className="pt-0 mt-0" aria-current="page" to="/login">
                Login/Signup
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}
