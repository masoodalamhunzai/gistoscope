import axios from 'axios'
import * as ActionTypes from './actionTypes'

/**
 * Redux Action Creator
 * @param {*} setLoading function
 * @param {*} setUsers function
 * @param {*} message AntD message component
 * @returns void
 */
export const getUsersAction = (setLoading, setUsers, message) => async dispatch => {
  dispatch({ type: ActionTypes.ADMIN_OPETATION_START })

  setLoading(true)
  await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users/get`).then(res => {
    if (res.status === 200) {
      dispatch({ type: ActionTypes.ADMIN_OPETATION_SUCCESS })
      setUsers(res.data)
      setLoading(false)
    } else {
      message.error({
        content: res.data.errorMessage,
        style: {
          marginTop: '20vh',
        },
      })
    }
  })
}

/**
 * Redux Action Creator
 * @param {*} userId string
 * @param {*} setUser function
 * @param {*} setProductId function
 * @param {*} setImage function
 * @param {*} setLoading Boolean
 * @param {*} message AntD message component
 * @returns void
 */
export const getUserByIdAction =
  (userId, setUser, setProductId, setImage, setLoading, message) => async dispatch => {
    dispatch({ type: ActionTypes.ADMIN_OPETATION_START })

    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/users/get/${userId}`)
      .then(res => {
        if (res.status === 200) {
          dispatch({ type: ActionTypes.ADMIN_OPETATION_SUCCESS })
          setUser(res.data)
          setProductId(res.data._id)
          setImage(res.data?.userPicture)
          setLoading(false)
        } else {
          message.error({
            content: res.data.errorMessage,
            style: {
              marginTop: '20vh',
            },
          })
        }
      })
  }

/**
 * Redux Action Creator
 * @param {*} userId string
 * @param {*} logedInuser function
 * @param {*} setSuccess function
 * @param {*} setLoading Boolean
 * @param {*} message AntD message component
 * @returns void
 */
export const deleteUserByIdAction =
  (userId, logedInuser, setSuccess, setLoading, message) => async dispatch => {
    dispatch({ type: ActionTypes.ADMIN_OPETATION_START })

    await axios
      .delete(`${process.env.REACT_APP_BASE_URL}/api/users/delete/${userId}`, {
        headers: {
          authorization: 'Bearer ' + logedInuser.token,
        },
      })
      .then(res => {
        setLoading(false)
        if (res.status === 200) {
          dispatch({ type: ActionTypes.ADMIN_OPETATION_SUCCESS })
          message.success({
            content: res.data.successMessage,
            style: {
              marginTop: '20vh',
            },
          })
          setSuccess(true)
        }
      })
  }

/**
 * Redux Action Creator
 * @param {*} productId string
 * @param {*} data Object
 * @param {*} logedInuser Object
 * @param {*} setLoading function
 * @param {*} message AntD message component
 * @returns void
 */
export const editUserInfoAction =
  (productId, data, logedInuser, setLoading, message) => async dispatch => {
    dispatch({ type: ActionTypes.ADMIN_OPETATION_START })

    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/users/edit/${productId}`, data, {
        headers: {
          authorization: 'Bearer ' + logedInuser.token,
        },
      })
      .then(res => {
        setLoading(false)
        if (res.status === 200) {
          dispatch({ type: ActionTypes.ADMIN_OPETATION_SUCCESS })
          message.success({
            content: res.data.successMessage,
            style: {
              marginTop: '20vh',
            },
          })
        } else if (res.status === 201) {
          message.error({
            content: res.data.errorMessage,
            style: {
              marginTop: '20vh',
            },
          })
        } else {
          message.error({
            content: res.data.errorMessage,
            style: {
              marginTop: '20vh',
            },
          })
        }
      })
  }

/**
 * Redux Action Creator
 * @param {*} user Object
 * @param {*} password string
 * @param {*} logedInuser Object
 * @param {*} setLoading function
 * @param {*} message AntD message component
 * @returns void
 */
export const changePasswardAction =
  (user, password, logedInuser, setLoading, message) => async dispatch => {
    dispatch({ type: ActionTypes.ADMIN_OPETATION_START })

    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/users/admin/change/password/${user._id}`,
        {
          newPassword: password.newPassword,
          confirmNewPassword: password.confirmNewPassword,
        },
        {
          headers: {
            authorization: 'Bearer ' + logedInuser.token,
          },
        },
      )
      .then(res => {
        if (res.status === 200) {
          dispatch({ type: ActionTypes.ADMIN_OPETATION_SUCCESS })
          setLoading(false)
          message.success({
            content: res.data.successMessage,
            style: {
              marginTop: '20vh',
            },
          })
        } else {
          message.error({
            content: res.data.errorMessage,
            style: {
              marginTop: '20vh',
            },
          })
        }
      })
  }
