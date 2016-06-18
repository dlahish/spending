import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
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
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset>
          <label>Email:</label>
          <input {...email} />
          {email.touched && email.error && <div className="error">{email.error}</div>}
        </fieldset>
        <fieldset>
          <label>Password:</label>
          <input type="password" {...password} />
          {password.touched && password.error && <div className="error">{password.error}</div>}
        </fieldset>
        <fieldset>
          <label>Confirm Password:</label>
          <input type="password" {...passwordConfirm} />
          {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
        </fieldset>
        {this.renderError()}
        <button action="submit">Sign Up</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
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
