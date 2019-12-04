import React, { Component } from 'react';
import './ToDo.css';

class ToDo extends Component {
  constructor(props) {
      super(props);
      this.state = {
          completed: this.props.completed
      }
      this.completeTodo = this.completeTodo.bind(this);
  }
  completeTodo(event) {
      var apiKey = "3f306b-cc45ac-d2b797-86a41b-a9e055";

      var todoId = event.target.parentNode.id;
      var self= this;
      var data = {
          completed: true
      };
      var completeSendRequest = new XMLHttpRequest();

      completeSendRequest.onreadystatechange = function () {
          // Wait for readyState = 4 & 200 response
          if (this.readyState == 4 && this.status == 200) {
              // parse JSON response
              self.setState({
                  completed: true
              });

          } else if (this.readyState == 4) {
              console.log(this.responseText);
          }
      };

      completeSendRequest.open("PUT", "https://cse204.work/todos/" + todoId, true);
      completeSendRequest.setRequestHeader("Content-type", "application/json");
      completeSendRequest.setRequestHeader("x-api-key", apiKey);
      completeSendRequest.send(JSON.stringify(data));
  }
  //this has buttons for completeTodo and deleteTodo
  render() {
    var className = "todo";
  if (this.state.completed) {
    className = "todo completed";
  }
    return (
      <div id={this.props.id} className={className}>
       <button className="check" onClick={this.completeTodo}>Complete</button>
       <p>{this.props.text}</p>
       <button className="delete" onClick={this.props.deleteTodo}>Delete</button>
     </div>
    );
  }
}

export default ToDo;
