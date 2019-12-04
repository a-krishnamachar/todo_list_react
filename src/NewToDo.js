import React, { Component } from 'react';
import './NewToDo.css';

class NewToDo extends Component {
  render() {
    return (
      <div>
        <h1>TO DO LIST</h1>
          <form id="new-entry" onSubmit={this.props.addTodo}>
              <input type="text" id="newText" placeholder="What task do you need to complete?" value={this.props.input}  onChange={this.props.onChange}/>
              <button type="submit" onSubmit={this.props.addTodo} id="submit">Add</button >
          </form>
      </div>
    );
  }
}

export default NewToDo;
