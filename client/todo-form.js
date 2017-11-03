import React, { Component } from 'react'

export default class TodoForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      task: '',
      dueDate: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const data = {
      task: formData.get('task'),
      dueDate: formData.get('dueDate')
    }
    fetch('/api/create', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    event.target.reset()
  }

  handleChange({ target }) {
    const name = target.name
    const value = target.value
    this.setState({ [name]: value })
  }

  render() {
    return (
      <div className="row">
        <div className="col s12 l6 offset-l3">
          <div className="card">
            <div className="card-content">
              <span className="card-title center">Todo App</span>
              <form onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="input-field">
                    <input
                      type="text"
                      id="enter-task"
                      name="task"
                      value={this.state.task}
                      onChange={this.handleChange}
                    />
                    <label htmlFor="enter-task">Enter a Task</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field">
                    <input
                      type="date"
                      id="enter-date"
                      name="dueDate"
                      value={this.state.dueDate}
                      onChange={this.handleChange}
                    />
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
        </div>
      </div>
    )
  }
}
