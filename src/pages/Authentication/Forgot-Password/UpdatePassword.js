/**
 * Update Existing User Password
 */
import * as React from 'react'
import {Button, Input, message, Form} from 'antd'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router'

import {updatePasswordAction} from '../../../store/actions/user-action'

import './styles.css'

export const UpdatePassword = props => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [form] = Form.useForm()
  const token = props.match.params.token

  const submitHandler = async values => {
    const data = {
      password: values.password,
      confirm: values.confirm,
      token,
    }

    dispatch(updatePasswordAction(data, message, history))
  }

  return (
    <div>
      <div className="form new-password">
        <div className="login-inner text-center update-top-padding">
          <h4>Enter New Password</h4>
          <div className="w-100 update-container">
            <Form form={form} name="register" onFinish={submitHandler} scrollToFirstError>
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
                <Input.Password placeholder="Enter new password" />
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
                <Input.Password placeholder="Re-Enter new password" />
              </Form.Item>
              <Button type="submit" className="btn my-2 mt-2 w-50 update-button-height">
                Update
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
