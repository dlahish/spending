import React, { Component, PropTypes } from 'react'
import Popover from 'material-ui/Popover/Popover'
import {Menu, MenuItem} from 'material-ui/Menu'

export default (props) => {
  return (
    <Popover
      className="popover"
      open={props.state.open}
      anchorEl={props.state.anchorEl}
      anchorOrigin={props.state.anchorOrigin}
      targetOrigin={props.state.targetOrigin}
      onRequestClose={props.handleRequestClose}
    >
      <Menu>
        <MenuItem
          linkButton
          // containerElement={<Link to="/upload" />}
          primaryText="nadav"
          // onTouchTap={this.handleRequestClose.bind(this)}
          // leftIcon={<UploadIcon />}
        />
        <MenuItem
          linkButton
          // containerElement={<Link to="/newrecord" />}
          primaryText="New Record"
          // onTouchTap={this.handleRequestClose.bind(this)}
          // leftIcon={<ControlPoint />}
        />
        <MenuItem
          linkButton
          // containerElement={<Link to="/categories" />}
          primaryText="Categories"
          // onTouchTap={this.handleRequestClose.bind(this)}
          // leftIcon={<DescriptionIcon />}
        />
        <MenuItem
          primaryText="Sign out"
          // onTouchTap={this.handleSignout.bind(this)}
          // leftIcon={<EjectIcon />}
        />
      </Menu>
    </Popover>
  )
}
