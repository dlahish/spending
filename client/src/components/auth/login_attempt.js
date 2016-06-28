import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class LoginAttempt extends Component {
  nav() {
    console.log(this.props.location.pathname);
  }

  render() {
    return (
      <div>
        <h2>bad login attempt</h2>
        <button onClick={this.nav.bind(this)}>Click</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  };
}

export default withRouter(connect(mapStateToProps)(LoginAttempt));
