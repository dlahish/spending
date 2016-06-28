import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
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
    marginRight: 5
  }
}

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password });
  }

  render() {
    const { handleSubmit, fields: { email, password }} = this.props;

    return(
      <ToolbarGroup>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
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
            onTouchTap={ () => { this.handleSigninButton.bind(this) }}
          />
          <FlatButton
            style={styles.flatbutton}
            label="Sign Up"
            onTouchTap={ () => { browserHistory.push('/signup'); }}
            //containerElement={<Link to="/signup"></Link>}
          />
        </form>
      </ToolbarGroup>
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
