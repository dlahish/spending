import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Home extends Component {

  componentWillMount() {
    if (!this.props.userEmail) {
      this.props.getUserEmail();
    }
    this.props.wafApi();  
  }

  render() {
    return (
      <p>Hello Home</p>
    );
  }
};

export default connect(null, actions)(Home);
