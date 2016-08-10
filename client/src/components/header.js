import React, { Component } from 'react'
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
  render() {
    return (
      <div style={styles.header}>
        <ul style={styles.navUl}>
          <li style={styles.navLi}><Link to="/dashboard" className="header-link">Graphs</Link></li>
          <li style={styles.navLi}><Link to="/data" className="header-link">Data Table</Link></li>
          <li style={styles.navLi}><Link to="/upload" className="header-link">Upload File</Link></li>
          <li style={styles.navLi}><Link to="/newrecord" className="header-link">New Transaction</Link></li>
          <li style={styles.navLi}><Link to="/categories" className="header-link">Edit Categories</Link></li>
        </ul>
        <hr style={styles.hr} />
        <img src={Logo} alt="spending logo" style={styles.logo}/>
      </div>
    )
  }
}
