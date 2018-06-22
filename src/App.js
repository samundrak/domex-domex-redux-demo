import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Router, Doxpress } from './lib/index';

const router = new Router();
class App extends Component {
  constructor() {
    super();
    this.state = {
      currentTodo: '',
    };
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Simple TODO</h1>
        </header>
        <ul>
          {this.props.todo.map((item, index) => (
            <li key={item.id}>
              <input
                type="text"
                defaultValue={item.value}
                onChange={this.handleTodoItemUpdate(index)}
              />
              <button onClick={this.handleTodoItemDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Enter here "
          value={this.state.currentTodo}
          onChange={this.handleNewTodoChange}
        />
        <br />
        <button onClick={this.handleAddTodo}>Add Item</button>
      </div>
    );
  }
  handleTodoItemUpdate = index => {
    return event => {
      this.props.doxpress.resource.patch('/todo', {
        data: { value: event.target.value, index },
      });
    };
  };

  handleTodoItemDelete = index => {
    return () => {
      this.props.doxpress.resource.delete('/todo', {
        data: { index },
      });
    };
  };
  handleNewTodoChange = event => {
    this.setState({
      currentTodo: event.target.value,
    });
  };
  handleAddTodo = () => {
    this.props.doxpress.resource.post('/todo', {
      data: { item: { id: Date.now(), value: this.state.currentTodo } },
    });
    this.setState({
      currentTodo: '',
    });
  };
}
const mapStateToProps = state => ({
  todo: state.app.todo,
});
export default connect(mapStateToProps)(App);
