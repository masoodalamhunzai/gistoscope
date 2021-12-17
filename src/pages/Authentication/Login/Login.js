/**
 * User Login Page
 */
import React, {useState} from 'react'
import {Helmet} from 'react-helmet'
import {useDispatch} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import {Input, message, Spin} from 'antd'
import {LoadingOutlined} from '@ant-design/icons'

import {loginUserAction} from '../../../store/actions/user-action'

import './styles.css'

export const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  })

  const {email, password} = userData

  const handleChange = e => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    })
  }

  const handleLogin = async () => {
    window.scrollTo(0, 0)
    setLoading(true)

    const data = {email, password}

    dispatch(loginUserAction(data, message, history))
  }

  const antIcon = <LoadingOutlined className="login-spinner" spin />

  return (
    <div>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="form login-container">
        <div className="form-inner">
          {loading ? (
            <div className="login-spinner-wrapper">
              <Spin indicator={antIcon} />
            </div>
          ) : (
            <div>
              <p className="mb-4 text-center login-heading">Login your Account</p>
              <form onSubmit={handleLogin}>
                <div>
                  <Input
                    required
                    placeholder="Enter Your Email or Username"
                    onChange={handleChange}
                    name="email"
                    type="text"
                    id="name"
                    className="form-control mb-2"
                    autofocus
                  />
                </div>
                <div className="mt-2">
                  <Input.Password
                    placeholder="Enter Your Password"
                    onChange={handleChange}
                    name="password"
                    type="password"
                    id="password"
                    className="form-control p-1 pl-2"
                    autofocus
                    required
                  />
                </div>

                <div className="text-center">
                  <button type="submit" className="btn my-2 mt-2 w-50 mt-4 login-button">
                    Login
                  </button>
                </div>
              </form>
              <div className="mt-4">
                <p>
                  New to Forum?
                  <Link to="/signup" className="login-link">
                    Register
                  </Link>
                </p>
              </div>
              <div className="mt-4">
                <p>
                  Forgot your password?
                  <Link to="/reset-password" className="login-link">
                    Reset Here
                  </Link>
                </p>
              </div>
              <div>
                <p className="mt-4">
                  Have trouble logging in?
                  <Link to="#" className="login-link">
                    Get Help
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
