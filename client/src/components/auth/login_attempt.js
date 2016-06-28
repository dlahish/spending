import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../../actions';

class LoginAttempt extends Component {

  componentWillUnmount() {
    this.props.addRouteToStore('');
  }

  render() {
    return (
      <div>
        <h2>bad login attempt</h2>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    route: state.auth.currentRoute
  };
}

export default withRouter(connect(mapStateToProps, actions)(LoginAttempt));
