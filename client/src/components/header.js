import React, { Component } from 'react'
import Logo from '../../../media/logo.png';

const styles = {
  header: {
    height: '100px',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    margin: '20px auto',
    backgroundColor: 'rgba(0,0,255,0.2)'
  },
  logo: {
    position: 'relative',
    height: '45px',
    width: 'auto',
    float: 'left',
    bottom: '12px'
  },
  navUl: {
    textAlign: 'center',
    margin: '0 auto',
    padding: 0
  },
  navLi: {
    display: 'inline-block',
    margin: '0 50px 0 50px',
    fontWeight: '100',
    letterSpacing: '2px',
    fontSize: '20px'
  },
  hr: {
    width: '100%'
    // margin: '10px auto'
  }
}

export default class Header extends Component {
  render() {
    return (
      <div style={styles.header}>
        {/* <img src={Logo} alt="spending logo" style={styles.logo}/> */}
        <ul style={styles.navUl}>
          <li style={styles.navLi}>Graphs</li>
          <li style={styles.navLi}>Data Table</li>
          <li style={styles.navLi}>Add Record</li>
          <li style={styles.navLi}>Edit Categories</li>
        </ul>
        <hr style={styles.hr} />
      </div>
    )
  }
}
