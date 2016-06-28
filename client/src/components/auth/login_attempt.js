import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../../actions';
import Paper from 'material-ui/Paper';
import * as Colors from 'material-ui/styles/colors';

const style = {
  height: 100,
  width: 500,
  margin: 20,
  textAlign: 'center',
  marginTop: 100,
  margin: 'auto',
  width: '50%',
  backgroundColor: 'white',
  paddingTop: 8
};

class LoginAttempt extends Component {

  componentWillUnmount() {
    this.props.addRouteToStore('');
  }

  render() {
    return (
      <Paper style={style} zDephth={3} >
        <p>Login into Spending</p>
      </Paper>
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
