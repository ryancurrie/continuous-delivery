import React, { Component } from 'react'
import TodoForm from './todo-form'
import TodoList from './todo-list'
import axios from 'axios'

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

  async componentDidMount() {
    const res = await fetch('/api/todos')
    const todos = await res.json()
    this.setState({ todos: this.state.todos.concat(todos) })
  }

  async handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const res = await axios.post('/api/create', {
      task: formData.get('task'),
      dueDate: formData.get('dueDate')
    })
    const newTask = res.data

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
            <TodoForm handleSubmit={this.handleSubmit} />
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
