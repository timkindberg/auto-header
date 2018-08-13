import React from "react";
import ReactDOM from "react-dom";
import AutoHeader from "./AutoHeader";

import "./styles.css";

class RandomMount extends React.Component {
  state = { show: false };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ show: true });
    }, Math.random() * 5000);
  }

  render() {
    if (this.state.show) {
      return this.props.children;
    }

    return null;
  }
}

function App() {
  return (
    <div className="App">
      <RandomMount>
        <AutoHeader>A</AutoHeader>
      </RandomMount>
      <RandomMount>
        <AutoHeader>B</AutoHeader>
      </RandomMount>
      <RandomMount>
        <AutoHeader>C</AutoHeader>
      </RandomMount>
      <RandomMount>
        <AutoHeader>D</AutoHeader>
      </RandomMount>
      <RandomMount>
        <AutoHeader>E</AutoHeader>
      </RandomMount>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
