import React, { Component } from 'react';
import './App.css';
import ToDo from './ToDo.js';
import NewToDo from './NewToDo.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            input: ''
        }
        //from slides
        this.addTodo = this.addTodo.bind(this);
        this.onChange = this.onChange.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.sortTodo = this.sortTodo.bind(this);
    }
    // var apiKey = "3f306b-cc45ac-d2b797-86a41b-a9e055";

    addTodo(event) {
      var self = this;
      var apiKey = "3f306b-cc45ac-d2b797-86a41b-a9e055";

      event.preventDefault();
      var data = {
        text: this.state.input
      }
      var loadTodos = new XMLHttpRequest();

      loadTodos.onreadystatechange = function () {
        // Wait for readyState = 4 & 200 response
        if (this.readyState == 4 && this.status == 200) {
            // parse JSON response
            self.setState({
                todos: [...self.state.todos, JSON.parse(this.responseText)]
            });
        } else if (this.readyState == 4) {
            console.log(this.responseText);
        }
      };
      loadTodos.open("POST", "https://cse204.work/todos", true);
      loadTodos.setRequestHeader("Content-type", "application/json");
      loadTodos.setRequestHeader("x-api-key", apiKey);
      loadTodos.send(JSON.stringify(data));

        this.setState({
            input: ''
        });
    }

    onChange(event) {
        this.setState({
            input: event.target.value
        });
    }
    deleteTodo(event) {
      var self = this;
      var apiKey = "3f306b-cc45ac-d2b797-86a41b-a9e055";
      var todoId = event.target.parentNode.id;
      var deleteRequest = new XMLHttpRequest();
      deleteRequest.onreadystatechange = function () {
          // Wait for readyState = 4 & 200 response
          if (this.readyState == 4 && this.status == 200) {
              // parse JSON response
              const remainingTodos = self.state.todos.filter((todo) => {
                  if (todoId !== todo.id) {
                      return todo;
                      //console.log(todos);
                  }
              });
              self.setState({
                  todos: remainingTodos
              });
          }
          else if (this.readyState == 4) {
              console.log(this.responseText);
              //console.log(todos);
          }
      };

      deleteRequest.open("DELETE", "https://cse204.work/todos/" + todoId, true);
      deleteRequest.setRequestHeader("Content-type", "application/json");
      deleteRequest.setRequestHeader("x-api-key", apiKey);
      deleteRequest.send();

    }
    //sorting todos alphabetically
    sortTodo(event) {
      var todos = this.state.todos;
      //talked to TA about this function
      todos.sort(function (x, y) {
        return x.text.localeCompare(y.text);
        console.log(x.localeCompare(y));
      })
      this.setState({todos: todos});
      //console.log(todos);
    }

    render() {
        return (<
            section id = "todos" >
            <NewToDo addTodo = {this.addTodo}
            onChange = {this.onChange}
            updateTodo = {this.updateTodo}
            input = {this.state.input}/>
            <button onClick = {this.sortTodo} id="submit"> Sort A-Z </button>
            <br></br>
            <br></br>

            {this.state.todos.map((todo) =>
                    <ToDo key = {todo.id}
                    id = {
                      todo.id

                    }
                    text = {
                        todo.text
                    }
                    completed = {
                        todo.completed
                    }

                    deleteTodo = {
                        this.deleteTodo
                    }
                    />
                )
            } <
            /section>
        );
    }

    componentDidMount() {
        var self = this;
        var apiKey = "3f306b-cc45ac-d2b797-86a41b-a9e055";

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var todos = JSON.parse(xhttp.responseText);
                self.setState({todos: todos});
                console.log(todos);
            }
        };

        xhttp.open("GET", "https://cse204.work/todos", true);
        xhttp.setRequestHeader("x-api-key", apiKey);
        xhttp.send();
        //console.log(todos);
    }
}

export default App;
