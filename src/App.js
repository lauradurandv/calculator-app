import React, { Component } from 'react';
import './App.css';
import Calculator from './components.js/calculator';

class App extends Component {
  render() {
    return (
      <div id="wrapper">
      <div className="App">
      <Calculator/>
      </div>
      </div>
    );
  }
}

export default App;

//////