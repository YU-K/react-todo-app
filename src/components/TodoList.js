import { getByLabelText } from "@testing-library/dom";
import React from "react";

import TodoListItem from "./TodoListItem";

const TodoList = ({ todos }) => {
  const elements = todos.map((todo) => {
    const { id, ...rest } = todo;
    return (
      <li key={id}>
        <TodoListItem {...rest} />;
      </li>
    );
  });
  return <ul>{elements}</ul>;
};

export default TodoList;
