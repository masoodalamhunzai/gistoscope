import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'

import AdminRoute from './Components/Admin/Admin-Routes/AdminRoute'
import {Navbar} from './Components/Navbar'
import {DC} from './pages/404/404'
import {Users} from './pages/Admin/Users/Users'
import {ConfirmEmail} from './pages/Authentication/Email-Verification/ConfirmEmail'
import {SendVerficationEmail} from './pages/Authentication/Email-Verification/SendVerficationEmail'
import {SendResetPasswordLink} from './pages/Authentication/Forgot-Password/SendResetPasswordLink'
import {UpdatePassword} from './pages/Authentication/Forgot-Password/UpdatePassword'
import {Login} from './pages/Authentication/Login/Login'
import {Signup} from './pages/Authentication/Signup/Signup'
import {Home} from './pages/Home/Home'
import {IndPost} from './pages/Post-Detail/IndPost'
import {PostsBySubjects} from './pages/Posts-By-Subjects/PostsBySubjects'
import {TreePage} from './pages/Tree/TreePage'
import {restoreUserAction} from './store/actions/user-action'
// import {UsersPage} from './pages/User-Page/UserPage'

function App(props) {
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()

  useEffect(() => {
    /**
     * get and save user into redux store from localstorage
     */
    dispatch(restoreUserAction())

    if (user && !user.verification) {
      props.history.push('/verify-email')
    }
  }, [props.history])

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/tree" component={TreePage} />
        <Route exact path="/post/:id" component={IndPost} />
        <Route exact path="/subject/:id" component={PostsBySubjects} />
        {/* <Route exact path="/dashboard/:id" component={UsersPage} /> */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/verify-email" component={SendVerficationEmail} />
        <Route exact path="/confirm-email/:token" component={ConfirmEmail} />
        <Route exact path="/reset-password" component={SendResetPasswordLink} />
        <Route exact path="/reset/:token" component={UpdatePassword} />
        <Route exact path="/signup" component={Signup} />
        <AdminRoute exact path="/admin/users" component={Users} />
        <Route component={DC} />
      </Switch>
    </div>
  )
}

export default withRouter(App)
