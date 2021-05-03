import React from "react";

import "./search-panel.css";

export default class SearchPanel extends React.Component {
  state = {
    term: "",
  };

  onChange = (e) => {
    const { searchTodo } = this.props;
    const term = e.target.value;
    this.setState({ term });
    searchTodo(term);
  };

  render() {
    return (
      <input
        type="text"
        className="form-control search-input"
        placeholder="search"
        value={this.state.term}
        onChange={this.onChange}
      />
    );
  }
}
