import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

export default class Header extends Component {
  renderLinks() {
    return [
      <li key="1">
        <Link to="/signin">Sign In</Link>
      </li>,
      <li key="2">
        <Link to="/signup">Sign Up</Link>
      </li>,
      <li key="3">
        <Link to="/securepage">Secure Page</Link>
      </li>,
      <li key="4">
        <Link to="/signout">Sign Out</Link>
      </li>
    ];
  }

  render() {
    return(
      <nav>
        <Link to="/">Spending</Link>
        <ul>
          {this.renderLinks()}
        </ul>
      </nav>
    );
  }
}
