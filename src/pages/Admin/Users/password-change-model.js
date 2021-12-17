/**
 * Change User Password Model
 */
import * as React from 'react'
import {Input} from 'antd'
import Modal from 'antd/lib/modal/Modal'

function PasswordChangeModel({
  isModalVisible,
  handleCancel,
  submitPasswordHandler,
  handlePasswordChange,
}) {
  return (
    <Modal
      width={460}
      footer={false}
      title="Change Password"
      visible={isModalVisible}
      onCancel={handleCancel}
    >
      <div className="address edit-profile password-modal mx-4">
        <form onSubmit={submitPasswordHandler}>
          <div className="floating-label-group">
            <label className="floating-label">New Password*</label>
            <Input.Password
              onChange={handlePasswordChange}
              name="newPassword"
              className="form-control"
            />
          </div>
          <div className="floating-label-group mt-2">
            <label className="floating-label">Confirm New Password*</label>
            <Input.Password
              onChange={handlePasswordChange}
              name="confirmNewPassword"
              className="form-control"
              autocomplete="off"
              autofocus
              required
            />
          </div>
          <div className="mt-4 text-center">
            <button className="btn submit-btn btn-outline-dark w-50" type="submit">
              Change
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default PasswordChangeModel
