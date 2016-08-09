import React, { Component } from 'react'
import Logo from '../../../media/logo.png';

const styles = {
  header: {
    padding: '20px 40px',
    height: '110px',
    backgroundColor: 'white',
    color: 'grey'
  },
  logo: {
    position: 'relative',
    height: '45px',
    width: 'auto',
    float: 'left',
    bottom: '12px'
  },
  navUl: {
    // display: 'inline-block',
    // float: 'left',
    // marginLeft: '11.25em',
    textAlign: 'center',
    // minWidth: '350px',
    margin: '0 auto',
    padding: 0
  },
  navLi: {
    display: 'inline',
    marginLeft: '50px',
    fontWeight: '100',
    letterSpacing: '2px',
    fontSize: '20px'
  },
  hr: {
    width: '90%',
    textAlign: 'center',
    margin: '5px auto',
    display: 'inline-block'
  }
}

export default class Header extends Component {
  render() {
    return (
      <div style={styles.header}>
        <img src={Logo} alt="spending logo" style={styles.logo}/>
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
