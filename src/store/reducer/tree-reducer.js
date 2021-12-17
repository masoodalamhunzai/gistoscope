import * as ActionTypes from '../actions/actionTypes'

const initialState = {
  loading: false,
  error: false,
  errorMessage: '',
  subjects: [],
}

function treeReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.TREE_OPETATION_START:
      return {
        ...state,
        loading: true,
      }
    case ActionTypes.TREE_OPERATION_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload,
      }
    default:
      return state
  }
}

export default treeReducer
