import * as ActionTypes from '../actions/actionTypes'

const initialState = {
  loading: false,
  error: false,
  errorMessage: '',
}

function adminReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ADMIN_OPETATION_START:
      return {
        ...state,
        loading: true,
      }
    case ActionTypes.ADMIN_OPERATION_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload,
      }
    case ActionTypes.ADMIN_OPETATION_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
      }
    default:
      return state
  }
}

export default adminReducer
