import React, { Component } from 'react'
import TodoForm from './todo-form'
import TodoList from './todo-list'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      task: '',
      dueDate: '',
      todos: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const data = JSON.stringify({
      task: formData.get('task'),
      dueDate: formData.get('dueDate')
    })
    const res = await fetch('/api/create', {
      method: 'POST',
      headers: { 'content-type': 'application-json' },
      body: data
    })
    const newTask = await res.json()
    event.target.reset()
    this.setState({ todos: this.state.todos.concat(newTask) })
  }

  handleChange({ target }) {
    const name = target.name
    const value = target.value
    this.setState({ [name]: value })
  }

  render() {
    return (
      <div>
        <div className="row">
          <h1 className="center flow-text">Todo App</h1>
        </div>
        <div className="row">
          <div className="col s12 l6 offset-l3">
            <TodoForm
              handleSubmit={this.handleSubmit}
              handleChange={this.handlechange}
              name={this.state.name}
              dueDate={this.state.dueDate}
            />
          </div>
        </div>
        <div className="row">
          <div className="col s12 l6 offset-l3">
            <TodoList todos={this.state.todos} />
          </div>
        </div>
      </div>
    )
  }
}
