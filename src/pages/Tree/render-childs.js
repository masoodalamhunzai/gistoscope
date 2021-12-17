/**
 * Nested Tree Childs
 */
import * as React from 'react'
import Children from './children'

const renderChild = (
  item,
  setSubjectId,
  showModal,
  subjectId,
  subjects,
  updateComponent,
  deleteHandler,
) =>
  item.map(items => (
   
    <Children
      setSubjectId={setSubjectId}
      key={items.id}
      childs={items}
      showModal={showModal}
      subjectId={subjectId}
      parentId={items.parentId}
      subjects={subjects}
      updateComponent={updateComponent}
      deleteHandler={deleteHandler}
      />
      
  ))

export default renderChild
