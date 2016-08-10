import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './header';
import Footer from './footer';
import { connect } from 'react-redux';
import * as actions from '../actions';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as Colors from 'material-ui/styles/colors';
import { withRouter } from 'react-router'

const styles = {
  header: {
    position: 'fixed',
    width: '100%',
    top: 0,
    zIndex: 1
  },

  mainContect: {
      paddingTop: '60px',
      minHeight: '450px',
      textAlign: 'center',
      top: '48px',
      width: '100%'
  },

  footer: {

  }
}

class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <div>
          {/* <div style={styles.header}> */}
            <Header
              authenticated={this.props.authenticated}
            />
          {/* </div> */}

          <div className="default-primary-color" style={styles.mainContect}>
            {this.props.children}
          </div>

          <div
          style={{
            height: 45,
            fontSize: 15,
            backgroundColor: '#464646',
            color: 'white',
          }} className="light-primary-color">
            <Footer />
          </div>
        </div>

      </MuiThemeProvider>
    );
  }
};

function mapStateToProps(state, location) {
  return {
    authenticated: state.auth.authenticated,
    // errorMessage: state.auth.error,
    // route: state.auth.currentRoute,
    // user: state.auth.userEmail
  };
}

export default withRouter(connect(mapStateToProps, actions)(App));
