/**
 * Allows Only admin users to access the component
 */

import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Redirect, Route} from 'react-router-dom'
import {restoreUserAction} from '../../../store/actions/user-action'

const AdminRoute = ({component: Component, ...rest}) => {
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dispatch(restoreUserAction())

    setTimeout(() => {
      setLoading(false)
    }, 0)
  }, [])

  if (loading) return null

  return (
    <Route
      {...rest}
      render={props =>
        user && user.role === 1 ? <Component {...props} /> : <Redirect to="/null" />
      }
    />
  )
}

export default AdminRoute
