import * as ActionTypes from '../actions/actionTypes'

const initialState = {
  loading: false,
  error: false,
  errorMessage: '',
  comments: [],
}

function commentReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.COMMENT_OPETATION_START:
      return {
        ...state,
        loading: true,
      }
    case ActionTypes.COMMENT_OPERATION_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload,
      }
    case ActionTypes.COMMENT_CREATED_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        comments: [...state.comments, ...action.payload],
      }
    default:
      return state
  }
}

export default commentReducer
