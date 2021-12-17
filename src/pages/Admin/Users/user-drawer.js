/**
 * User info drawer
 */
import * as React from 'react'
import { Drawer, Col, Row } from 'antd'

function UserDrawer({ onClose, visible, user }) {
  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label admin-drawer-title">{title}:</p>
      {content}
    </div>
  )

  return (
    <Drawer
      width={640}
      placement="right"
      closable={false}
      onClose={onClose}
      visible={visible}
    >
      <p className="site-description-item-profile-p admin-drawer-heading">User Profile</p>
      <Row>
        <Col span={12} className="text-center">
          <img width="200" src={user?.userPicture} alt={user?.firstName} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title="Full Name"
            content={
              <span>
                {user?.firstName} {user?.lastName}
              </span>
            }
          />
        </Col>
        <Col span={12}>
          <DescriptionItem title="E-mail" content={user?.email} />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Username" content={user?.username} />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Role" content={user?.role} />
        </Col>
      </Row>
    </Drawer>
  )
}

export default UserDrawer
