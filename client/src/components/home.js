import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Home extends Component {

  componentWillMount() {
    if (!this.props.userEmail) {
      this.props.getUserEmail();
    }
  }

  render() {
    return (
      <p style={{paddingTop: '200px'}}>Hello Home</p>
    );
  }
};

export default connect(null, actions)(Home);
