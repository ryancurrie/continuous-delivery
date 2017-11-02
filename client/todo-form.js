import React, { Component } from 'react'

export default class TodoForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: null
    }
  }

  render() {
    return (
      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field">
              <input type="text" id="enter-task" />
              <label htmlFor="enter-task">Enter a Task</label>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
