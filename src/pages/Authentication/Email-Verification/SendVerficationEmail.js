/**
 * Send verification email to user's mail
 */
import * as React from 'react'
import {Button, message} from 'antd'
import {useDispatch, useSelector} from 'react-redux'

import {sendConfirmationEmailAction} from '../../../store/actions/user-action'

import './styles.css'

export const SendVerficationEmail = () => {
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()

  const handleVerification = async () => {
    const data = {email: user?.email}

    dispatch(sendConfirmationEmailAction(data, message))
  }

  return (
    <div className="verification-container">
      <h6>
        Kindly Verify your email to use the Gistoscope
        <br />
        <div className="text-center">
          <Button className="confirmation-button" onClick={handleVerification}>
            Send E-mail
          </Button>
        </div>
      </h6>
    </div>
  )
}
