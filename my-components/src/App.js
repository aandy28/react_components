import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to my components</h2>
        </div>
        <p className="App-intro">
          This is a place where I will be storing all of my reusable components made using react.
        </p>
      </div>
    );
  }
}

export default App;
