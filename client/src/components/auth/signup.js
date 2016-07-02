import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import * as Colors from 'material-ui/styles/colors';
import * as actions from '../../actions';

const styles = {
  paper : {
    margin: 50,
    textAlign: 'center',
    marginTop: 100,
    margin: 'auto',
    width: '40%',
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 25
  },

  label: {
    fontWeight: 'bold',
    fontSize: 30,
  }
};

class Signup extends Component {
  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
  }

  componentWillMount() {
    this.props.addRouteToStore('/signup');
  }

  renderError() {
    if (this.props.errorMessage) {
      return (
        <div className="error">
          <strong>Oops! </strong>{this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, fields: {email, password, passwordConfirm}} = this.props;

    return (
      <Paper style={styles.paper} zDephth={3} >
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <label style={styles.label}>Sign Up for Spending</label><br /><br />
          <div>
            <TextField hintText = 'Email:'
              name='Email'
              errorText = { this.props.errorMessage || email.touched && email.error }
              {...email}
            />
          </div><br />
          <div>
            <TextField hintText = 'Password:'
              name='Password'
              type="password"
              errorText = { password.touched && password.error }
              {...password}
            />
          </div><br />
          <div>
            <TextField hintText = 'Confirm Password:'
              name='Email'
              type="password"
              errorText = { passwordConfirm.touched && passwordConfirm.error }
              {...passwordConfirm}
            />
          </div><br />

          <RaisedButton
            primary={true}
            style={{ marginTop: 10 }}
            label="Sign Up"
            type="submit"
            //onTouchTap={ () => { this.handleSigninButton.bind(this) }}
          />

        </form>
      </Paper>

    );
  }
}

const validate = formProps => {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
      errors.email = 'Invalid email address'
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Password must match';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
}, mapStateToProps, actions)(Signup);
