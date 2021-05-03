import React from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form";

import "./app.css";

export default class App extends React.Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem("Drink Coffee"),
      this.createTodoItem("Make Awesome App"),
      this.createTodoItem("Have a lunch"),
    ],
    term: "",
  };

  searchTodo = (term) => {
    this.setState({ term });
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++,
    };
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    const newArray = [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
    return newArray;
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return {
        todoData: newArray,
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];

      return {
        todoData: newArr,
      };
    });
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "important"),
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "done"),
      };
    });
  };

  render() {
    const { todoData, term } = this.state;

    const search = (items, term) => {
      if (term === "") {
        return items;
      }
      return items.filter((item) => {
        return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
      });
    };

    const visibleTodos = search(todoData, term);

    const doneCount = todoData.filter((todo) => todo.done === true).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel mb-3 d-flex">
          <SearchPanel searchTodo={this.searchTodo} />
          <ItemStatusFilter />
        </div>
        <TodoList
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
          todos={visibleTodos}
          onDeleted={this.deleteItem}
          search={this.state.search}
        />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
}
