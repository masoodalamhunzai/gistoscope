/**
 * Admin Page Drawer for creating a new User
 */

import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons'
import {Form, Input, Button, Drawer, message, Spin} from 'antd'

import {signupUserAction} from '../../../store/actions/user-action'
import {formItemLayout, tailFormItemLayout} from './form-layout'

import './styles.css'

export const CreateUsers = () => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const [file, setFile] = useState('')
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const onFinish = async values => {
    window.scrollTo(0, 0)
    setLoading(true)
    const data = new FormData()
    data.append('firstName', values.FirstName)
    data.append('lastName', values.LastName)
    data.append('email', values.email)
    data.append('username', values.username)
    data.append('password', values.password)
    data.append('confirm', values.confirm)
    data.append('file', file)

    /**
     * Create New user in Database
     */

    dispatch(signupUserAction(data, message, history))
  }

  const antIcon = <LoadingOutlined className="admins-loading" spin />

  return loading ? (
    <div className="text-center fixed-top admins-top-margin">
      <Spin indicator={antIcon} />
    </div>
  ) : (
    <React.Fragment>
      <Button size="middle" icon={<PlusOutlined />} onClick={() => setVisible(true)}>
        Create New User
      </Button>
      <Drawer
        width={640}
        placement="right"
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
      >
        <div className="admins-container">
          <div>
            <h2 className="text-center ml-5 my-4">Create New User Account</h2>
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={onFinish}
              scrollToFirstError
            >
              <Form.Item
                name="FirstName"
                label="First Name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your First Name!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="LastName"
                label="Last Name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Last Name!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="E-mail"
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
                <Input />
              </Form.Item>
              <Form.Item
                name="username"
                label="Username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Username!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
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
                        new Error("The two passwords you entered don't match."),
                      )
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <div className="custom-file admins-image-file-left-margin">
                <input
                  type="file"
                  name="file"
                  required
                  multiple
                  onChange={e => setFile(e.target.files[0])}
                />
                <label className="custom-file-label" htmlFor="customFile"></label>
              </div>
              <Form.Item {...tailFormItemLayout}>
                <Button htmlType="submit" className="w-100">
                  Register
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Drawer>
    </React.Fragment>
  )
}
