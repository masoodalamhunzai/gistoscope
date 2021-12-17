import axios from 'axios'

import * as ActionTypes from './actionTypes'

/**
 * Redux Action Creator
 * @param {*} subjectId string
 * @param {*} setSubjectData function
 * @returns void
 */
export const getSubjectNameAction = (subjectId, setSubjectData) => async dispatch => {
  dispatch({ type: ActionTypes.TREE_OPETATION_START })
  await axios
    .get(`${process.env.REACT_APP_BASE_URL}/api/subject/get/edit/${subjectId}`)
    .then(res => {
      if (res.status === 200) {
        setSubjectData(res.data)
        dispatch({ type: ActionTypes.TREE_FETCH_SUBJECT_NAME_SUCCESS })
      }
    })
}

/**
 * Redux Action Creator
 * @param {*} data Object
 * @param {*} subjectId string
 * @param {*} message Antd message component
 * @param {*} refreshFunction function
 * @param {*} setIsModalVisible function
 * @returns void
 */

export const updateSubjectNameAction =
  (data, subjectId, message, refreshFunction, setIsModalVisible) => async dispatch => {
    dispatch({ type: ActionTypes.TREE_OPETATION_START })

    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/subject/update/${subjectId}`, data, {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({ type: ActionTypes.TREE_UPDATE_SUBJECT_NAME_SUCCESS })
          message.success({
            content: "subject updated successfuly",
            style: {
              marginTop: '20vh',
            },
          })
          refreshFunction(true)
          setIsModalVisible(false)
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
 * @param {*} subjectId string
 * @param {*} setParentId function
 * @returns void
 */
export const getParentIdAction = (subjectId, setParentId) => async dispatch => {
  dispatch({ type: ActionTypes.TREE_OPETATION_START })
  await axios
    .get(`${process.env.REACT_APP_BASE_URL}/api/subject/get/edit/${subjectId}`)
    .then(res => {
      if (res.status === 200) {
        res.data.parentId && setParentId(res.data.parentId._id)
      }
    })
}

/**
 * Redux Action Creator
 * @param {*} setComments function
 * @param {*} message AntD message component
 * @returns void
 */
export const getAllCommentByIDAction = (commentID, setComments) => async dispatch => {
  await axios.get(`${process.env.REACT_APP_BASE_URL}/api/posts/comments/getComments/${commentID}?skip=0&limit=1000`).then(res => {
    if (res.status === 200 || res.status === 304) {
      setComments(res?.data)
      dispatch({ type: ActionTypes.COMMENT_CREATED_SUCCESS, payload: res?.data?.comments })
    }
  })
}

/**
 * Redux Action Creator
 * @param {*} data Object
 * @param {*} subjectId string
 * @param {*} message Antd message component
 * @param {*} refreshFunction function
 * @param {*} setIsModalVisible function
 * @returns void
 */
export const moveSubjectUpAction =
  (data, subjectId, message, refreshFunction, setIsModalVisible) => async dispatch => {
    dispatch({ type: ActionTypes.TREE_OPETATION_START })

    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/subject/move/${subjectId}`, data, {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({ type: ActionTypes.TREE_SUBJECT_MOVE__SUCCESS })
          message.success({
            content: "subject move successfully",
            duration: 1,
            style: {
              marginTop: '20vh',
            },
          })
          refreshFunction(true)
          setIsModalVisible(false)
        } else {
          message.error({
            content: res.data.errorMessage,
            duration: 1,
            style: {
              marginTop: '20vh',
            },
          })
        }
      })
  }

/**
 * Redux Action Creator
 * @param {*} data Object
 * @param {*} message Antd message component
 * @param {*} setLoading function
 * @returns void
 */
export const createNewPostAction = (data, message, setLoading) => async dispatch => {
  dispatch({ type: ActionTypes.TREE_OPETATION_START })
  await axios
    .post(`${process.env.REACT_APP_BASE_URL}/api/post/create`, data, {
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
    .then(res => {
      if (res.status === 200) {
        dispatch({ type: ActionTypes.TREE_CREATE_NEW_POST_SUCCESS })
        setLoading(false)
        message.success({
          content: "Post has been Successfully created",
          style: {
            marginTop: '20vh',
          },
        })
      } else {
        message.success({
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
 * @param {*} setSubjects function
 * @param {*} message AntD message component
 * @returns void
 */
export const getAllSubjectsAction = (setSubjects, message) => async dispatch => {
  dispatch({ type: ActionTypes.TREE_OPETATION_START })

  await axios.get(`${process.env.REACT_APP_BASE_URL}/api/subject/get?skip=0&limit=100`).then(res => {
    // console.log(res.data, 'getAllSubjectsAction')
    if (res.status === 200 || res.status === 304) {
      setSubjects(res.data)
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
 * @param {*} data object
 * @param {*} setSuccess function
 * @param {*} setLoading function
 * @param {*} setSubjectId string
 * @param {*} setIsModalVisible function
 * @param {*} message AntD message component
 * @returns void
 */
export const createNewSubjectAction =
  (data, setSuccess, setLoading, setSubjectId, setIsModalVisible, message) =>
    async dispatch => {
      dispatch({ type: ActionTypes.TREE_OPETATION_START })

      axios
        .post(`${process.env.REACT_APP_BASE_URL}/api/subject/create`, data, {
          headers: {
            authorization: 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
          },
        })
        .then(res => {
          if (res.status === 200) {
            setSuccess(true)
            setLoading(false)
            setSubjectId(null)
            setIsModalVisible(false)
            setSuccess(false)
            message.success({
              content: "new subject successfully created",
              duration: 1,
              style: {
                marginTop: '10vh',
              },
            })
          } else {
            message.error({
              content: res.data.errorMessage,
              duration: 1,
              style: {
                marginTop: '10vh',
              },
            })
          }
        })
    }

/**
 * Redux Action Creator
 * @param {*} subjectId string
 * @param {*} setSuccess function
 * @param {*} message Antd message component
 * @returns void
 */
export const deleteSubjectAction = (subjectId, setSuccess, message) => async dispatch => {
  await axios
    .post(
      `${process.env.REACT_APP_BASE_URL}/api/subject/delete`,
      { subjectId },
      {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      },
    )
    .then(res => {
      if (res.status === 200) {
        setSuccess(true)
        message.success({
          content: "subject deleted successfuly",
          duration: 1,
          style: {
            marginTop: '10vh',
          },
        })
        setSuccess(false)
      } else {
        message.error({
          content: res.data.errorMessage,
          duration: 1,
          style: {
            marginTop: '10vh',
          },
        })
      }
    })
}
