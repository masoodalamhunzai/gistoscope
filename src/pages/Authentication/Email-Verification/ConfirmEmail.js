/**
 * verify user once clicked on reset link from the email
 */
import * as React from 'react'
import {Button, message} from 'antd'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router'

import {confirmEmailAction} from '../../../store/actions/user-action'

import './styles.css'

export const ConfirmEmail = props => {
  const history = useHistory()
  const dispatch = useDispatch()

  const handleVerification = async () => {
    const data = {token: props.match.params.token}

    dispatch(confirmEmailAction(data, message, history))
  }

  return (
    <div className="confirmation-container">
      <h6>
        Kindly click on the button to confirm your email to use the Gistoscope
        <br />
        <div className="text-center">
          <Button className="confirmation-button" onClick={handleVerification}>
            Verify Now
          </Button>
        </div>
      </h6>
    </div>
  )
}
