import React from 'react'

const Reply = props => {
  return (
    <div className="ml-4 px-2 pbs-reply-container">
      <p>
        Replies
        {props?.nuOfChildReply && <span>({props?.nuOfChildReply?.length})</span>}
      </p>
    </div>
  )
}

export default Reply
