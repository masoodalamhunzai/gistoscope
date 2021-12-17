import * as ActionTypes from '../actions/actionTypes'

const initialState = {
  loading: false,
  filteringPosts: [],
  subjects: [],
  error: '',
  commentToggle: false,
}

export default function PostReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.POST_START:
      return {
        ...state,
        loading: true,
      }
    case ActionTypes.POST_SUCCESS:
      return {...state, filteringPosts: action.payload, error: ''}
    case ActionTypes.POST_SUBJECT_SUCCESS:
      return {...state, subjects: action.payload, error: ''}
    case ActionTypes.POST_COMMENT_SUBMIT:
      return {...state, commentToggle: !state.commentToggle, error: ''}
    case ActionTypes.POST_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case ActionTypes.POST_EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case ActionTypes.POST_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case ActionTypes.CREATE_MAIN_POST_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    default:
      return {
        ...state,
      }
  }
}
