import axios from 'axios'
import * as ActionTypes from './actionTypes'
import moment from 'moment'

/**
 * Redux Action Creator
 * @returns void
 */
export const getPostsAction = () => async dispatch => {
  try {
    dispatch({type: ActionTypes.POST_START})
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/post/get?skip=0&limit=100`,
    )
    // console.log(res, 'getPostsAction')
    if (res.status === 200) {
      dispatch({
        type: ActionTypes.POST_SUCCESS,
        payload: res.data,
      })
    }
  } catch (error) {
    dispatch({type: ActionTypes.POST_ERROR, payload: error})
  }
}

/**
 * Redux Action Creator
 * @returns void
 */
export const getMainSubjectsAction = () => async dispatch => {
  try {
    dispatch({type: ActionTypes.POST_START})

    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/subject/get/flat-array?skip=0&limit=100`,
    )
    if (res.status === 200) {
      // console.log(res, 'flat-array')
      dispatch({type: ActionTypes.POST_SUBJECT_SUCCESS, payload: res.data})
    }
  } catch (error) {
    dispatch({type: ActionTypes.POST_ERROR, error: error?.data?.errorMessage})
  }
}

/**
 * Redux action creator
 * @param {*} id string
 * @param {*} isAuthenticated Object
 * @param {*} commentValue string
 * @returns void
 */
export const handleCommentSubmitAction =
  (id, isAuthenticated, commentValue) => async dispatch => {
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
          type: ActionTypes.POST_COMMENT_SUBMIT,
        })
      }
    } catch (error) {
      dispatch({
        type: ActionTypes.POST_ERROR,
        error: 'You must be logged in to post a comment!',
      })
    }
  }

/**
 * Redux Action Creator
 * @param {*} postId string
 * @param {*} setPostData function
 * @param {*} setDescription function
 * @param {*} message string
 * @returns void
 */
export const editPostAction =
  (postId, setPostData, setDescription, message) => async dispatch => {
    dispatch({type: ActionTypes.POST_START})

    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/post/get/post/${postId}`)
      .then(res => {
        if (res.status === 200) {
          dispatch({type: ActionTypes.POST_EDIT_SUCCESS})
          setPostData(res.data)
          setDescription(res.data.description)
        } else {
          message.error({
            content: 'No Post Found',
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
 * @param {*} message AntD message component
 * @param {*} refreshFunction function
 * @param {*} setIsModalVisible function
 * @param {*} onModelOpen function
 * @returns void
 */
export const createNewPostAction =
  (data, message, refreshFunction, setIsModalVisible, onModelOpen) => async dispatch => {
    dispatch({type: ActionTypes.POST_START})

    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/post/edits/create`, data, {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({type: ActionTypes.POST_CREATE_SUCCESS})
          message.success({
            content: 'Updated post successfully',
            style: {
              marginTop: '20vh',
            },
          })
          refreshFunction(true)
          setIsModalVisible(false)
          onModelOpen(false)
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
 * @param {*} message Antd message component
 * @returns void
 */
export const getMainSubjects = (setSubjects, message) => async dispatch => {
  dispatch({type: ActionTypes.POST_START})

  await axios
    .get(`${process.env.REACT_APP_BASE_URL}/api/subject/get?skip=0&limit=100`)
    .then(res => {
      if (res.status === 200) {
        dispatch({type: ActionTypes.POST_END})
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
 * @param {*} postId string
 * @param {*} setPostData function
 * @param {*} setDescription function
 * @param {*} message Antd message component
 * @returns void
 */
export const getPostByIdAction =
  (postId, setPostData, setDescription, message) => async dispatch => {
    dispatch({type: ActionTypes.POST_START})

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/post/get/post/${postId}`)
      .then(res => {
        if (res.status === 200) {
          dispatch({type: ActionTypes.POST_END})
          setPostData(res.data)
          setDescription(res.data.description)
        } else {
          message.error({
            content: 'No Post Found',
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
 * @param {*} setLoading function
 * @param {*} message Antd message component
 * @returns void
 */
export const createEditPostAction = (data, setLoading, message) => async dispatch => {
  dispatch({type: ActionTypes.POST_START})

  axios
    .post(`${process.env.REACT_APP_BASE_URL}/api/post/create`, data, {
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
    .then(res => {
      if (res.status === 200) {
        dispatch({type: ActionTypes.POST_CREATE_SUCCESS})
        setLoading(false)
        message.success({
          content: 'post has been created successfully',
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
 * @param {*} data Object
 * @param {*} message Antd message component
 * @param {*} refreshFunction function
 * @param {*} setIsModalVisible function
 * @param {*} onModelOpen function
 * @returns void
 */
export const replyToPostAction =
  (data, message, refreshFunction, setIsModalVisible, onModelOpen) => async dispatch => {
    dispatch({type: ActionTypes.POST_START})

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/post/replies/post`, data, {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({type: ActionTypes.POST_CREATE_SUCCESS})
          message.success({
            content: 'Post created successfully',
            style: {
              marginTop: '20vh',
            },
          })
          refreshFunction(true)
          setIsModalVisible(false)
          onModelOpen(false)
        } else {
          message.success({
            content: 'error occur',
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
 * @param {*} updateData Object
 * @param {*} setCommentValue function
 * @returns void
 */
export const createMainPostAction =
  (data, updateData, setCommentValue) => async dispatch => {
    dispatch({type: ActionTypes.POST_START})

    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/posts/comments/main-post/create`,
        data,
        {
          headers: {
            authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        },
      )
      .then(res => {
        if (res.status === 200) {
          dispatch({type: ActionTypes.CREATE_MAIN_POST_SUCCESS})
          updateData(res.data)
          setCommentValue('')
        }
      })
  }

/**
 * Redux Action Creator
 * @param {*} postId string
 * @param {*} setPost function
 * @param {*} setDescription function
 * @param {*} message Antd message component
 * @returns void
 */
export const getIndividualPostAction =
  (postId, setPost, setDescription, message) => async dispatch => {
    dispatch({type: ActionTypes.POST_START})

    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/post/get/post/${postId}`)
      .then(res => {
        if (res.status === 200) {
          setPost(res.data)
          setDescription(res.data.description)
        } else {
          message.error({
            content: 'No Post Found',
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
 * @param {*} getPost function
 * @param {*} setCommentValue function
 * @returns void
 */
export const submitCommentAction = (data, getPost, setCommentValue) => async dispatch => {
  // dispatch({ type: ActionTypes.COMMENT_CREATED_SUCCESS })
  await axios
    .post(`${process.env.REACT_APP_BASE_URL}/api/posts/comments/main-post/create`, data, {
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
    .then(res => {
      if (res.status === 200) {
        dispatch({
          type: ActionTypes.COMMENT_CREATED_SUCCESS,
          payload: [res?.data?.comment],
        })
        getPost()
        setCommentValue('')
      }
    })
}

/**
 * Redux Action Creator
 * @param {*} data Object
 * @param {*} refreshFunction function
 * @param {*} onModelOpen function
 * @param {*} setLoading function
 * @param {*} setIsModalVisible function
 * @param {*} message Antd message component
 * @returns void
 */
export const createANewPostVersion =
  (data, refreshFunction, onModelOpen, setLoading, setIsModalVisible, message) =>
  async dispatch => {
    dispatch({type: ActionTypes.POST_START})
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/post/versions/create`, data, {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then(res => {
        if (res.status === 200) {
          setLoading(false)
          message.success({
            content: 'Version created successfully',
            style: {
              marginTop: '20vh',
            },
          })
          refreshFunction(true)
          setIsModalVisible(false)
          onModelOpen(false)
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

export const getSubjectsByIdAction = (id, renderChild) => async dispatch => {
  axios
    .get(`${process.env.REACT_APP_BASE_URL}/api/subject/get/edit/by/${id}`)
    .then(async res => {
      if (res.status === 200) {
        res.data.parentId && res.data.parentId !== id && renderChild(res.data)
        const node = document.createElement('DIV')
        const textnode = document.createTextNode(res.data.name)
        node.appendChild(textnode)
        await document.getElementById('myList').appendChild(node)
      }
    })
}

export const getSubjectsAction = (subjectId, setSubjectData) => dispatch => {
  axios
    .get(`${process.env.REACT_APP_BASE_URL}/api/subject/get/edit/${subjectId}`)
    .then(res => {
      if (res.status === 200) {
        setSubjectData(res.data)
      }
    })
}

export const getFilteredPostsAction = (subjectId, setFilterPosts) => dispatch => {
  axios.get(`${process.env.REACT_APP_BASE_URL}/api/post/get`).then(res => {
    if (res.status === 200) {
      setFilterPosts(res.data.filter(post => post.postSubject === subjectId))
    }
  })
}
