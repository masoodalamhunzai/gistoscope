import React, {useEffect, useState} from 'react'
// import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {DeleteOutlined, LoadingOutlined} from '@ant-design/icons'
import {Drawer, Col, Row, Spin, message, Form, Input, Button} from 'antd'

import TableData from './table-data'
import UserDrawer from './user-drawer'
import PasswordChangeModel from './password-change-model'
import UserTableHeader from './users-table-header'
import {CreateUsers} from '../../../Components/Admin/Users/CreateUsers'
import {Layout} from '../../../Components/Admin/Layout/Layout'
import {restoreUserAction} from '../../../store/actions/user-action'
import {
  changePasswardAction,
  deleteUserByIdAction,
  editUserInfoAction,
  getUserByIdAction,
  getUsersAction,
} from '../../../store/actions/admin-action'

import './styles.css'

export const Users = props => {
  const logedInuser = useSelector(state => state.user.user)
  const dispatch = useDispatch()

  const [users, setUsers] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [productId, setProductId] = useState('')
  const [loading, setLoading] = useState(true)
  const [visible, setVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [image, setImage] = useState('')
  const [file, setFile] = useState('')
  const [success, setSuccess] = useState(false)
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    phone: '',
    role: '',
    city: '',
    country: '',
    DOB: '',
  })

  const [password, setPassword] = useState({
    newPassword: '',
    confirmNewPassword: '',
  })

  const handleEditUserChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  const handlePasswordChange = e => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    })
  }

  const getUserById = async userId => {
    setLoading(true)
    dispatch(
      getUserByIdAction(userId, setUser, setProductId, setImage, setLoading, message),
    )
  }

  const deleteHandler = async userId => {
    setLoading(true)
    dispatch(deleteUserByIdAction(userId, logedInuser, setSuccess, setLoading, message))
  }

  useEffect(() => {
    dispatch(getUsersAction(setLoading, setUsers, message))
  }, [success])

  useEffect(() => {
    !logedInuser && props.history.push('/login')

    if (logedInuser?.verification === false) {
      props.history.push('/verify-email')
    }

    dispatch(restoreUserAction())
  }, [])

  const handleSubmit = async () => {
    setLoading(true)
    const data = new FormData()
    data.append('firstName', user.firstName)
    data.append('lastName', user.lastName)
    data.append('email', user.email)
    data.append('username', user.username)
    data.append('file', file)
    data.append('image', image)

    dispatch(editUserInfoAction(productId, data, logedInuser, setLoading, message))
  }

  const submitPasswordHandler = async e => {
    e.preventDefault()
    if (password.newPassword !== password.confirmNewPassword) {
      message.error("Password and Confirm password don't matched")
    } else {
      dispatch(changePasswardAction(user, password, logedInuser, setLoading, message))
    }
  }

  const antIcon = <LoadingOutlined className="admin-loader" spin />

  if (loading) return null

  return (
    <Layout sidebar>
      <div>
        <span className="float-right my-2">
          <CreateUsers />
        </span>
        <table className="table">
          <UserTableHeader />
          <tbody>
            {users.map((user, index) => (
              <TableData
                key={user._id}
                user={user}
                index={index}
                deleteHandler={deleteHandler}
                getUserById={getUserById}
                setSuccess={setSuccess}
                showDrawer={() => setVisible(true)}
                showEditDrawer={() => setEditVisible(true)}
              />
            ))}
          </tbody>
        </table>

        <UserDrawer onClose={() => setVisible(false)} user={user} visible={visible} />

        {loading ? (
          <div className="text-center fixed-top admin-spinner-wrapper">
            <Spin indicator={antIcon} />
          </div>
        ) : (
          <Drawer
            width={640}
            placement="right"
            closable={false}
            onClose={() => setEditVisible(false)}
            visible={editVisible}
          >
            <Form className="editUserForm">
              <Row>
                <Col span={24} className="admin-image-container">
                  {image && (
                    <React.Fragment>
                      <div>
                        <DeleteOutlined
                          onClick={() => setImage('')}
                          className="admin-delete-outline"
                        />
                      </div>
                      <img src={image} width="180" height="200" />
                    </React.Fragment>
                  )}
                  {!image && (
                    <div className="custom-file admin-image">
                      <input
                        type="file"
                        name="file"
                        required
                        multiple
                        onChange={e => setFile(e.target.files[0])}
                      />
                      <label className="custom-file-label" htmlFor="customFile"></label>
                    </div>
                  )}
                </Col>
                <Col span={12} className="admin-input-warpper">
                  <h6>First Name:</h6>
                  <Input
                    className="admin-input"
                    name="firstName"
                    onChange={handleEditUserChange}
                    value={user.firstName}
                  />
                </Col>
                <Col span={12} className="admin-input-warpper">
                  <h6>Last Name:</h6>
                  <Input
                    className="admin-input"
                    name="lastName"
                    onChange={handleEditUserChange}
                    value={user.lastName}
                  />
                </Col>
                <Col span={12} className="admin-input-warpper">
                  <h6>Email:</h6>
                  <Input
                    className="admin-input"
                    name="email"
                    onChange={handleEditUserChange}
                    value={user.email}
                  />
                </Col>
                <Col span={12} className="admin-input-warpper">
                  <h6>Role:</h6>
                  <Input
                    className="admin-input"
                    name="role"
                    onChange={handleEditUserChange}
                    value={user.role}
                  />
                </Col>
                <Col span={12} className="admin-input-warpper">
                  <h6>Username:</h6>
                  <Input
                    className="admin-input"
                    name="username"
                    onChange={handleEditUserChange}
                    value={user.username}
                  />
                </Col>
                <Col className="text-center admin-button-wrapper" span={24}>
                  <Button onClick={handleSubmit} type="primary">
                    Submit
                  </Button>
                  <div className="px-5 mt-4">
                    <span
                      onClick={() => setIsModalVisible(true)}
                      className="btn submit-btn bg-white border-secondary text-dark font-weight-bolder"
                    >
                      Change Passsword
                    </span>
                  </div>
                  <PasswordChangeModel
                    isModalVisible={isModalVisible}
                    handleCancel={() => setIsModalVisible(false)}
                    handlePasswordChange={handlePasswordChange}
                    submitPasswordHandler={submitPasswordHandler}
                  />
                </Col>
              </Row>
            </Form>
          </Drawer>
        )}
      </div>
    </Layout>
  )
}
