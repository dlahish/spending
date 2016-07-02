import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class SecurePage extends Component {
  componentWillMount() {
    if (!this.props.userEmail) {
      this.props.getUserEmail();
    }
    this.props.fetchMessage();
    // this.props.getUserData();
    this.props.getTotal();
  }

  render() {
    return (
      <div>
        <div>
          <h3>Your email address:</h3>
          <p> {this.props.email}</p>
        </div>
        <div>{this.props.totalIncome}</div>
        <div>{this.props.totalExpense}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.user.message,
    email: state.auth.userEmail,
    data: state.user.data,
    totalIncome: state.user.totalIncome,
    totalExpense: state.user.totalExpense
  };
}

export default connect(mapStateToProps, actions)(SecurePage);
