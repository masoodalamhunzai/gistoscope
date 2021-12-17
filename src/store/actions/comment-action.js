import axios from 'axios'

import * as ActionTypes from './actionTypes'

/**
 *  Redux Action - create New comment
 * @param {*} data {postId: string,responseTo: string, commentValue: string, timeOfSubmit: string, userPicture: string, username: string,}
 * @param {*} refreshFunction props.refreshFunction
 * @param {*} setOpenReply function
 * @param {*} setCommentValue function
 * @param {*} openReply Boolean
 * @param {*} user Object
 * @returns void
 */
export const createNewCommentAction =
  (data, refreshFunction, setOpenReply, setCommentValue, openReply, user) =>
    async dispatch => {
      dispatch({ type: ActionTypes.COMMENT_OPETATION_START })

      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/api/posts/comments/main-post/create`,
          data,
          {
            headers: {
              authorization: 'Bearer ' + user.token,
            },
          },
        )
        .then(res => {
          if (res.status === 200) {
            dispatch({ type: ActionTypes.COMMENT_CREATED_SUCCESS, payload: res.data })
            refreshFunction(res.data)
            setOpenReply(!openReply)
            setCommentValue('')
          }
        })
        .catch(err => {
          dispatch({ type: err.message })
        })
    }

/**
 *  Redux Action - create New Individual comment
 * @param {*} data {postId: string,responseTo: string, commentValue: string, timeOfSubmit: string, userPicture: string, username: string,}
 * @param {*} refreshFunction props.refreshFunction
 * @param {*} setOpenReply function
 * @param {*} setCommentValue function
 * @param {*} openReply Boolean
 * @param {*} user Object
 * @returns void
 */
export const createNewIndividualCommentAction =
  (data, refreshFunction, setOpenReply, setCommentValue, openReply, user) =>
    async dispatch => {
      dispatch({ type: ActionTypes.COMMENT_OPETATION_START })

      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/api/posts/comments/individual/create`,
          data,
          {
            headers: {
              authorization: 'Bearer ' + user.token,
            },
          },
        )
        .then(res => {
          if (res.status === 200) {
            refreshFunction(res.data)
            setOpenReply(!openReply)
            setCommentValue('')
          }
        })
        .catch(err => {
          dispatch({ type: err.message })
        })
    }

/**
 * Redux Action Creator
 * @param {*} data Object
 * @param {*} refreshFunction function
 * @param {*} user Object
 * @returns void
 */
export const deleteCommentAction = (data, refreshFunction, user) => async dispatch => {
  dispatch({ type: ActionTypes.COMMENT_OPETATION_START })
  await axios
    .post(
      `${process.env.REACT_APP_BASE_URL}/api/posts/comments/main-post/comments/delete`,
      data,
      {
        headers: {
          authorization: 'Bearer ' + user.token,
        },
      },
    )
    .then(res => {
      if (res.status === 200) {
        refreshFunction(res.data)
      }
    })
}
