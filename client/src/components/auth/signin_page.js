import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { deepPurple300, grey50, red900 } from 'material-ui/styles/colors';
import { ToolbarTitle, ToolbarGroup } from 'material-ui/Toolbar';
import { Link, browserHistory } from 'react-router';

const styles = {
  toolbartitle: {
    cursor: 'pointer'
  },

  toolbar: {
    backgroundColor: deepPurple300
  },

  flatbutton: {
    marginRight: 0
  },

  textfield: {
    paddingTop: '1%',
    marginRight: 5,
    height: '70%',
    width: 200
  },

  label: {
    fontWeight: 'bold'
  }
}

// const validate = values => {
//   const errors = {};
//   if (!values.email) {
//       errors.email = 'Required'
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//       errors.email = 'Invalid email address'
//   }
//
// }

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password });
  }

  render() {
    const { handleSubmit, fields: { email, password }} = this.props;
    console.log('this.props.errorMessage');
    console.log(this.props.errorMessage);

    return(
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <label style={styles.label}>Log into Spending</label><br />
          <TextField
            {...email}
            autoComplete='on'
            floatingLabelText="Email:"
            floatingLabelStyle={{ color: 'black' }}
            errorText={this.props.errorMessage}
          />
          <TextField
            {...password}
            floatingLabelText="Password:"
            floatingLabelStyle={{ color: 'black' }}
            type="password"
          /><br /><br />
          <RaisedButton
            primary={true}
            style={styles.flatbutton}
            label="Sign In"
            type="submit"
            //onTouchTap={ () => { this.handleSigninButton.bind(this) }}
          />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  };
}
export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
}, mapStateToProps, actions)(Signin);