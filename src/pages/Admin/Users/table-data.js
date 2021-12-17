/**
 * List of Available Users in Table Format
 */
import * as React from 'react'
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'

function TableData({
  user,
  index,
  getUserById,
  showDrawer,
  showEditDrawer,
  setSuccess,
  deleteHandler,
}) {
  return (
    <tr>
      <th className="pt-4" scope="row">
        {index + 1}
      </th>
      <td>
        <img width="60" height="64" src={user?.userPicture} alt={user?.firsName} />
      </td>
      <td className="pt-4">
        {user?.firstName} {user?.lastName}
      </td>
      <td className="pt-4">{user?.username}</td>
      <td className="pt-4">{user?.email}</td>
      <td className="pt-4">
        <span className="border p-2">{user?.role}</span>
      </td>
      <td className="pt-4">
        <a
          onClick={() => {
            getUserById(user?.id)
            showDrawer()
          }}
        >
          <EyeOutlined />
        </a>
        <a
          className="ml-3"
          onClick={() => {
            getUserById(user?.id)
            showEditDrawer()
            setSuccess(true)
          }}
        >
          <EditOutlined />
        </a>
        <a
          className="ml-3"
          onClick={() => {
            deleteHandler(user?.id)
            setSuccess(true)
          }}
        >
          <DeleteOutlined />
        </a>
      </td>
    </tr>
  )
}

export default TableData
