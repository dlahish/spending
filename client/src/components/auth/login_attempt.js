import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
import * as actions from '../../actions';
import Paper from 'material-ui/Paper';
import * as Colors from 'material-ui/styles/colors';
import SigninPage from './signin_page';
import FlatButton from 'material-ui/FlatButton';

const style = {
  margin: 50,
  textAlign: 'center',
  marginTop: 100,
  margin: 'auto',
  width: '40%',
  backgroundColor: 'white',
  padding: 20,
  paddingTop: 25
};

class LoginAttempt extends Component {

  componentWillUnmount() {
    this.props.addRouteToStore('');
  }

  render() {
    return (
      <div>
        <div>
          <Paper style={style} zDephth={3} >
            <SigninPage />
            <FlatButton
              style={{ marginTop: 10 }}
              label="Sign Up for Spending"
              containerElement={<Link to="/signup"></Link>}
            />
          </Paper>
        </div>
        <div style={{ color: 'black', marginTop: 6 }}>

        </div>
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
