import React, { Component, PropTypes } from 'react'
import PopoverMenu from './headerPopover'
import Logo from '../../../media/logo.png'
import { Link } from 'react-router'

const styles = {
  header: {
    height: '80px',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    paddingTop: '20px',
    backgroundColor: '#FFF'
  },
  logo: {
    position: 'absolute',
    height: '45px',
    width: 'auto',
    top: '10px',
    left: '30px'

  },
  navUl: {
    textAlign: 'center',
    margin: '0 auto',
    paddingBottom: '10px'
  },
  navLi: {
    display: 'inline-block',
    margin: '0 30px 0 30px'
  },
  hr: {
    position: 'relative',
    width: '65%',
    left: '18px',
    opacity: '0.3'
  }
}

export default class Header extends Component {
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

  render() {
    return (
      <div style={styles.header}>
        {this.props.authenticated ?
          <ul style={styles.navUl}>
            <li style={styles.navLi}><Link to="/dashboard" className="header-link">Graphs</Link></li>
            <li style={styles.navLi}><Link to="/data" className="header-link">Data Table</Link></li>
            <li style={styles.navLi}><Link to="/upload" className="header-link">Upload File</Link></li>
            <li style={styles.navLi}><Link to="/newrecord" className="header-link">New Transaction</Link></li>
            <li style={styles.navLi}><Link to="/categories" className="header-link">Edit Categories</Link></li>
          </ul> :
          <div>
            <input type="text" />
          </div>
        }
        <hr style={styles.hr} />
        <img src={Logo} alt="spending logo" style={styles.logo}/>
        <i className="fa fa-bars fa-lg popover-icon" aria-hidden="true" onTouchTap={this.handleTouchTap.bind(this)}></i>
        <PopoverMenu state={this.state} handleRequestClose={this.handleRequestClose}/>
      </div>
    )
  }
}

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired
}
