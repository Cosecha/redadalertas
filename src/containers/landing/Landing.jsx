import React, { Component } from 'react';
import { Link }             from 'react-router';

class Landing extends Component {
  render() {
    return (
      <div>
        <h1>Landing</h1>
        <ul>
          <li><Link to="/signup">Create account</Link></li>
          <li><Link to="/signup/verifier">Sign up to be a verifier</Link></li>
          <li><Link to="/dashboard">See list of raids</Link></li>
          <li><Link to="/report">Report a raid</Link></li>
        </ul>
      </div>
    );
  }
}

export default Landing;
