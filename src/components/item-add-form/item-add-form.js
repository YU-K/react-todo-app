import React from "react";

import "./item-add-form.css";

export default class ItemAddForm extends React.Component {
  state = {
    label: "",
  };

  onLabelChange = (e) => {
    e.preventDefault();
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onItemAdded(this.state.label);
    this.setState({
      label: "",
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className="item-add-form d-flex">
        <input
          type="text"
          value={this.state.label}
          placeholder="What needs to be done"
          className="form-control"
          onChange={this.onLabelChange}
        />
        <button className="btn btn-outline-secondary">Add Item</button>
      </form>
    );
  }
}
