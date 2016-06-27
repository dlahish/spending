import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Signin from './auth/signin';
import { browserHistory } from 'react-router';

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
  },

  errormessgae: {
    color: red900,
    fontSize: '120%',
    fontWeight: 'bold'
  }
}

class Header extends Component {
  renderError() {
    if (this.props.errorMessage) {
      let text = 'Oops! ' + this.props.errorMessage;
      return (
        <ToolbarGroup style={{ marginRight: -350 }}>
          <ToolbarTitle style={ styles.errormessgae } text={text} />
        </ToolbarGroup>
      );
    }
  }

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
    return(
      <div>
        <Toolbar style={styles.toolbar}>
          <ToolbarTitle
            style={styles.toolbartitle}
            text="Spending"
            onTouchTap={this.handleTitleTouchTap}
          />
            {this.renderError()}
            {this.renderLinks()}
        </Toolbar>
      </div>
    );
  }
}

{/*<ul>
  {this.renderLinks()}
</ul>*/}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    errorMessage: state.auth.error
  };
}

export default connect(mapStateToProps)(Header);
