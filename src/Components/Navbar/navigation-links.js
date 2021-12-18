/**
 * Navbar Navigation Links
 */
import * as React from 'react'
import {Link} from 'react-router-dom'

function NavigationLinks({user}) {
  return (
    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
      <li>
        <Link className="navLINK" aria-current="page" to="/">
          Home
        </Link>
      </li>
      <li>
        <Link className="navLINK" aria-current="page" to="/tree">
          New post
        </Link>
      </li>
      <li>
        <Link className="" aria-current="page" to="/create-posts">
          View Node
        </Link>
      </li>
      <li>
        <Link className="" aria-current="page" to="/tree">
          Tree Page
        </Link>
      </li>
      {user && user.role === 1 && (
        <li>
          <Link className="" aria-current="page" to="/admin/users">
            Admin Panel
          </Link>
        </li>
      )}
    </ul>
  )
}

export default NavigationLinks
