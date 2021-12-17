import axios from 'axios'

import * as ActionTypes from './actionTypes'
import {
  deleteItemFromLocalStorage,
  getItemFromLocalStorages,
  saveItemToLocalStorage,
} from '../../services/localStorage'

/**
 * Redux Action Creator
 * @returns void
 */
export const logoutUserAction = () => async dispatch => {
  dispatch({type: ActionTypes.USER_START})

  deleteItemFromLocalStorage('user')
  deleteItemFromLocalStorage('token')

  dispatch({type: ActionTypes.USER_LOGOUT})
}

/**
 * Redux Action Creator
 * @returns void
 */
export const restoreUserAction = () => async dispatch => {
  dispatch({type: ActionTypes.USER_OPETATION_START})

  const user = getItemFromLocalStorages('user')

  dispatch({type: ActionTypes.USER_RESTORE_SUCCESS, payload: user})
}

/**
 * Redux Action - Handles Login Operation
 * @param {*} data {username: string, password: string}
 * @param {*} message AntD message component
 * @param {*} history router.history
 * @returns void
 */
export const loginUserAction = (data, message, history) => async dispatch => {
  dispatch({type: ActionTypes.USER_OPETATION_START})

  await axios
    .post(`${process.env.REACT_APP_BASE_URL}/api/users/login`, data)
    .then(res => {
      if (res.status === 200) {
        message.success({
          content: res.data.successMessage,
          duration: 1,
          style: {
            marginTop: '20vh',
          },
        })

        dispatch({type: ActionTypes.USER_LOGIN_SUCCESS, payload: res.data})

        saveItemToLocalStorage('user', res.data)
        saveItemToLocalStorage('token', res.data.token)

        history.push('/')
      } else if (res.status === 201) {
        message.error({
          content: res.data.errorMessage,
          style: {
            marginTop: '20vh',
          },
        })
        dispatch({
          type: ActionTypes.USER_OPERATION_FAILED,
          payload: res.data.errorMessage,
        })
      }
    })
    .catch(err => {
      dispatch({type: ActionTypes.USER_OPERATION_FAILED, payload: err.message})
      message.error({
        content: err.message,
        style: {
          marginTop: '20vh',
        },
      })
    })
}

/**
 * Redux Action - handles Signup Operation
 * @param {*} data formData
 * @param {*} message AntD message component
 * @param {*} history router.history
 * @returns void
 */

export const signupUserAction = (data, message, history) => async dispatch => {
  dispatch({type: ActionTypes.USER_OPETATION_START})

  await axios
    .post(`${process.env.REACT_APP_BASE_URL}/api/users/signup`, data)
    .then(res => {
      dispatch({type: ActionTypes.USER_SIGNUP_SUCCESS})

      if (res.status === 200) {
        message.success({
          content: res.data.successMessage,
          style: {
            marginTop: '20vh',
          },
        })

        history.push('/login')
      }
    })
    .catch(err => {
      dispatch({type: ActionTypes.USER_OPERATION_FAILED, payload: err.message})
      message.error({
        content: err.message,
        style: {
          marginTop: '20vh',
        },
      })
    })
}

/**
 * Redux Action - handles email confirmation
 * @param {*} data {token: string}
 * @param {*} message AntD message component
 * @param {*} history router.history
 * @returns void
 */
export const confirmEmailAction = (data, message, history) => async dispatch => {
  dispatch({type: ActionTypes.USER_OPETATION_START})

  await axios
    .post(`${process.env.REACT_APP_BASE_URL}/api/users/confirm/email`, data)
    .then(res => {
      if (res.status === 200) {
        dispatch({type: ActionTypes.USER_EMAIL_CONFIRM_SUCCESS})
        message.success({
          content: res.data.successMessage,
          style: {
            marginTop: '20vh',
          },
        })

        history.push('/')
      }
    })
    .catch(err => {
      dispatch({type: ActionTypes.USER_OPERATION_FAILED, payload: err.message})
      message.error({
        content: err.message,
        style: {
          marginTop: '20vh',
        },
      })
    })
}

/**
 * Redux Action - send email confirmation message
 * @param {*} data {email: string}
 * @param {*} message AntD message component
 * @returns void
 */
export const sendConfirmationEmailAction = (data, message) => async dispatch => {
  dispatch({type: ActionTypes.USER_OPETATION_START})

  await axios
    .post(`${process.env.REACT_APP_BASE_URL}/api/users/send/confirm-mail`, data)
    .then(res => {
      if (res.status === 200) {
        dispatch({type: ActionTypes.USER_EMAIL_CONFIRM_SENDED})
        message.success({
          content: res.data.successMessage,
          style: {
            marginTop: '20vh',
          },
        })
      }
    })
    .catch(err => {
      dispatch({type: ActionTypes.USER_OPERATION_FAILED, payload: err.message})
      message.error({
        content: err.message,
        style: {
          marginTop: '20vh',
        },
      })
    })
}

/**
 * Redux Action - handles send reset email
 * @param {*} data {email: string}
 * @param {*} message AntD message component
 * @returns void
 */
export const sendForgetPasswordDetailsAction = (data, message) => async dispatch => {
  dispatch({type: ActionTypes.USER_OPETATION_START})

  await axios
    .post(`${process.env.REACT_APP_BASE_URL}/api/users/reset-password`, data)
    .then(res => {
      if (res.status === 200) {
        message.success({
          content: res.data.successMessage,
          style: {
            marginTop: '15vh',
          },
        })
      }
    })
    .catch(err => {
      dispatch({type: ActionTypes.USER_OPERATION_FAILED, payload: err.message})
      message.error({
        content: err.message,
        style: {
          marginTop: '15vh',
        },
      })
    })
}

/**
 * Redux Action - handles update password
 * @param {*} data {password: strung, confirm: string, token: string}
 * @param {*} message AntD message component
 * @param {*} history router.history
 * @returns void
 */
export const updatePasswordAction = (data, message, history) => async dispatch => {
  await axios
    .post(`${process.env.REACT_APP_BASE_URL}/api/users/update-password`, data)
    .then(res => {
      if (res.status === 200) {
        message.success({
          content: res.data.successMessage,
          style: {
            marginTop: '15vh',
          },
        })
        history.push('/login')
      } else if (res.status === 201) {
        message.error({
          content: res.data.errorMessage,
          style: {
            marginTop: '15vh',
          },
        })
      }
    })
    .catch(err => {
      dispatch({type: ActionTypes.USER_OPERATION_FAILED, payload: err.message})
      message.error({
        content: err.message,
        style: {
          marginTop: '15vh',
        },
      })
    })
}
