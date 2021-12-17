import axios from 'axios'
import * as ActionTypes from './actionTypes'
import moment from 'moment'

/**
 * Redux Action Creator
 * @param {*} userId string
 * @returns void
 */
export const getUsersAction = userId => async dispatch => {
  try {
    dispatch({ type: ActionTypes.USER_START })
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/users/get/${userId}`,
    )
    if (res.status === 200) {
      dispatch({ type: ActionTypes.USER_SUCCESS, payload: res.data })
    }
  } catch (error) {
    dispatch({ type: ActionTypes.USER_ERROR, error: error.data.errorMessage })
  }
}

/**
 * Redux Action Creator
 * @param {*} userId string
 * @returns void
 */
export const getFlatPostsAction = userId => async dispatch => {
  try {
    dispatch({ type: ActionTypes.POST_START })

    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/post/get/flat-posts/${userId}`,
    )
    if (res.status === 200) {
      dispatch({
        type: ActionTypes.USER_FLAT_POSTS_SUCCESS,
        payload: res.data,
      })
    }
  } catch (error) {
    dispatch({ type: ActionTypes.USER_ERROR, error: error.data.errorMessage })
  }
}

/**
 * Redux Action Creator
 * @param {*} id string
 * @param {*} isAuthenticated function
 * @param {*} commentValue function
 * @returns void
 */
export const handleComment = (id, isAuthenticated, commentValue) => async dispatch => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/posts/comments/main-post/create`,
      {
        postId: id,
        commentValue,
        timeOfSubmit: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
        userPicture: isAuthenticated()?.userPicture,
        username: isAuthenticated()?.username,
      },
      {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      },
    )
    if (res.status === 200) {
      dispatch({
        type: ActionTypes.USER_COMMENT,
      })
    }
  } catch (error) {
    dispatch({
      type: ActionTypes.USER_ERROR,
      error: 'You must be logged in to post a comment!',
    })
  }
}
