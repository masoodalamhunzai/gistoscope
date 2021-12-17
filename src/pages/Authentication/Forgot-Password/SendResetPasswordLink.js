/**
 * Send Email With Password Reset Instructions
 */
import React, {useState} from 'react'
import {Button, message} from 'antd'

import {useDispatch} from 'react-redux'
import {sendConfirmationEmailAction} from '../../../store/actions/user-action'

import './styles.css'

export const SendResetPasswordLink = () => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')

  const submitHandler = async e => {
    e.preventDefault()

    dispatch(sendConfirmationEmailAction({email}, message))
  }

  return (
    <div className="form reset-container">
      <div className="form-inner text-center reset-top-padding">
        <h4>Enter Your Email</h4>
        <div className="w-100 reset-sub-container">
          <form className="w-100">
            <div className="floating-label-group my-2">
              <input
                placeholder="Enter your email"
                onChange={e => setEmail(e.target.value)}
                name="email"
                type="text"
                id="email"
                className="form-control"
                autoFocus
                required
              />
            </div>
            <Button
              onClick={submitHandler}
              className="btn my-2 mt-2 w-50 reset-top-height"
            >
              Send E-mail
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
