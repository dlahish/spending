import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Signin from './auth/signin';
import { browserHistory } from 'react-router';
import * as actions from '../actions';

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { deepPurple300, grey50, red900 } from 'material-ui/styles/colors';

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
  }
}

class Header extends Component {

  renderLinks() {
    if (this.props.authenticated) {
      return (
        <ToolbarGroup>
          <FlatButton
            style={styles.flatbutton}
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
    //let brs = this.props.location.pathname;
    console.log('ownProps.id');
    console.log(this.props.stateData);
    console.log('currentLocation');
    console.log(this.props.id);
    console.log('this.props.stateData');
    console.log(this.props);
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
    stateData: location
  };
}

export default connect(mapStateToProps, actions)(Header);
