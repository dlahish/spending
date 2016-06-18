import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password });
  }

  renderError() {
    if (this.props.errorMessage) {
      return (
        <div>
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, fields: { email, password }} = this.props;

    return(
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset>
          <label>Email:</label>
          <input {...email} />
        </fieldset>
        <fieldset>
          <label>Password:</label>
          <input type="password" {...password} />
        </fieldset>
        {this.renderError()}
        <button action="submit">Sign In</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}
export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
}, mapStateToProps, actions)(Signin);
