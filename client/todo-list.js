import React from 'react'

const renderTask = ({ id, task, dueDate }) => (
  <li key={id}>
    {task} <span className="right">{dueDate}</span>
  </li>
)

export default function TodoList({ todos }) {
  return (
    <div className="card">
      <ul className="collection">{todos.map(renderTask)}</ul>
    </div>
  )
}
