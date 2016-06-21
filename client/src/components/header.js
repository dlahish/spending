import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
  renderLinks() {
    console.log('renderLinks');
    if (this.props.authenticated) {
      return [
        <li key="4">
          <Link to="/signout">Sign Out</Link>
        </li>,
        <li key="3">
          <Link to="/securepage">Secure Page</Link>
        </li>,
        <li key="5">
          <Link to="/upload">Upload File</Link>
        </li>
      ];
    }

    return [
      <li key="1">
        <Link to="/signin">Sign In</Link>
      </li>,
      <li key="2">
        <Link to="/signup">Sign Up</Link>
      </li>,
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

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);
