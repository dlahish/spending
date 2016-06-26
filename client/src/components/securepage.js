import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class SecurePage extends Component {
  componentWillMount() {
    if (!this.props.userEmail) {
      this.props.getUserEmail();
    }
    this.props.fetchMessage();
    this.props.getUserData();
  }

  render() {
    console.log('THIS PROPS DATA FROM SECURE PAGE');
    console.log(this.props.data);
    // var ttt = this.props.data;
    // console.log('tttttt');
    // console.log(typeof ttt.amount);
    // var result = ttt.filter((obj) => {
    //   return obj.amount == 216;
    // });
    // console.log(result);
    // var xxx = [{a: 'aa'}, {b: 'bb'}, {c: 'cc'}];
    // var ppp = ttt.map((data1) => {
    //   console.log(data1.amount);
    // })

    return (
      <div>
        <div>{this.props.message}</div>
        <div>{this.props.email}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.user.message,
    email: state.auth.userEmail,
    data: state.user.data
  };
}

export default connect(mapStateToProps, actions)(SecurePage);
