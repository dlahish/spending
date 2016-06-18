import React, { Component } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return (
      <div>
        <h2>You are now logged out.</h2>
        <h2>Thank you for using Spending!</h2>
      </div>
    );
  }
}

export default connect(null, actions)(Signout);
