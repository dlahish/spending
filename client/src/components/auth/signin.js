import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { deepPurple300, grey50, red900 } from 'material-ui/styles/colors';
import { ToolbarTitle } from 'material-ui/Toolbar';

const styles = {
  toolbartitle: {
    cursor: 'pointer'
  },

  toolbar: {
    backgroundColor: deepPurple300
  },

  flatbutton: {
    marginRight: -15
  },

  textfield: {
    marginRight: 5
  },

  errormessgae: {
    color: red900,
    marginTop: -90
  }
}

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password });
  }

  renderError() {
    if (this.props.errorMessage) {
      let text = 'Oops! ' + this.props.errorMessage;
      return (
        <ToolbarTitle style={ styles.errormessgae } text={text} />

      );
    }
  }

  render() {
    const { handleSubmit, fields: { email, password }} = this.props;

    return(
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        {this.renderError()}
        <TextField
          {...email}
          hintText="Email:"
          style={styles.textfield}
          autoComplete='on'
        />
        <TextField
          {...password}
          hintText="Password:"
          type="password"
        />
        <FlatButton
          style={styles.flatbutton}
          label="Sign In"
          type="submit"
        />
        <FlatButton
          style={styles.flatbutton}
          label="Sign Up"

        />
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
