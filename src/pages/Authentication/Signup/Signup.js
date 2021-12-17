/**
 * User Register Page
 */
import React, {useState} from 'react'
import {Helmet} from 'react-helmet'
import {useDispatch} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import {Input, Spin, Form, message} from 'antd'
import {LoadingOutlined} from '@ant-design/icons'

import {signupUserAction} from '../../../store/actions/user-action'

import './styles.css'

export const Signup = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState('')

  const handleImageChange = e => {
    setFile(e.target.files[0])
  }

  const handleSignup = async value => {
    console.log(file, 'file check')
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/

    const isOk = re.test(value.password)
    if (!isOk) {
      message.error({
        content: 'Password must contain min 8 characters, 1 capital, 1 small, 1 number',
        style: {
          marginTop: '20vh',
        },
      })
    } else {
      window.scrollTo(0, 0)
      setLoading(true)

      const data = new FormData()
      data.append('firstName', value.firstName)
      data.append('lastName', value.lastName)
      data.append('email', value.email)
      data.append('username', value.username)
      data.append('password', value.password)
      data.append('confirm', value.confirm)
      // data.append('file', file)

      dispatch(signupUserAction(data, message, history))
    }
  }

  const antIcon = <LoadingOutlined className="signup-spinner" spin />

  return (
    <div>
      <Helmet>
        <title>Signup</title>
      </Helmet>

      <div className="form">
        <div className="form-inner">
          {loading ? (
            <div className="signup-container">
              <Spin indicator={antIcon} />
            </div>
          ) : (
            <div>
              <p className="mb-4 text-center signup-heading">Create a New Account</p>
              <Form
                form={form}
                name="register"
                onFinish={handleSignup}
                scrollToFirstError
              >
                <Form.Item
                  name="firstName"
                  tooltip="What do you want others to call you?"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your First Name',
                      whitespace: true,
                    },
                  ]}
                >
                  <Input placeholder="Enter Your First Name" />
                </Form.Item>
                <Form.Item
                  name="lastName"
                  tooltip="What do you want others to call you?"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Last Name',
                      whitespace: true,
                    },
                  ]}
                >
                  <Input placeholder="Enter Your Last Name" />
                </Form.Item>
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your username!',
                      whitespace: true,
                    },
                  ]}
                >
                  <Input placeholder="Enter Your Username" />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    },
                  ]}
                >
                  <Input placeholder="Enter Your Email" />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    className="p-1 pl-2"
                    placeholder="Enter Your Password"
                  />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({getFieldValue}) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve()
                        }

                        return Promise.reject(
                          new Error('The two passwords that you entered do not match!'),
                        )
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    className="p-1 pl-2"
                    placeholder="Re-Enter Your Password"
                  />
                </Form.Item>
                <div className="my-3">
                  <label className="mb-2">Select your profile image</label>
                  <input type="file" name="file" required onChange={handleImageChange} />
                </div>
                <button type="submit" className="btn my-2 mt-2 w-100 signup-button">
                  Register
                </button>
                <div className="mt-4">
                  <p>
                    Already have an Account?
                    <Link to="/login" className="signup-link">
                      Login
                    </Link>
                  </p>
                </div>
              </Form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
