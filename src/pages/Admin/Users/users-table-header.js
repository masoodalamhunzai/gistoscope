/**
 * Users table Header
 */
import * as React from 'react'

function UserTableHeader() {
  return (
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Picture</th>
        <th scope="col">Full Name</th>
        <th scope="col">Username</th>
        <th scope="col">E-mail</th>
        <th scope="col">Role</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
  )
}

export default UserTableHeader
