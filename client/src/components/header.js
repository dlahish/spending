import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Signin from './auth/signin';
import { browserHistory } from 'react-router';
import * as actions from '../actions';
import { withRouter } from 'react-router';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { deepPurple300, grey50, red900 } from 'material-ui/styles/colors';

const styles = {
  toolbartitle: {
    cursor: 'pointer'
  },

  toolbar: {
    backgroundColor: '#464646',
    color: 'white',
    // position: 'absolute',
    top: 0,
    // marginRight: '10px',
    position: 'fixed',
    width: '98.7%',
    zIndex: 1,
    top: 0
  },

  flatbutton: {
    marginRight: -15,
    color: 'white'
  },

  textfield: {
    marginRight: 5
  }
}

class Header extends Component {

  renderLinks() {
    if (this.props.route == '/signinattempt') { return; }
    if (this.props.authenticated) {
      return (
        <ToolbarGroup>
          <FlatButton
            style={styles.flatbutton}
            labelStyle={{color: 'white'}}
            label="Upload"
            linkButton={true}
            containerElement={<Link to="/upload"></Link>}
          />
          <FlatButton
            style={styles.flatbutton}
            labelStyle={{color: 'white'}}
            label="Dashboard"
            linkButton={true}
            containerElement={<Link to="/dashboard"></Link>}
          />
          <FlatButton
            style={styles.flatbutton}
            labelStyle={{color: 'white'}}
            label="Sign Out"
            linkButton={true}
            containerElement={<Link to="/signout"></Link>}
          />
        </ToolbarGroup>
      );
    }

    return (
      <ToolbarGroup>
        <Signin />
      </ToolbarGroup>
    );
  }

  handleTitleTouchTap() {
    browserHistory.push('/');
  }

  render() {
    return(
      <div>
        <Toolbar style={styles.toolbar}>
          <ToolbarTitle
            style={styles.toolbartitle}
            text="Spending"
            onTouchTap={this.handleTitleTouchTap}
          />
            {this.renderLinks()}
        </Toolbar>
      </div>
    );
  }
}

function mapStateToProps(state, location) {
  return {
    authenticated: state.auth.authenticated,
    errorMessage: state.auth.error,
    route: state.auth.currentRoute
  };
}

export default withRouter(connect(mapStateToProps, actions)(Header));
