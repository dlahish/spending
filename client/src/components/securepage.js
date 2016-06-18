import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/user_actions';

class SecurePage extends Component {
  componentWillMount() {
    this.props.fetchMessage();
  }

  render() {
    return (
      <div>{this.props.message}</div>
    );
  }
}

function mapStateToProps(state) {
  return { message: state.user.message };
}

export default connect(mapStateToProps, actions)(SecurePage);
