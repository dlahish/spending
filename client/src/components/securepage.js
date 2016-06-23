import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/user_actions';

class SecurePage extends Component {
  componentWillMount() {
    this.props.fetchMessage();
  }

  render() {
    return (
      <div>
        <div>{this.props.message}</div>
        <div>{this.props.email}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { message: state.user.message, email: state.auth.userEmail };
}

export default connect(mapStateToProps, actions)(SecurePage);
