/**
 * Route Not Found Page
 */
import * as React from 'react'
import {Button, Result} from 'antd'

export const DC = props => {
  return (
    <div className="text-center">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button onClick={() => props.history.push('/')} type="primary">
            Back Home
          </Button>
        }
      />
    </div>
  )
}
