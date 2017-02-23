import React, { Component } from 'react';
import './App.css';
import Header from './Header';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
