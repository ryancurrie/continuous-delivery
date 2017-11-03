import React from 'react'

export default function TodoForm({ handleSubmit }) {
  return (
    <div className="card">
      <div className="card-content">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="input-field">
              <input type="text" id="enter-task" name="task" />
              <label htmlFor="enter-task">Enter a Task</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field">
              <input type="date" id="enter-date" name="dueDate" />
            </div>
          </div>
          <div className="row center">
            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="action"
            >
              Add Todo
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
