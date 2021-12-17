/**
 * Individual Node of the Tree
 */
import * as React from 'react'
import { TreeNode } from 'rc-tree-select'

function TreeNodeComponent({ subject }) {
  return (
    <TreeNode key={subject.id} value={subject.id} title={subject.name}>
      {subject.children.map(subSubj => {
        return (
          <TreeNode key={subSubj.id} value={subSubj.id} title={subSubj.name}>
            {subSubj.children.map(child => {
              return <TreeNode key={child.id} value={child.id} title={child.name} />
            })}
          </TreeNode>
        )
      })}
    </TreeNode>
  )
}

export default TreeNodeComponent
