import React from 'react'
import { LeftSquareFilled, RightSquareFilled } from '@ant-design/icons'

const Edit = props => {
  return (
    <div
      className="ml-4 pt-2"
      style={{
        height: '28px',
        border: '0.5px solid rgba(0, 0, 0, 0.6)',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p>
        <LeftSquareFilled
          onClick={() =>
            props?.editsIndex + 1 === 0 && props.setEditsIndex(props?.editsIndex - 1)
          }
          style={{
            color: 'rgba(0, 119, 182, 1)',
            fontSize: '28px',
            borderRadius: '41px',
          }}
        />
        <span
          className="mr-2 ml-2 mt-2"
          style={{
            fontSize: '11px',
            fontWeight: '600',
          }}
        >
          {props?.editsIndex + 1}
        </span>
        <span
          className=""
          style={{
            fontSize: '14px',
            fontWeight: '600',
            paddingBottom: '-20px',
          }}
        >
          Edits
        </span>
        <span
          className="ml-2 mr-2"
          style={{
            fontSize: '11px',
            fontWeight: '600',
          }}
        >
          {props?.nuOfChildEdit?.length}
        </span>
        <RightSquareFilled
          onClick={() =>
            props?.editsIndex + 1 === props?.nuOfEdit?.length &&
            props?.setEditsIndex(props?.editsIndex + 1)
          }
          style={{
            color: 'rgba(0, 119, 182, 1)',
            fontSize: '28px',
            borderRadius: '41px',
          }}
        />
      </p>
    </div>
  )
}

export default Edit
