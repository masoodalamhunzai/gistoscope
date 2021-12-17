import React from 'react'
// import {Link} from 'react-router-dom'
import {MessageOutlined} from '@ant-design/icons'

const Coments = props => {
  return (
    <>
      <span
        onClick={() => {
          props?.setSuccess(props?.child?.id)
          props?.setShow(!props?.show)
        }}
      >
        <MessageOutlined
          className="comment-icon"
          style={{
            marginTop: '-10px',
            verticalAlign: 'middle',
          }}
        />
        Comments
        {props?.child?.comments && <span>({props?.child?.comments.length})</span>}
      </span>
    </>
  )
}

export default Coments
