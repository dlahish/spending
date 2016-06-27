import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { deepPurple300, grey50 } from 'material-ui/styles/colors';

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
    console.log('renderLinks');
    if (this.props.authenticated) {
      return [
        <li key="4">
          <Link to="/signout">Sign Out</Link>
        </li>,
        <li key="3">
          <Link to="/securepage">Secure Page</Link>
        </li>,
        <li key="5">
          <Link to="/upload">Upload File</Link>
        </li>
      ];
    }

    return [
      <li key="1">
        <Link to="/signin">Sign In</Link>
      </li>,
      <li key="2">
        <Link to="/signup">Sign Up</Link>
      </li>,
    ];
  }

  handleTouchTap() {
    console.log('hondleTouchTap');
  }

  render() {
    return(
      <div>
        <Toolbar style={styles.toolbar}>
          <ToolbarTitle style={styles.toolbartitle} text="Spending" />
          <ToolbarGroup>
            <TextField
              hintText="Email:"
              style={styles.textfield}
            />
            <TextField
              hintText="Password:"
            />
            <FlatButton style={styles.flatbutton} label="Sign In" />
            <FlatButton style={styles.flatbutton} label="Sign Up" />
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
}

{/*<ul>
  {this.renderLinks()}
</ul>*/}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);
