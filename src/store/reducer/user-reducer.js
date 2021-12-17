import * as ActionTypes from '../actions/actionTypes'

const initialState = {
  loading: false,
  error: false,
  errorMessage: '',
  user: null,
}

function userReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.USER_OPETATION_START:
      return {
        ...state,
        loading: true,
      }
    case ActionTypes.USER_LOGOUT:
      return {
        ...state,
        user: null,
      }
    case ActionTypes.USER_OPERATION_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload,
      }
    case ActionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        user: action.payload,
      }
    case ActionTypes.USER_SIGNUP_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        user: null,
      }
    case ActionTypes.USER_RESTORE_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: false,
      }
    case ActionTypes.USER_SEND_FORGET_PASSWORD_DETAILS:
      return {
        ...state,
        loading: false,
        error: false,
      }
    default:
      return state
  }
}

export default userReducer
