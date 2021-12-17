import thunk from 'redux-thunk'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'

import {
  adminReducer,
  commentReducer,
  postReducer,
  treeReducer,
  userReducer,
} from './reducer'

const rootReducer = combineReducers({
  post: postReducer,
  user: userReducer,
  comment: commentReducer,
  tree: treeReducer,
  admin: adminReducer,
})

/**
 * Central Store, manages state of entire Application
 */
export default createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
