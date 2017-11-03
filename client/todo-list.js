import React from 'react'

const renderTask = ({ id, task, dueDate }) => (
  <li className="collection-item" key={id}>
    {task} <span className="right">{dueDate}</span>
  </li>
)

export default function TodoList({ todos }) {
  return (
    <div className="card">
      <ul className="collection with-header">
        <li className="collection-header">
          Todos <span className="right">Due Date</span>
        </li>
        {todos.map(renderTask)}
      </ul>
    </div>
  )
}
