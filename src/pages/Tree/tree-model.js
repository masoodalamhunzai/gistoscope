/**
 * Tree Page create a new subject model
 */
import * as React from 'react'
import Modal from 'antd/lib/modal/Modal'

function TreeModel({isModalVisible, handleCancel, submitHandler, handleSubjectChange}) {
  return (
    <Modal
      footer={false}
      title="Create a New Subject"
      visible={isModalVisible}
      onCancel={handleCancel}
    >
      <form onSubmit={submitHandler} className="text-center create-posts">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            placeholder="Enter Subject Name"
            onChange={handleSubjectChange}
          />
        </div>
        <div className="tree-page-model-button">
          <button type="submit" size="large" className="btn btn-outline-dark w-25">
            Submit
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default TreeModel
