import React from "react";

class CountClass extends React.Component {
  constructor(props) {
    super(props);
    // Initializing state
    this.state = {
      count: 0,
      str: "Class based learning"
    };
    // Binding the handleClick method to the class instance
    this.handleClick = this.handleClick.bind(this);
  }

  // Method to handle click event
  handleClick() {
    // Incorrect way to update state
    // this.setState(this.state.count + 1);
    // Correct way to update state
    this.setState(() => ({ count: this.state.count + 2 }));
    this.setState(() => ({str : "learning based on class"}))
  }

  // Render method to display the component
  render() {
    return (
      <>
        <h1>{this.props.name}</h1>
        <p>{this.props.count}</p>
        <h2>{this.state.count}</h2>
        <button onClick={this.handleClick}>Click me as usual</button>
        <p>{this.state.str}</p>
      </>
    );
  }
}

export default CountClass;
