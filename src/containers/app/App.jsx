import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
