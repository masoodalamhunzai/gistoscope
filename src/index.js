import * as React from 'react'

import {render} from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'

import App from './App'
import store from './store/store'

/**
 * Ant Design (UI Library) styles
 */
import 'antd/dist/antd.css'
/**
 * Main Style sheet
 */
import './index.css'

function RootComponent() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )
}

render(<RootComponent />, document.getElementById('app'))
