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
import Popover from 'material-ui/Popover/Popover';
import {Menu, MenuItem} from 'material-ui/Menu';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FontIcon from 'material-ui/FontIcon';
import UploadIcon from 'material-ui/svg-icons/file/file-upload';
import EjectIcon from 'material-ui/svg-icons/action/eject';
import ControlPoint from 'material-ui/svg-icons/image/control-point';
const styles = {
  toolbartitle: {
    cursor: 'pointer'
  },

  toolbaruser: {
    cursor: 'pointer',
    fontWeight: '600',
    marginRight: '-15px',
    lineHeight: '25px'
  },

  toolbar: {
    backgroundColor: '#464646',
    color: 'white',
    // position: 'absolute',
    top: 0,
    paddingRight: 20,
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

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      anchorOrigin: {
        horizontal: 'right',
        vertical: 'bottom',
      },
      targetOrigin: {
        horizontal: 'right',
        vertical: 'top',
      },
    };
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  handleMenuLink() {
    this.handleRequestClose();
    browserHistory.push(this.value);
  }

  handleSignout() {
    this.props.signoutUser();
    browserHistory.push('/signout');
  }

  handleDashboard() {
    this.handleRequestClose()
    browserHistory.push('/dashboard');
  }

  handleDashboard() {
    this.handleRequestClose()
    browserHistory.push('/dashboard');
  }

  // setAnchor = (positionElement, position) => {
  //   const {anchorOrigin} = this.state;
  //   anchorOrigin[positionElement] = position;
  //
  //   this.setState({
  //     anchorOrigin: anchorOrigin,
  //   });
  // };
  //
  // setTarget = (positionElement, position) => {
  //   const {targetOrigin} = this.state;
  //   targetOrigin[positionElement] = position;
  //
  //   this.setState({
  //     targetOrigin: targetOrigin,
  //   });
  // };

  renderLinks() {
    if (this.props.route == '/signinattempt') { return; }
    if (this.props.authenticated) {
      return (
        <ToolbarGroup>
          {/*<FlatButton
            style={styles.flatbutton}
            labelStyle={{color: 'white'}}
            label="Upload"
            linkButton={true}
            containerElement={<Link to="/upload"></Link>}
          />*/}
          <FlatButton
            style={styles.flatbutton}
            labelStyle={{color: 'white'}}
            label="Dashboard"
            linkButton={true}
            containerElement={<Link to="/dashboard"></Link>}
          />
          {/*<FlatButton
            style={styles.flatbutton}
            labelStyle={{color: 'white'}}
            label="Sign Out"
            linkButton={true}
            containerElement={<Link to="/signout"></Link>}
          />*/}
          <ToolbarSeparator style={{ backgroundColor: 'white', width: '2px' }}/>
          <ToolbarGroup onTouchTap={this.handleTouchTap} style={{ paddingLeft: '25px' }}>
            <p style={styles.toolbaruser}>{this.props.user}</p>
            <FontIcon
              className="material-icons"
              style={{ fontSize: '25px', cursor: 'pointer', color: 'white' }}
              //onTouchTap={this.handleTouchTap}
            >arrow_drop_down
            </FontIcon>
            {/*<IconButton onTouchTap={this.handleTouchTap}><MoreVertIcon color={'white'}/></IconButton>*/}
            <Popover
              open={this.state.open}
              anchorEl={this.state.anchorEl}
              anchorOrigin={this.state.anchorOrigin}
              targetOrigin={this.state.targetOrigin}
              onRequestClose={this.handleRequestClose}
              style={{ marginTop: '0px' }}
            >
              <Menu>
                {/*<MenuItem
                  linkButton
                  containerElement={<Link to="/dashboard" />}
                  primaryText="Dashboard"
                  onTouchTap={this.handleRequestClose.bind(this)}
                />*/}
                <MenuItem
                  linkButton
                  containerElement={<Link to="/upload" />}
                  primaryText="Upload File"
                  onTouchTap={this.handleRequestClose.bind(this)}
                  leftIcon={<UploadIcon />}
                />
                <MenuItem
                  linkButton
                  containerElement={<Link to="/newrecord" />}
                  primaryText="New Record"
                  onTouchTap={this.handleRequestClose.bind(this)}
                  leftIcon={<ControlPoint />}
                />
                <MenuItem
                  primaryText="Sign out"
                  onTouchTap={this.handleSignout.bind(this)}
                  leftIcon={<EjectIcon />}
                />
              </Menu>
          </Popover>
          </ToolbarGroup>
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
    route: state.auth.currentRoute,
    user: state.auth.userEmail
  };
}

export default withRouter(connect(mapStateToProps, actions)(Header));
